import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import TimeContext from '@/context/time';

import colors from '@/configs/colors';
import constants from '@/configs/constants';
import strings from '@/configs/strings';

import { getRemaining } from '@/utils';

import icBack from '@/assets/icons/icBack.png';

const handleColor = (disabled, playAgain, theme) => {
  if (disabled && theme.title === 'dark') return colors.gray;
  if (disabled) return colors.primaryDisabled;
  if (playAgain) return colors.danger;
  return colors.primary;
};

const Game = () => {
  const { goBack } = useNavigation();

  const { time } = useContext(TimeContext);

  const [remainingSeconds, setRemainingSeconds] = useState(time);
  const [letterDrawn, setLetterDrawn] = useState(null);
  const [newLetterDrawn, setNewLetterDrawn] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [alphabetCopy, setAlphabetCopy] = useState(constants.alphabet);

  const [isActive, setIsActive] = useState(false);

  const { mins, secs } = getRemaining(remainingSeconds);

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
    if (
      letterDrawn.length === constants.alphabet.length &&
      remainingSeconds === 0
    )
      return setPlayAgain(true);
    return setPlayAgain(false);
  }, [letterDrawn, remainingSeconds]);

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
    if (remainingSeconds === 0) {
      reset();
      return setDisabled(false);
    }
    let interval = null;
    if (isActive) {
      setDisabled(true);
      interval = setInterval(() => {
        setRemainingSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && remainingSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSeconds, setRemainingSeconds]);

  const handleStarted = () => {
    setRemainingSeconds(time);
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
          {strings.lettersDrawn}
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
            {playAgain ? strings.playAgain : strings.draw}
          </StyledText>
        </StyledButton>
        {!playAgain && remainingSeconds < time - 4 && letterDrawn?.length > 0 && (
          <StyledButton
            disabled={remainingSeconds === 0}
            onPress={() => setRemainingSeconds(0)}
          >
            <StyledText color={colors.white}>{strings.finishRound}</StyledText>
          </StyledButton>
        )}
        {playAgain && (
          <StyledButton
            disabled={disabled}
            onPress={goBack}
            playAgain={playAgain}
          >
            <StyledText color={colors.white}>{strings.back}</StyledText>
          </StyledButton>
        )}
      </StyledContainer>
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledHeader = styled.View`
  height: 64px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`;

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledRectButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  margin: 8px 32px;
  color: ${({ theme, color }) => color || theme.colors.text};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: 'Roboto-Regular';
  text-align: center;
`;

const StyledTimer = styled.Text`
  margin: 0 32px;
  color: ${({ theme }) => theme.colors.text};
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
  background-color: ${({ disabled, playAgain, theme }) =>
    handleColor(disabled, playAgain, theme)};
  border-radius: 24px;
  font-family: 'Roboto-Regular';
`;

export default Game;
