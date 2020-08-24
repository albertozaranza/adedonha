import React, { useContext } from 'react';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import TimeContext from '@/context/time';

import colors from '@/configs/colors';
import constants from '@/configs/constants';
import strings from '@/configs/strings';

const App = () => {
  const { navigate } = useNavigation();

  const { time, setTime } = useContext(TimeContext);

  return (
    <StyledView>
      <StyledTitle>{strings.appName}</StyledTitle>
      <StyledPickerContainer>
        <StyledTextTime>{strings.selectTime}</StyledTextTime>
        <StyledPickerBox>
          <Picker
            selectedValue={time}
            onValueChange={itemValue => setTime(itemValue)}
          >
            {constants.minutes.map(({ label, value }) => (
              <Picker.Item key={label} label={label} value={value} />
            ))}
          </Picker>
        </StyledPickerBox>
      </StyledPickerContainer>
      <StyledButton disabled={time === 0} onPress={() => navigate('Game')}>
        <StyledText color={colors.white}>{strings.start}</StyledText>
      </StyledButton>
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  padding: 0 16px;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.white};
`;

const StyledTitle = styled.Text`
  font-size: 60px;
  font-family: 'Roboto-Regular';
`;

const StyledText = styled.Text`
  margin: 8px 0;
  margin: 0 32px;
  color: ${({ color }) => color || colors.black};
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
  background-color: ${({ disabled }) =>
    disabled ? colors.primaryDisabled : colors.primary};
  border-radius: 24px;
  font-family: 'Roboto-Regular';
`;

const StyledPickerContainer = styled.View`
  width: 100%;
`;

const StyledPickerBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export default App;
