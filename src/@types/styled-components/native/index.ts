import 'styled-components';
import { DefaultTheme as BaseDefaultTheme } from '@democracy-deutschland/ui-test';
export type { BaseDefaultTheme };
// Types for the Theme
declare module 'styled-components/native' {
  export interface DefaultTheme extends BaseDefaultTheme {}
}
