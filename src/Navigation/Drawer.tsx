import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Area from '../Screens/Areas/Area';
import Products from '../Screens/Products/Products';
import Home from '../Screens/Principal/Home';
import Asignaciones from '../Screens/Asignaciones/Asignaciones';
import Compras from '../Screens/Compras/Compras';
import Proveedores from '../Screens/Proveedores/Proveedores';
import Proyectos from '../Screens/Proyectos/Proyectos';
import Ubicaciones from '../Screens/Ubicaciones/Ubicaciones';
import Categorias from '../Screens/Categorias/Categorias';
import ClienteInterno from '../Screens/ClienteInterno/ClienteInterno';


const Drawer = () =>{

  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: '#FFFF',
        drawerStyle: {
          backgroundColor: '#193250',
          width: 300,
        },
      }}
      >
      <Drawer.Screen name="Home" component={Home}
      options={{
        drawerLabel: 'Home',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
        headerStyle: {
          backgroundColor: '#193250'
        },
        headerTitleStyle: {
          color: '#FFFF'
        },
      }} />
      <Drawer.Screen name="Productos" component={Products}
      options={{
        drawerLabel: 'Productos',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
        drawerActiveBackgroundColor: '#2a5487',
        
        headerStyle: {
          backgroundColor: '#193250'
        },
        headerTitleStyle: {
          color: '#FFFF'
        },
      }} />
      <Drawer.Screen name="Asignación" component={Asignaciones}
      options={{
        drawerLabel: 'Asignación',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
        headerStyle: {
          backgroundColor: '#193250'
        },
        headerTitleStyle: {
          color: '#FFFF'
        },
      }} />
      <Drawer.Screen name="Compras" component={Compras}
      options={{
        drawerLabel: 'Compras',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
        drawerActiveBackgroundColor: '#2a5487',
        headerStyle: {
          backgroundColor: '#193250'
        },
        headerTitleStyle: {
          color: '#FFFF'
        },
      }} />
      <Drawer.Screen name="Proveedores" component={Proveedores}
      options={{
        drawerLabel: 'Proveedores',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
        headerStyle: {
          backgroundColor: '#193250'
        },
        headerTitleStyle: {
          color: '#FFFF'
        },
      }} />
      <Drawer.Screen name="Cliente interno" component={ClienteInterno}
      options={{
        drawerLabel: 'Cliente interno',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
        headerStyle: {
          backgroundColor: '#193250'
        },
        headerTitleStyle: {
          color: '#FFFF'
        },
      }} />
      <Drawer.Screen name="Proyectos" component={Proyectos}
      options={{
        headerShown: false,
        drawerLabel: 'Proyectos',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
      }} />
      <Drawer.Screen name="Ubicaciones" component={Ubicaciones}
      options={{
        headerShown: false,
        drawerLabel: 'Ubicaciones',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
      }} />
      <Drawer.Screen name="Áreas" component={Area}
      options={{
        headerShown: false,
        drawerLabel: 'Áreas',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        }
      }} />
      <Drawer.Screen name="Categorias" component={Categorias}
      options={{
        headerShown: false,
        drawerLabel: 'Categorias',
        drawerLabelStyle: {
          color: '#FFFF',
          fontWeight: '300',
        },
      }} />
    </Drawer.Navigator>
  );
};

export default Drawer;