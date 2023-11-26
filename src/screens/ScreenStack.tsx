import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import TransactionFormScreen from './TransactionFormScreen';

const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="TransactionForm"
            component={TransactionFormScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenStack;
