import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FoodScreen from '../screens/FoodCategories'; 
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import theme from '../constants/theme';
import fonts from '../assests/fonts/fonts';

const Drawer = createDrawerNavigator();
function CustomDrawerContent({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
            navigation.closeDrawer();
          }}
          style={styles.link}
        >
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AllItems'); 
            navigation.closeDrawer();
          }}
          style={styles.link}
        >
          <Text style={styles.linkText}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile'); 
            navigation.closeDrawer();
          }}
          style={styles.link}
        >
          <Text style={styles.linkText}>Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ✅ Drawer Setup
export default function DetailsDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontSize: 20,
          color: theme.colors.text,
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerLabelStyle: {
          fontFamily: fonts.regular,
          fontSize: 16,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.primary,
      }}
    >
      <Drawer.Screen
        name="menu"
        options={{ title: 'Menu' }}
      >
        {(props) => <FoodScreen {...props} category="menu" />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  link: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: theme.colors.primary,
  },
});
