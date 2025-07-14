import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FoodScreen from './FoodCategories';
import theme from '../constants/theme';
import fonts from '../assests/fonts/fonts';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
        tabBarLabelStyle: {
          fontFamily: fonts.regular,
          fontSize: 16,
        },
        tabBarStyle: { backgroundColor: theme.colors.surface },
      }}
    >
      <Tab.Screen name="Burgers">
        {props => <FoodScreen {...props} category="burgers" />}
      </Tab.Screen>
      <Tab.Screen name="Pizzas">
        {props => <FoodScreen {...props} category="pizzas" />}
      </Tab.Screen>
      <Tab.Screen name="Desserts">
  {props => <FoodScreen {...props} category="desserts" />}
</Tab.Screen>
      
    </Tab.Navigator>
  );
}
