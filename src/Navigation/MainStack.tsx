import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { MainStackParamList } from '../types/navigation';

// import screens 
import Drawer from './Drawer';
import Area from '../Screens/Areas/Area';
import AreaAgregar from '../Screens/Areas/AreaAgregar';
import AreaVer from '../Screens/Areas/AreaVer';
import AreaEditar from '../Screens/Areas/AreaEditar';
import Categorias from '../Screens/Categorias/Categorias';
import CategoriasVer from '../Screens/Categorias/CategoriasVer';
import CategoriasAgregar from '../Screens/Categorias/CategoriasAgregar';
import ProyectosVer from '../Screens/Proyectos/ProyectosVer';
import Proyectos from '../Screens/Proyectos/Proyectos';
import ProyectosAgregar from '../Screens/Proyectos/ProyectosAgregar';
import ProyectosEditar from '../Screens/Proyectos/ProyectosEditar';
import CategoriasEditar from '../Screens/Categorias/CategoriasEditar';
import Ubicaciones from '../Screens/Proyectos/Proyectos';
import UbicacionesVer from '../Screens/Ubicaciones/UbicacionesVer';
import UbicacionesAgregar from '../Screens/Ubicaciones/UbicacionesAgregar';
import UbicacionesEditar from '../Screens/Ubicaciones/UbicacionesEditar';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Drawer' component={Drawer} />
      
      {/* stack para Proyectos */}
      <Stack.Screen name='Proyectos' component={Proyectos} />
      <Stack.Screen name='ProyectosVer' component={ProyectosVer} />
      <Stack.Screen name='ProyectosAgregar' component={ProyectosAgregar} />
      <Stack.Screen name='ProyectosEditar' component={ProyectosEditar} />

      {/* stack para Ubicaciones */}
      <Stack.Screen name='Ubicaciones' component={Ubicaciones} />
      <Stack.Screen name='UbicacionesVer' component={UbicacionesVer} />
      <Stack.Screen name='UbicacionesAgregar' component={UbicacionesAgregar} />
      <Stack.Screen name='UbicacionesEditar' component={UbicacionesEditar} />

      {/* Stack para Areas */}
      <Stack.Screen name="Area" component={Area} />
      <Stack.Screen name="AreaAgregar" component={AreaAgregar} />
      <Stack.Screen name="AreaVer" component={AreaVer} />
      <Stack.Screen name='AreaEditar' component={AreaEditar} />

      {/* stack para categorias */}
      <Stack.Screen name='Categorias' component={Categorias} />
      <Stack.Screen name='CategoriasVer' component={CategoriasVer} />
      <Stack.Screen name='CategoriasAgregar' component={CategoriasAgregar} />
      <Stack.Screen name='CategoriasEditar' component={CategoriasEditar} />

    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});