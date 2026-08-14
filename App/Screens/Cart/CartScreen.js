import React from 'react';
import {
  StyleSheet,
  Text,
  View,
//   SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../Redux/reducer/Cart';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.Cart || { cartItems: [] });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.formattedPrice * item.quantity,
    0
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartCard}>
      <Image source={{ uri: item.image }} style={styles.itemImg} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.itemMeta}>Size: {item.selectedSize}</Text>
        <Text style={styles.itemPrice}>₹{item.formattedPrice * item.quantity}</Text>

        {/* Quantity Controls */}
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  selectedSize: item.selectedSize,
                  type: 'decrease',
                })
              )
            }
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  selectedSize: item.selectedSize,
                  type: 'increase',
                })
              )
            }
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() =>
          dispatch(
            removeFromCart({ id: item.id, selectedSize: item.selectedSize })
          )
        }
      >
        <Icon name="trash" size={14} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
        <View style={{ width: 18 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-bag" size={50} color="#CCC" />
          <Text style={styles.emptyText}>Your cart is empty!</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.shopBtnText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.id}-${item.selectedSize}-${index}`}
            renderItem={renderCartItem}
            contentContainerStyle={{ padding: 16 }}
          />

          {/* Footer Checkout Bar */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalVal}>₹{totalAmount}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() =>
                navigation.navigate('Checkout', {
                  cartItem: { formattedPrice: totalAmount, title: 'Cart Checkout' },
                })
              }
            >
              <Text style={styles.checkoutBtnText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#000' },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImg: { width: 70, height: 70 },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 13, fontWeight: '700', color: '#000' },
  itemMeta: { fontSize: 11, color: '#666', marginVertical: 2 },
  itemPrice: { fontSize: 13, fontWeight: '800', color: '#000' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 10 },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: { fontSize: 14, fontWeight: '700', color: '#000' },
  qtyText: { fontSize: 13, fontWeight: '700', color: '#000' },
  deleteBtn: { padding: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 16, color: '#666', marginTop: 12, marginBottom: 20 },
  shopBtn: {
    backgroundColor: '#F44336',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  shopBtnText: { color: '#FFF', fontWeight: '700' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  totalLabel: { fontSize: 11, color: '#666' },
  totalVal: { fontSize: 18, fontWeight: '800', color: '#000' },
  checkoutBtn: {
    backgroundColor: '#F44336',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
});