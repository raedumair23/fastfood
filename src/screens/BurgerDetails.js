import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../constants/theme';
import CustomText from '../components/CustomText';
import fonts from '../assests/fonts/fonts';

export default function BurgerDetailsScreen({ navigation, route }) {
  const { name, image, description, price, rate, country } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.image} />

      <CustomText style={styles.name}>{name}</CustomText>
      <CustomText style={styles.price}>{price}</CustomText>
      <CustomText style={styles.description}>{description}</CustomText>
      <CustomText style={styles.subInfo}>
        ⭐ {rate} rating | 📍 {country}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 6,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 40,
  },
  name: {
    fontSize: 22,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontFamily: fonts.medium,
    textAlign: 'center',
    color: theme.colors.primary,
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    color: theme.colors.text,
  },
  subInfo: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    color: theme.colors.textSecondary,
  },
});
