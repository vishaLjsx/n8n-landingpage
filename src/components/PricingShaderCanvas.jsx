import React from 'react';
import { SpaceAuroraShader } from './CosmicGradients';

/**
 * @deprecated Use SpaceAuroraShader from './CosmicGradients' instead.
 */
export function PricingShaderCanvas(props) {
  return <SpaceAuroraShader fadeTop={true} fadeBottom={true} {...props} />;
}

export default PricingShaderCanvas;
