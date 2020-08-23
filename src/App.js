import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import colors from '@/configs/colors';
import Routes from '@/configs/routes';

const App = () => {
  return (
    <>
      <SafeAreaView />
      <StatusBar backgroundColor={colors.white} barStyle='dark-content' />
      <Routes />
    </>
  );
};

export default App;
