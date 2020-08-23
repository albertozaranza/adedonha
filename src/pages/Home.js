import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import colors from '@/configs/colors';

const App = () => {
  const { navigate } = useNavigation();
  return (
    <StyledView>
      <StyledTitle>Adedonha</StyledTitle>
      <StyledButton onPress={() => navigate('Game')}>
        <StyledText color={colors.white}>Iniciar</StyledText>
      </StyledButton>
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  padding: 0 50px;
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

export default App;
