import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} from '../redux/cartSlice';

import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import theme from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { items, totalAmount } = useSelector((state) => state.cart);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const tax = totalAmount * 0.07;
  const total = totalAmount + tax;

  const handleCheckout = () => {
    dispatch(clearCart());
    setIsCheckedOut(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.cardInfo}>
        <CustomText style={styles.itemName}>{item.name}</CustomText>
        <CustomText style={styles.itemMeta}>
          ${item.price.toFixed(2)} | {item.calories || 250} cal
        </CustomText>
        <CustomText style={styles.linkText}>Show details</CustomText>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(decrementQuantity(item.id))}
          >
            <CustomText style={styles.qtyButtonText}>−</CustomText>
          </TouchableOpacity>
          <View style={styles.qtyBox}>
            <CustomText style={styles.qtyBoxText}>{item.quantity}</CustomText>
          </View>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(incrementQuantity(item.id))}
          >
            <CustomText style={styles.qtyButtonText}>+</CustomText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => dispatch(removeItem(item.id))}
          style={styles.removeButton}
        >
          <CustomText style={styles.removeText}>Remove</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isCheckedOut ? (
        <Animated.View
          style={[
            styles.successScreen,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require('../assests/images/checkout.png')}
            style={styles.successImage}
            resizeMode="contain"
          />

          <CustomText style={styles.successTitle}>
            Your order has been placed successfully
          </CustomText>

          <CustomText style={styles.successDescription}>
            Thank you for choosing us! Feel free to continue shopping and
            explore our wide range of products. Happy Shopping!
          </CustomText>
          <CustomButton
            title="Continue Shopping"
            style={styles.successButton}
            textStyle={styles.successButtonText}
            onPress={() => navigation.navigate('MainTabs')}
           />

        </Animated.View>
      ) : (
        <>
          <CustomText style={styles.title}>My Cart</CustomText>

          {items.length === 0 ? (
            <CustomText style={styles.empty}>Your cart is empty</CustomText>
          ) : (
            <>
              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
              />

              <View style={styles.summarySection}>
                <CustomText style={styles.summaryLabel}>Summary</CustomText>
                <View style={styles.summaryRow}>
                  <CustomText>Subtotal</CustomText>
                  <CustomText>${totalAmount.toFixed(2)}</CustomText>
                </View>
                <View style={styles.summaryRow}>
                  <CustomText>Taxes</CustomText>
                  <CustomText>${tax.toFixed(2)}</CustomText>
                </View>
                <View style={styles.summaryRow}>
                  <CustomText >Total</CustomText>
                  <CustomText>
                    ${total.toFixed(2)}
                  </CustomText>
                </View>
              </View>

              <CustomButton
                title="Checkout"
                onPress={handleCheckout}
                style={styles.checkoutButton}
                textStyle={styles.checkoutText}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background2,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    color: theme.colors.text,
  },
  list: {
    paddingBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: theme.colors.text,
  },
  itemMeta: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  linkText: {
    fontSize: 13,
    color: theme.colors.primary,
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyButtonText: {
    color: theme.colors.textwhite,
    fontSize: 18,
  },
  qtyBox: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginHorizontal: 6,
  },
  qtyBoxText: {
    color: theme.colors.textwhite,
    fontSize: 16,
  },
  removeButton: {
    marginTop: 6,
  },
  removeText: {
    color: theme.colors.danger,
    fontSize: 13,
  },
  promoText: {
    textAlign: 'center',
    color: theme.colors.primary,
    marginVertical: 12,
  },
  summarySection: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: theme.colors.text,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  continueText: {
    color: theme.colors.textwhite,
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  checkoutText: {
    color: theme.colors.textwhite,
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.muted,
    marginTop: 32,
  },
  successScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background2,
    padding: 24,
  },
  successImage: {
    width: 250,
    height: 250,
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  successDescription: {
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: 'center',
    marginBottom: 36,
    paddingHorizontal: 12,
  },
  successButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 36,
    alignItems: 'center',
  },
  successButtonText: {
    color: theme.colors.textwhite,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
