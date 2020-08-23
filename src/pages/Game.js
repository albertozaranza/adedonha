import React, { useState, useEffect, useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import colors from '@/configs/colors';
import constants from '@/configs/constants';

import { getRemaining } from '@/utils';

import icBack from '@/assets/icons/icBack.png';

const handleColor = (disabled, playAgain) => {
  if (playAgain) return colors.danger;
  if (disabled) return colors.primaryDisabled;
  return colors.primary;
};

const Game = () => {
  const { goBack } = useNavigation();

  const [letterDrawn, setLetterDrawn] = useState(null);
  const [newLetterDrawn, setNewLetterDrawn] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [alphabetCopy, setAlphabetCopy] = useState(constants.alphabet);

  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const { mins, secs } = getRemaining(remainingSecs);

  const handleLetterDrawn = useCallback(() => {
    if (letterDrawn === null) return setDisabled(false);
    if (letterDrawn.length === constants.alphabet.length)
      return setDisabled(true);
    return setDisabled(false);
  }, [letterDrawn]);

  useEffect(() => {
    handleLetterDrawn();
  }, [handleLetterDrawn, letterDrawn]);

  useEffect(() => {
    if (letterDrawn === null) return setPlayAgain(false);
    if (letterDrawn.length === constants.alphabet.length && remainingSecs === 0)
      return setPlayAgain(true);
    return setPlayAgain(false);
  }, [letterDrawn, remainingSecs]);

  const handleReset = () => {
    setLetterDrawn(null);
    setNewLetterDrawn(null);
    setDisabled(false);
    setAlphabetCopy(constants.alphabet);
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (remainingSecs === 0) {
      reset();
      return setDisabled(false);
    }
    let interval = null;
    if (isActive) {
      setDisabled(true);
      interval = setInterval(() => {
        setRemainingSecs(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  const handleStarted = () => {
    setRemainingSecs(120);
    setPlayAgain(false);
    toggle();
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
  };

  return (
    <StyledView>
      <StyledHeader>
        <StyledRectButton onPress={goBack}>
          <Image source={icBack} />
        </StyledRectButton>
      </StyledHeader>
      <StyledContainer>
        <StyledText fontSize={24} fontWeight='bold'>
          Letras já sorteadas:
        </StyledText>
        <StyledText fontSize={18}>
          {letterDrawn !== null
            ? letterDrawn.map((letter, index) => {
                if (index !== 0) return `${letter} - `;
                return null;
              })
            : '-'}
        </StyledText>
        <StyledText fontSize={100}>{alphabetCopy[newLetterDrawn]}</StyledText>
        <StyledTimer>{`${mins}:${secs}`}</StyledTimer>
        <StyledButton
          disabled={disabled}
          onPress={playAgain ? handleReset : handleStarted}
        >
          <StyledText color={colors.white}>
            {playAgain ? 'Jogar novamente' : 'Sortear'}
          </StyledText>
        </StyledButton>
        {playAgain && (
          <StyledButton
            disabled={disabled}
            onPress={goBack}
            playAgain={playAgain}
          >
            <StyledText color={colors.white}>Voltar</StyledText>
          </StyledButton>
        )}
      </StyledContainer>
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const StyledHeader = styled.View`
  height: 64px;
  justify-content: center;
  padding-left: 16px;
`;

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
`;

const StyledRectButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  margin-vertical: 8px;
  margin-horizontal: 32px;
  color: ${({ color }) => color || colors.black};
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
  background-color: ${({ disabled, playAgain }) =>
    handleColor(disabled, playAgain)};
  border-radius: 24px;
  font-family: 'Roboto-Regular';
`;

export default Game;
