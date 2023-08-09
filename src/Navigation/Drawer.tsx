import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Area from '../Screens/Areas/Area';
import Products from '../Screens/Products/Products';
import Home from '../Screens/Principal/Home';

const Drawer = () =>{
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#193250',
          width: 280,
        }
      }}
      >
      <Drawer.Screen name="Home" component={Home}
      options={{
        drawerLabel: 'Home',
        drawerLabelStyle: {
          color: 'white',
        },
      }} />
      <Drawer.Screen name="Productos" component={Products}
      options={{
        drawerLabel: 'Productos',
        drawerLabelStyle: {
          color: 'white',
        },
      }} />
      <Drawer.Screen name="Areas" component={Area}
      options={{
        drawerLabel: 'Areas',
        drawerLabelStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#193250'
        },
        headerTitleStyle: {
          color: '#FFFF'
        },
      }} />
    </Drawer.Navigator>
  );
};

export default Drawer;