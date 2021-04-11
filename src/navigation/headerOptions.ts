import { getTheme } from 'styles/theme';
import { DefaultTheme } from 'styled-components/native';

export const headerScreenOptions = {
  headerStyle: {
    backgroundColor: getTheme().colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: getTheme().colors.secondary,
};

export const getHeaderScreenOptions = (theme: DefaultTheme = getTheme()) => ({
  headerStyle: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.secondary,
});
