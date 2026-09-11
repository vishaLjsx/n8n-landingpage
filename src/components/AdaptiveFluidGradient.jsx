import React from 'react';
import { SpaceAuroraShader } from './CosmicGradients';

/**
 * @deprecated Deprecated in favor of SpaceAuroraShader.
 */
export function AdaptiveFluidGradient(props) {
  return <SpaceAuroraShader {...props} />;
}

export default AdaptiveFluidGradient;
