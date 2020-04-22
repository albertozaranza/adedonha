import React, { useState, useEffect } from 'react';
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
  const [letterDrawn, setLetterDrawn] = useState(null);
  const [newLetterDrawn, setNewLetterDrawn] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [alphabetCopy, setAlphabetCopy] = useState(alphabet);

  const handleLetterDrawn = () => {
    if (letterDrawn === null) return setDisabled(false);
    if (letterDrawn.length === 26) return setDisabled(true);
    return setDisabled(false);
  };

  useEffect(() => {
    handleLetterDrawn();
  }, [letterDrawn]);

  const handleStarted = () => {
    if (started) {
      setNewLetterDrawn(Math.floor(Math.random() * (alphabetCopy.length - 1)));

      if (letterDrawn === null) {
        setLetterDrawn([newLetterDrawn]);
      } else {
        setLetterDrawn([...letterDrawn, alphabetCopy[newLetterDrawn]]);
        if (newLetterDrawn !== null) {
          const splicedAlphabet = [...alphabetCopy];
          splicedAlphabet.splice(newLetterDrawn, 1);
          setAlphabetCopy(splicedAlphabet);
        }
      }
    } else {
      setStarted(true);
    }
  };

  const handleReset = () => {
    setStarted(false);
    setLetterDrawn(null);
    setNewLetterDrawn(null);
    setDisabled(false);
    setAlphabetCopy(alphabet);
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
              {letterDrawn !== null ? 'Letras já sorteadas:' : null}
            </StyledText>
            <StyledText fontSize={18}>
              {letterDrawn !== null
                ? letterDrawn.map((letter, index) => {
                    if (index !== 0) {
                      return `${letter} - `;
                    }
                    return null;
                  })
                : null}
            </StyledText>
            <StyledText fontSize={100}>
              {alphabetCopy[newLetterDrawn]}
            </StyledText>
            <StyledTimer>02:00:00</StyledTimer>
          </>
        ) : null}
        <StyledButton disabled={disabled} onPress={handleStarted}>
          <StyledText color={COLORS.white}>
            {started ? 'Sortear' : 'Iniciar'}
          </StyledText>
        </StyledButton>
        {disabled ? (
          <StyledButton onPress={handleReset}>
            <StyledText color={COLORS.white}>Jogar novamente</StyledText>
          </StyledButton>
        ) : null}
      </StyledView>
    </>
  );
};

const StyledView = styled.View`
  flex: 1;
  padding-vertical: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.white};
`;

const StyledTitle = styled.Text`
  margin-bottom: 32px;
  font-size: 60px;
  font-family: 'Roboto-Regular';
`;

const StyledText = styled.Text`
  margin-vertical: 8px;
  margin-horizontal: 32px;
  color: ${({ color }) => color || COLORS.black};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: 'Roboto-Regular';
  text-align: center;
`;

const StyledTimer = styled.Text`
  margin-vertical: 32px;
  font-size: 36px;
  font-weight: bold;
  font-family: 'Roboto-Regular';
`;

const StyledButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.primaryDisabled : COLORS.primary};
  border-radius: 24px;
  font-family: 'Roboto-Regular';
`;

export default App;
