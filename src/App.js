import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar, SafeAreaView, Switch } from 'react-native';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';

import colors from '@/configs/colors';
import Routes from '@/configs/routes';

import light from '@/themes/light';
import dark from '@/themes/dark';

const App = () => {
  const [theme, setTheme] = useState(light);
  const [enabled, setEnabled] = useState(false);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView />
      <StatusBar
        backgroundColor={theme.title === 'light' ? colors.white : colors.dark}
        barStyle={theme.title === 'light' ? 'dark-content' : 'light-content'}
      />
      <StyledHeader>
        <Switch
          value={enabled}
          onValueChange={() => {
            setEnabled(!enabled);
            toggleTheme();
          }}
          trackColor={{ false: colors.gray, true: colors.gray }}
          thumbColor={!enabled ? colors.dark : colors.warning}
        />
      </StyledHeader>
      <Routes />
    </ThemeProvider>
  );
};

const StyledHeader = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  elevation: 0.1;
`;

export default App;
