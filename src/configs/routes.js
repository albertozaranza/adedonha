import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Game } from '@/pages';

const Stack = createStackNavigator();

// const SignUpContextProvider = () => (
//   <SignUpProvider>
//     <SignUp />
//   </SignUpProvider>
// );

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Game' component={Game} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
