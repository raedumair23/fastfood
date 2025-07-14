import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/Homescreen';
import DetailsDrawer from './DetailsDrawer';
import ProfileScreen from '../screens/ProfileScreen';
import theme from '../constants/theme';
import fonts from '../assests/fonts/fonts';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Menu') {
            iconName = 'restaurant-menu';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
  backgroundColor: theme.colors.surface,
  borderTopWidth: 0,
  elevation: 5,
  height: 60, // optional: fix height
  paddingBottom: 8, // fix for Android overlap
  paddingTop: 0, // even spacing
},

        tabBarLabelStyle: {
          fontFamily: fonts.regular,
          fontSize: 12,
        },
        headerTitleStyle: {
          fontFamily: fonts.regular,
          fontSize: 20,
          color: theme.colors.text,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          shadowColor: 'transparent',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}
      
      />
      <Tab.Screen name="Menu" component={DetailsDrawer} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
