import React, { useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import styled from 'styled-components';

import COLORS from '@/config/colors';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const App = () => {
  const [started, setStarted] = useState(false);

  const handleStarted = () => {
    setStarted(true);
  };

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={COLORS.white} />
      <SafeAreaView />
      <StyledView>
        <StyledTitle>Adedonha</StyledTitle>
        {started ? (
          <>
            <StyledText fontSize={24} fontWeight='bold'>
              Letras já sorteadas:
            </StyledText>
            <StyledText fontSize={18}>
              A - B - A - B - A - B - A - B - A - B - A - B - A - B - A - B - A
              - B - A - B - A - B - A - B - A - B - A - B
            </StyledText>
            <StyledText fontSize={100}>A</StyledText>
            <StyledTimer>02:00:00</StyledTimer>
          </>
        ) : null}
        <StyledButton onPress={handleStarted}>
          <StyledText color={COLORS.white}>
            {started ? 'Sortear' : 'Iniciar'}
          </StyledText>
        </StyledButton>
      </StyledView>
    </>
  );
};

const StyledView = styled.View`
  flex: 1;
  padding-vertical: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.white};
`;

const StyledTitle = styled.Text`
  margin-bottom: 32px;
  font-size: 60px;
`;

const StyledText = styled.Text`
  margin-vertical: 8px;
  margin-horizontal: 32px;
  color: ${({ color }) => color || COLORS.black};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  text-align: center;
`;

const StyledTimer = styled.Text`
  margin-vertical: 32px;
  font-size: 36px;
  font-weight: bold;
`;

const StyledButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.primary};
  border-radius: 24px;
`;

export default App;
