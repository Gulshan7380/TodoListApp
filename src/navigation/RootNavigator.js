import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {STACK_NAVIGATION_KEYS} from './NavigationKeys';
import {STACK_NAVIGATION_ROUTES} from './Routes';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: '#fff',
          animation: 'slide_from_right',
        }}
        initialRouteName={STACK_NAVIGATION_KEYS.MAIN_SCREEN}>
        <Stack.Screen
          name={STACK_NAVIGATION_KEYS.MAIN_SCREEN}
          component={STACK_NAVIGATION_ROUTES.MainScreen}
        />
        <Stack.Screen
          name={STACK_NAVIGATION_KEYS.ADD_TODO_SCREEN}
          component={STACK_NAVIGATION_ROUTES.AddTodoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
