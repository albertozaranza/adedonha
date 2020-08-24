import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Game } from '@/pages';

import { TimeProvider } from '@/context/time';

const Stack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <TimeProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Game' component={Game} />
      </Stack.Navigator>
    </TimeProvider>
  </NavigationContainer>
);

export default Routes;
