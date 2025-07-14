

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomNavigation';
import BurgerDetailsScreen from '../screens/BurgerDetails';
const Stack = createNativeStackNavigator();
import CartScreen from '../screens/CartScreen'; // Adjust path as needed



export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
 
         <Stack.Screen name="BurgerDetails" component={BurgerDetailsScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
   
  );
}
