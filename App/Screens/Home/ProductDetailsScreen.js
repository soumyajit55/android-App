import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/reducer/Cart';

const SIZES = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'];

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [selectedSize, setSelectedSize] = useState('8 UK');

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.Cart || { cartItems: [] });

  const priceInINR = Math.round((product?.price || 50) * 80);

  const handleAddToCart = () => {
    const cartItem = {
      id: product?.id || Date.now(),
      title: product?.title || 'Nike Sneakers',
      image: product?.image || 'https://via.placeholder.com/300',
      description: product?.description,
      selectedSize,
      formattedPrice: priceInINR,
    };

    dispatch(addToCart(cartItem));
    Alert.alert(
      'Added to Cart',
      `${cartItem.title} (${selectedSize}) has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => navigation.navigate('CartScreen') },
      ]
    );
  };

  const handleBuyNow = () => {
    const cartItem = {
      id: product?.id || Date.now(),
      title: product?.title || 'Nike Sneakers',
      image: product?.image || 'https://via.placeholder.com/300',
      selectedSize,
      formattedPrice: priceInINR,
    };
    dispatch(addToCart(cartItem));
    navigation.navigate('Checkout', { cartItem });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color="#000" />
        </TouchableOpacity>
        
        {/* Cart Icon with Item Badge */}
        <TouchableOpacity style={styles.cartIconContainer} onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="shopping-cart" size={18} color="#000" />
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product?.image || 'https://via.placeholder.com/300' }}
          style={styles.productImg}
          resizeMode="contain"
        />

        <View style={styles.content}>
          <Text style={styles.sectionLabel}>Size: {selectedSize}</Text>
          <View style={styles.sizeRow}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeChip,
                  selectedSize === size && styles.activeSizeChip,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.activeSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.title}>{product?.title || 'Nike Sneakers'}</Text>
          <Text style={styles.subtitle}>Vision Alta Men's Shoes Size (All Colours)</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{priceInINR}</Text>
            <Text style={styles.oldPrice}>₹{priceInINR * 2}</Text>
            <Text style={styles.discount}>50% OFF</Text>
          </View>

          <Text style={styles.sectionLabel}>Product Details</Text>
          <Text style={styles.description}>
            {product?.description ||
              'Perhaps the most iconic sneaker of all-time, this original colorway is the cornerstone to any sneaker collection.'}
          </Text>

          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryTitle}>Delivery in</Text>
            <Text style={styles.deliveryTime}>1 Within Hour</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
              <Icon name="shopping-cart" size={14} color="#FFF" />
              <Text style={styles.btnText}> Go to cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
              <Icon name="shopping-bag" size={14} color="#FFF" />
              <Text style={styles.btnText}> Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  cartIconContainer: { position: 'relative', padding: 4 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#F44336',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#FFF', fontSize: 9, fontWeight: '800' },
  productImg: { width: '100%', height: 260, backgroundColor: '#FAFAFA' },
  content: { padding: 16 },
  sectionLabel: { fontSize: 13, fontWeight: '700', marginTop: 12, marginBottom: 8 },
  sizeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  sizeChip: {
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  activeSizeChip: { backgroundColor: '#F44336' },
  sizeText: { fontSize: 11, color: '#F44336', fontWeight: '600' },
  activeSizeText: { color: '#FFF' },
  title: { fontSize: 18, fontWeight: '800', color: '#000' },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  price: { fontSize: 18, fontWeight: '800', color: '#000' },
  oldPrice: { fontSize: 13, color: '#999', textDecorationLine: 'line-through' },
  discount: { fontSize: 12, color: '#F44336', fontWeight: '700' },
  description: { fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 16 },
  deliveryBadge: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  deliveryTitle: { fontSize: 11, color: '#555' },
  deliveryTime: { fontSize: 14, fontWeight: '800', color: '#000' },
  btnRow: { flexDirection: 'row', gap: 12 },
  cartBtn: {
    flex: 1,
    backgroundColor: '#3B5998',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyBtn: {
    flex: 1,
    backgroundColor: '#F44336',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
});