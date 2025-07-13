// Interfaces y tipos para el portfolio

export interface SectionConfig {
  element: HTMLElement | null;
  class: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ButtonPosition {
  x: number;
  y: number;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ParticleConfig {
  size: number;
  hue: number;
  velocity: number;
  gravity: number;
}

export interface ScrollConfig {
  headerHeight: number;
  offset: number;
  behavior: ScrollBehavior;
}

export interface HamburgerConfig {
  isActive: boolean;
  isMobile: boolean;
  currentClass: string;
}

export interface CursorConfig {
  isActive: boolean;
  isHovering: boolean;
  position: MousePosition;
}

export interface ChaseConfig {
  isChasing: boolean;
  mouseSpeed: number;
  escapeDistance: number;
  maxSpeed: number;
}

// Tipos para elementos DOM
export type HamburgerElement = HTMLButtonElement | null;
export type NavPanelElement = HTMLElement | null;
export type CursorElement = HTMLElement | null;
export type CVButtonElement = HTMLAnchorElement | null;

// Tipos para eventos
export type ScrollSource = 'hamburger' | 'general';
export type DeviceType = 'mobile' | 'desktop';

// Tipos para animaciones
export type EasingFunction = (t: number) => number;
export type AnimationFrame = (currentTime: number) => void;

// Tipos para efectos visuales
export type EffectType = 'ripple' | 'glow' | 'particle' | 'magnetic' | 'glitch';

// Enums
export enum SectionClass {
  ON_GREEN_BG = 'on-green-bg',
  ON_LIGHT_BG = 'on-light-bg',
  ON_DARK_BG = 'on-dark-bg'
}

export enum MenuState {
  CLOSED = 'closed',
  OPENING = 'opening',
  OPEN = 'open',
  CLOSING = 'closing'
}

export enum CursorState {
  NORMAL = 'normal',
  HOVER = 'hover',
  ACTIVE = 'active'
} 