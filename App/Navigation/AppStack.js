// App/Navigation/AppStack.js
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProductDetailsScreen from '../Screens/Home/ProductDetailsScreen';
import CartScreen from '../Screens/Cart/CartScreen'; // Import CartScreen
import CheckoutScreen from '../Screens/Checkout/CheckoutScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import PaymentScreen from '../Screens/Checkout/PaymentScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;