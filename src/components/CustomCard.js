import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import theme from '../constants/theme';
import fonts from '../assests/fonts/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CustomCard({
  image,
  name,
  description,
  price,
  avatar,
  subtitle,
  showPrice,
  onPress,
  onAddToCart, // ← used only for food cards
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.card, avatar && styles.avatarCard]}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={avatar ? styles.avatarImage : styles.foodImage}
          />
        ) : avatar ? (
          <View style={styles.iconFallback}>
            <MaterialIcons name="person" size={40} color={theme.colors.primary} />
          </View>
        ) : null}

        <View style={styles.infoContainer}>
          {name && (
            <CustomText bold style={styles.name}>
              {name}
            </CustomText>
          )}
          {subtitle && (
            <CustomText style={styles.subtitle}>
              {subtitle}
            </CustomText>
          )}
          {description && (
            <CustomText style={styles.foodDescription}>{description}</CustomText>
          )}
          {showPrice && price && (
            <CustomText style={styles.foodPrice}>{price}</CustomText>
          )}

          {/* ✅ Add to Cart button for food cards only */}
          {!avatar && onAddToCart && (
            <CustomButton
              title="Add to Cart"
              onPress={onAddToCart}
              style={styles.cartButton}
              textStyle={styles.cartButtonText}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    paddingBottom: 16,
  },
  avatarCard: {
    width: '100%',
    paddingVertical: 20,
  },
  foodImage: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  iconFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  infoContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    fontFamily: fonts.medium,
    marginBottom: 6,
  },
  foodDescription: {
    fontSize: 14,
    color: theme.colors.muted,
    fontFamily: fonts.regular,
    marginTop: 4,
    textAlign: 'center',
  },
  foodPrice: {
    fontSize: 16,
    color: theme.colors.primary,
    fontFamily: fonts.medium,
    marginTop: 6,
  },
  cartButton: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  cartButtonText: {
    color: theme.colors.textwhite,
    fontSize: 14,
  },
});
