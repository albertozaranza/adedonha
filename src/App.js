import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components';

import COLORS from '@/config/colors';

const App = () => {
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={COLORS.white} />
      <StyledSafeAreaView>
        <StyledTitle>Teste</StyledTitle>
      </StyledSafeAreaView>
    </>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.white};
`;

const StyledTitle = styled.Text`
  flex: 1;
  background-color: ${COLORS.white};
`;

export default App;
