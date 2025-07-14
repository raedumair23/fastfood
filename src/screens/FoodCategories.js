import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCard from '../components/CustomCard';
import CustomText from '../components/CustomText';
import apiUrls from '../constants/apiUrls';
import { addToCart } from '../redux/cartSlice';
import theme from '../constants/theme';

const FoodScreen = ({ category }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFood = async () => {
    try {
      if (category === 'menu') {
        const [burgersRes, pizzasRes, dessertsRes] = await Promise.all([
          axios.get(apiUrls.burgers),
          axios.get(apiUrls.pizzas),
          axios.get(apiUrls.desserts),
        ]);
        setFoods([
          ...burgersRes.data,
          ...pizzasRes.data,
          ...dessertsRes.data,
        ]);
      } else {
        const res = await axios.get(`${apiUrls.base}/${category}`);
        setFoods(res.data);
      }
    } catch (err) {
      console.error(`Error fetching ${category}:`, err.message);
      setError(`Failed to load ${category}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [category]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('CartScreen')}
          style={{ marginRight: 16 }}
        >
          <Icon name="cart-outline" size={24} color="#000" />
          {cart.totalQuantity > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.totalQuantity}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart.totalQuantity]);

  const renderItem = ({ item }) => (
    <CustomCard
      image={item.img}
      name={item.name}
      description={item.dsc}
      price={`$${item.price}`}
      subtitle={item.country ? `From: ${item.country}` : ''}
      onPress={() =>
        navigation.navigate('BurgerDetails', {
          name: item.name,
          image: item.img,
          description: item.dsc,
          price: `$${item.price}`,
          rate: item.rate || 'N/A',
          country: item.country || 'Unknown',
        })
      }
      onAddToCart={() =>
        dispatch(
          addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.img,
          })
        )
      }
    />
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e91e63" />
        <CustomText>Loading {category}...</CustomText>
      </View>
    );
  }

  if (error) {
    return (
     <View style={styles.centered}>
     <CustomText style={styles.errorText}>{error}</CustomText>
     </View>

    );
  }

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor:theme.colors.foodcat,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor:theme.colors.badge,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: theme.colors.textwhite,
    fontSize: 12,
  },
  centered: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 12,
},
errorText: {
  color:theme.colors.error,
  fontSize: 14,
  textAlign: 'center',
},

});

export default FoodScreen;
