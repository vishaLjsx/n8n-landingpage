import React, { useEffect, useRef } from 'react';

/**
 * Common Vertex Shader: Flat planar view quad (2 triangles)
 */
const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

/**
 * Common GLSL utility functions (hash, noise, fbm)
 */
const COMMON_GLSL_UTILS = `
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(cos(0.52), sin(0.52), -sin(0.52), cos(0.52));
    for (int i = 0; i < 4; i++) {
      val += amp * noise(p);
      p = rot * p * 2.05 + vec2(0.18, 0.26);
      amp *= 0.5;
    }
    return val;
  }
`;

/**
 * Unified Space Aurora Fragment Shader
 *
 * Palette:
 * - Deep Indigo: #4F46E5 (vec3: 0.31, 0.27, 0.90)
 * - Royal Violet: #7C3AED (vec3: 0.48, 0.23, 0.93)
 * - Champagne Peach / Aurora Highlight: #FDE8DB (vec3: 0.99, 0.91, 0.86)
 *
 * Physics:
 * - u_time * 0.16 for slow, smooth, organic multi-octave drift
 * - Noise synthesis with low agitation
 * - Subtle procedural film grain overlay (0.02)
 *
 * Dual-Theme Behavior:
 * - When isDark={false}: gentle, ambient pastel aurora wash (~24% opacity over white base)
 * - When isDark={true}: luminous, deep space aurora (~58% opacity over dark void base)
 */
const FRAG_SPACE_AURORA = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_dark_mode;
  uniform float u_fade_top;
  uniform float u_fade_bottom;
  varying vec2 v_uv;

  ${COMMON_GLSL_UTILS}

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * 1.25;
    p.x *= aspect;

    // Physics: slow, smooth, organic multi-octave drift
    float t = u_time * 0.16;
    float freq = 3.2;

    // Noise synthesis with low agitation
    float ribbon1 = sin(p.x * freq + sin(p.y * 2.1 + t) * 1.4 + t * 0.85);
    float ribbon2 = sin(p.y * freq + sin(p.x * 2.4 - t * 0.7) * 1.5 - t * 0.75);
    float ribbon3 = fbm(p * 2.2 + vec2(ribbon1 * 0.35, ribbon2 * 0.35 + t * 0.25));

    float aurora = (ribbon1 * 0.4 + ribbon2 * 0.4 + ribbon3 * 0.4) * 0.5 + 0.5;
    aurora = smoothstep(0.20, 0.88, aurora);

    // Color Palette:
    // Dark void base: #080612
    vec3 cDeep = vec3(0.03, 0.02, 0.07);
    // Deep Indigo: #4F46E5
    vec3 cIndigo = vec3(0.31, 0.27, 0.90);
    // Royal Violet: #7C3AED
    vec3 cViolet = vec3(0.48, 0.23, 0.93);
    // Champagne Peach / Aurora Highlight: #FDE8DB
    vec3 cChampagne = vec3(0.99, 0.91, 0.86);

    float s1 = smoothstep(0.18, 0.52, aurora);
    float s2 = smoothstep(0.48, 0.78, aurora);
    float s3 = smoothstep(0.72, 0.96, aurora * 0.8 + ribbon3 * 0.2);

    vec3 auroraColor = mix(cDeep, cIndigo, s1);
    auroraColor = mix(auroraColor, cViolet, s2);
    // Delicate champagne peach highlights
    auroraColor = mix(auroraColor, cChampagne, s3 * 0.65);

    // Subtle procedural film grain overlay (0.02)
    float grain = (hash(gl_FragCoord.xy + fract(u_time * 1.4)) - 0.5) * 0.02;
    auroraColor += vec3(grain);

    // Light mode: gentle ambient pastel aurora wash (~24% opacity over white base)
    vec3 baseLight = vec3(1.0, 1.0, 1.0);
    vec3 lightSurface = mix(baseLight, auroraColor, 0.24);

    // Dark mode: luminous deep space aurora (~58% opacity over dark void base)
    vec3 baseDark = vec3(0.03, 0.02, 0.07);
    vec3 darkSurface = 1.0 - (1.0 - baseDark) * (1.0 - auroraColor * 0.58);

    vec3 finalColor = mix(lightSurface, darkSurface, u_dark_mode);

    // Boundary edge fades
    float edgeFade = 1.0;
    if (u_fade_top > 0.5) edgeFade *= smoothstep(1.0, 0.82, uv.y);
    if (u_fade_bottom > 0.5) edgeFade *= smoothstep(0.0, 0.18, uv.y);

    gl_FragColor = vec4(finalColor, edgeFade);
  }
