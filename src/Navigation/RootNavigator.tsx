import { StyleSheet } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
export default RootNavigator;

const styles = StyleSheet.create({});