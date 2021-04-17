import { DefaultTheme as BaseDefaultTheme } from '@democracy-deutschland/ui';

// Types for the Theme
declare module 'styled-components/native' {
  export interface DefaultTheme extends BaseDefaultTheme {}
}