`;

/**
 * Base WebGL Shader Component
 * Pure HTML5 WebGL implementation without Three.js or external libraries.
 */
function BaseWebGLShader({
  fragmentShaderSource,
  isDark = false,
  fadeTop = false,
  fadeBottom = false,
  className = '',
  style = {},
  ariaLabel = 'Space Aurora WebGL Shader Gradient',
}) {
  const canvasRef = useRef(null);
  const darkModeRef = useRef(isDark);
  const fadeTopRef = useRef(fadeTop);
  const fadeBottomRef = useRef(fadeBottom);

  useEffect(() => {
    darkModeRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    fadeTopRef.current = fadeTop;
    fadeBottomRef.current = fadeBottom;
  }, [fadeTop, fadeBottom]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', { alpha: true, antialias: true, depth: false }) ||
      canvas.getContext('experimental-webgl', { alpha: true, antialias: true, depth: false });

    if (!gl) {
      console.warn('WebGL not supported; falling back to CSS background.');
      return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function createShader(glCtx, type, source) {
      const shader = glCtx.createShader(type);
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compilation error:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad positions (2 triangles)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPosLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosLocation);
    gl.vertexAttribPointer(aPosLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, 'u_time');
    const uResolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const uDarkModeLocation = gl.getUniformLocation(program, 'u_dark_mode');
    const uFadeTopLocation = gl.getUniformLocation(program, 'u_fade_top');
    const uFadeBottomLocation = gl.getUniformLocation(program, 'u_fade_bottom');

    let animationFrameId;
    const startTime = performance.now();

    // Sizing strictly with Pixel Density: 1.0
    function resizeCanvas() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const pixelDensity = 1.0;
      const width = Math.max(1, Math.floor(rect.width * pixelDensity));
      const height = Math.max(1, Math.floor(rect.height * pixelDensity));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      if (uResolutionLocation) {
        gl.uniform2f(uResolutionLocation, width, height);
      }
    }

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', resizeCanvas);

    // Continuous 60fps render loop
    function render(currentTime) {
      const elapsed = (currentTime - startTime) * 0.001;
      gl.uniform1f(uTimeLocation, elapsed);

      if (uDarkModeLocation) {
        gl.uniform1f(uDarkModeLocation, darkModeRef.current ? 1.0 : 0.0);
      }
      if (uFadeTopLocation) {
        gl.uniform1f(uFadeTopLocation, fadeTopRef.current ? 1.0 : 0.0);
      }
      if (uFadeBottomLocation) {
        gl.uniform1f(uFadeBottomLocation, fadeBottomRef.current ? 1.0 : 0.0);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, [fragmentShaderSource]);

  return (
    <canvas
      ref={canvasRef}
      className={`space-aurora-shader cosmic-shader-canvas ${className}`.trim()}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
        ...style,
      }}
      aria-label={ariaLabel}
      aria-hidden="true"
    />
  );
}

/**
 * SpaceAuroraShader - Unified ambient WebGL shader gradient
 * Zero Three.js / Fiber dependencies.
 *
 * Palette:
 * - Deep Indigo: #4F46E5 (vec3: 0.31, 0.27, 0.90)
 * - Royal Violet: #7C3AED (vec3: 0.48, 0.23, 0.93)
 * - Champagne Peach: #FDE8DB (vec3: 0.99, 0.91, 0.86)
 */
export function SpaceAuroraShader({
  isDark = false,
  style = {},
  className = '',
  fadeTop = false,
  fadeBottom = false,
}) {
  return (
    <BaseWebGLShader
      fragmentShaderSource={FRAG_SPACE_AURORA}
      isDark={isDark}
      fadeTop={fadeTop}
      fadeBottom={fadeBottom}
      className={`space-aurora-shader ${className}`.trim()}
      style={style}
      ariaLabel="Space Aurora WebGL Shader Gradient"
    />
  );
}

/**
 * @deprecated Deprecated in favor of SpaceAuroraShader. Aliased for backward compatibility.
 */
export const CosmicNebulaShader = SpaceAuroraShader;

/**
 * @deprecated Deprecated in favor of SpaceAuroraShader. Aliased for backward compatibility.
 */
export const StarlightCyanShader = SpaceAuroraShader;

/**
 * @deprecated Deprecated in favor of SpaceAuroraShader. Aliased for backward compatibility.
 */
export const PrecisionShaderGradient = SpaceAuroraShader;

/**
 * @deprecated Deprecated in favor of SpaceAuroraShader. Aliased for backward compatibility.
 */
export const SelectableCosmicShader = SpaceAuroraShader;

export default SpaceAuroraShader;
