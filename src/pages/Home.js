import React, { useContext } from 'react';
import { Switch } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import TimeContext from '@/context/time';
import ThemeContext from '@/context/theme';

import colors from '@/configs/colors';
import constants from '@/configs/constants';
import strings from '@/configs/strings';

const handleColor = (disabled, theme) => {
  if (disabled && theme.title === 'dark') return colors.gray;
  if (disabled) return colors.primaryDisabled;
  return colors.primary;
};

const Home = () => {
  const { navigate } = useNavigation();

  const { time, setTime } = useContext(TimeContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <StyledView>
      <StyledHeader>
        <Switch
          value={theme.title !== 'light'}
          onValueChange={() => {
            toggleTheme();
          }}
          trackColor={{ false: colors.gray, true: colors.gray }}
          thumbColor={theme.title !== 'light' ? colors.warning : colors.dark}
        />
      </StyledHeader>
      <StyledContainer>
        <StyledTitle>{strings.appName}</StyledTitle>
        <StyledPickerContainer>
          <StyledTextTime>{strings.selectTime}</StyledTextTime>
          <StyledPickerBox>
            <StyledPicker
              selectedValue={time}
              onValueChange={itemValue => setTime(itemValue)}
            >
              {constants.minutes.map(({ label, value }) => (
                <StyledPicker.Item key={label} label={label} value={value} />
              ))}
            </StyledPicker>
          </StyledPickerBox>
        </StyledPickerContainer>
        <StyledButton disabled={time === 0} onPress={() => navigate('Game')}>
          <StyledText color={colors.white}>{strings.start}</StyledText>
        </StyledButton>
      </StyledContainer>
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

const StyledTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 60px;
  font-family: 'Roboto-Regular';
`;

const StyledText = styled.Text`
  margin: 8px 0;
  margin: 0 32px;
  color: ${({ theme, color }) => color || theme.colors.text};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: 'Roboto-Regular';
  text-align: center;
`;

const StyledTextTime = styled(StyledText)`
  margin: 0 0 8px 4px;
  text-align: left;
`;

const StyledButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled, theme }) => handleColor(disabled, theme)};
  border-radius: 24px;
  font-family: 'Roboto-Regular';
`;

const StyledPickerContainer = styled.View`
  width: 100%;
`;

const StyledPicker = styled(Picker)`
  color: ${({ theme }) => theme.colors.text};
`;

const StyledPickerBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const StyledHeader = styled.View`
  height: 48px;
  width: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  top: 16px;
  right: 4px;
  z-index: 1;
  elevation: 0.05;
`;

export default Home;
