import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import ThemeContext, { ThemeProvider } from '@/context/theme';

import colors from '@/configs/colors';
import Routes from '@/configs/routes';

const ThemeApp = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <SafeAreaView />
      <StatusBar
        backgroundColor={theme.title === 'light' ? colors.white : colors.dark}
        barStyle={theme.title === 'light' ? 'dark-content' : 'light-content'}
      />
      <Routes />
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemeApp />
    </ThemeProvider>
  );
};

export default App;
