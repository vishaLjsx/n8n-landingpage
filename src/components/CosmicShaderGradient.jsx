import React from 'react';
import { SpaceAuroraShader } from './CosmicGradients';

/**
 * @deprecated Use SpaceAuroraShader from './CosmicGradients' instead.
 */
export function CosmicShaderGradient(props) {
  return <SpaceAuroraShader {...props} />;
}

export { SpaceAuroraShader as AdaptiveFluidGradient };
export default CosmicShaderGradient;
