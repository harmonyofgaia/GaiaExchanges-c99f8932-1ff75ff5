export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ColorPalette;
  typography: Typography;
  spacing: SpacingScale;
  shadows: ShadowScale;
  borders: BorderScale;
  motion: MotionTokens;
  breakpoints: Breakpoints;
}

export interface ColorPalette {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  neutral: ColorScale;
  semantic: SemanticColors;
  surface: SurfaceColors;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Base color
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface SemanticColors {
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

export interface SurfaceColors {
  background: string;
  foreground: string;
  card: string;
  popover: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface Typography {
  fontFamilies: {
    sans: string[];
    serif: string[];
    mono: string[];
    display: string[];
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeights: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeights: {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
}

export interface SpacingScale {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
}

export interface ShadowScale {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface BorderScale {
  radius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  width: {
    0: string;
    1: string;
    2: string;
    4: string;
    8: string;
  };
}

export interface MotionTokens {
  duration: {
    fast: string;
    normal: string;
    slow: string;
    slower: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    bounce: string;
    elastic: string;
  };
}

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ComponentVariant {
  name: string;
  styles: React.CSSProperties;
  className?: string;
  props?: Record<string, any>;
}

export interface ComponentTheme {
  baseStyles: React.CSSProperties;
  variants: Record<string, ComponentVariant>;
  sizes: Record<string, ComponentVariant>;
  colorSchemes: Record<string, ComponentVariant>;
}

export interface UIComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  props: ComponentProp[];
  variants: string[];
  sizes: string[];
  examples: ComponentExample[];
  accessibility: AccessibilityInfo;
}

export type ComponentCategory = 
  | 'layout'
  | 'forms'
  | 'navigation'
  | 'feedback'
  | 'data-display'
  | 'overlay'
  | 'media'
  | 'typography'
  | 'trading'
  | 'gaming'
  | 'nft';

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
  examples?: any[];
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  props: Record<string, any>;
}

export interface AccessibilityInfo {
  ariaLabel?: string;
  ariaRole?: string;
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  colorContrastRatio: number;
  focusManagement: boolean;
}

// Service Interfaces
export interface IThemeService {
  getTheme(themeId: string): Promise<Theme>;
  getAvailableThemes(): Promise<Theme[]>;
  setActiveTheme(themeId: string): Promise<void>;
  createCustomTheme(theme: Partial<Theme>): Promise<Theme>;
  updateTheme(themeId: string, updates: Partial<Theme>): Promise<Theme>;
  exportTheme(themeId: string): Promise<string>;
  importTheme(themeData: string): Promise<Theme>;
}

export interface IComponentLibraryService {
  getComponents(category?: ComponentCategory): Promise<UIComponent[]>;
  getComponent(componentId: string): Promise<UIComponent>;
  renderComponent(componentId: string, props: Record<string, any>): Promise<React.ReactElement>;
  validateProps(componentId: string, props: Record<string, any>): Promise<boolean>;
}

export interface IDesignSystemService {
  getDesignTokens(): Promise<Theme>;
  validateDesignCompliance(element: HTMLElement): Promise<ComplianceReport>;
  generateColorPalette(baseColor: string): Promise<ColorScale>;
  optimizePerformance(componentTree: React.ReactNode): Promise<React.ReactNode>;
}

export interface ComplianceReport {
  isCompliant: boolean;
  violations: ComplianceViolation[];
  score: number;
  suggestions: string[];
}

export interface ComplianceViolation {
  type: 'color-contrast' | 'font-size' | 'spacing' | 'accessibility';
  severity: 'low' | 'medium' | 'high';
  message: string;
  element: string;
  suggestion: string;
}