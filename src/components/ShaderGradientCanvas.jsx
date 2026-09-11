import React from 'react';
import { SpaceAuroraShader } from './CosmicGradients';

/**
 * @deprecated Use SpaceAuroraShader from './CosmicGradients' instead.
 */
export function ShaderGradientCanvas(props) {
  return <SpaceAuroraShader fadeBottom={true} {...props} />;
}

export default ShaderGradientCanvas;
