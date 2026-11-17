import type { ComponentType, HTMLAttributes } from 'react';

// Type bridge for the installed JS variant; options match its live registry source.
export interface GalaxyProps extends HTMLAttributes<HTMLDivElement> {
  focal?: number[];
  rotation?: number[];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  lightMode?: boolean;
  starColors?: string[];
  starSize?: number;
  flareIntensity?: number;
  layers?: number;
  direction?: 'forward' | 'backward';
  clickWarp?: boolean;
  intro?: boolean;
  backgroundColor?: string;
  opacity?: number;
  dpr?: number;
}
declare const Galaxy: ComponentType<GalaxyProps>;
export default Galaxy;
