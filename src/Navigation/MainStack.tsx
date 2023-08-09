import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

// import screens 
import Drawer from './Drawer';
import Area from '../Screens/Areas/Area';
import AreaAgregar from '../Screens/Areas/AreaAgregar';
import AreaVer from '../Screens/Areas/AreaVer';
import AreaEditar from '../Screens/Areas/AreaEditar';
import { MainStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return(
    <Stack.Navigator  
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Drawer' component={Drawer} />
        <Stack.Screen name="Area" component={Area} />
        <Stack.Screen name="AreaAgregar" component={AreaAgregar} />
        <Stack.Screen name="AreaVer" component={AreaVer} />
        <Stack.Screen name='AreaEditar' component={AreaEditar} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});