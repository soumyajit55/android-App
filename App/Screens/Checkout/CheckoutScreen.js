import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItem } = route.params || {};
  const { userData } = useSelector((state) => state.User || {});

  const price = cartItem?.formattedPrice || 7000;
  const shipping = 30;
  const grandTotal = price + shipping;

  const handleProceedToPayment = () => {
    // Check if phone/address exist in profile
    if (!userData?.address || !userData?.pincode) {
      Alert.alert(
        'Address Required',
        'Please complete your address details in Profile before proceeding to payment.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Profile', onPress: () => navigation.navigate('ProfileScreen') },
        ]
      );
      return;
    }
    navigation.navigate('PaymentScreen', { grandTotal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 18 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Delivery Address Box */}
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Text style={styles.cardTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Icon name="edit" size={14} color="#F44336" />
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            {userData?.address
              ? `${userData.address}, ${userData.city}, ${userData.pincode}`
              : '216 St Pauls Rd, London N12LL, UK'}
          </Text>
        </View>

        {/* Selected Item List */}
        <Text style={styles.sectionHeader}>Shopping List</Text>
        <View style={styles.itemCard}>
          <Image
            source={{ uri: cartItem?.image || 'https://via.placeholder.com/100' }}
            style={styles.itemImg}
            resizeMode="contain"
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {cartItem?.title || "Women's Casual Wear"}
            </Text>
            <Text style={styles.itemMeta}>
              Variations: <Text style={{ color: '#000' }}>Black / 8 UK</Text>
            </Text>
            <Text style={styles.itemPrice}>₹{price}</Text>
          </View>
        </View>

        {/* Order Payment Details */}
        <Text style={styles.sectionHeader}>Order Payment Details</Text>
        <View style={styles.billBox}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Order Amount</Text>
            <Text style={styles.billVal}>₹{price}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Convenience / Shipping</Text>
            <Text style={styles.billVal}>₹{shipping}</Text>
          </View>
          <View style={[styles.billRow, { borderTopWidth: 1, borderColor: '#EEE', paddingTop: 8 }]}>
            <Text style={[styles.billLabel, { fontWeight: '800', color: '#000' }]}>Order Total</Text>
            <Text style={[styles.billVal, { fontWeight: '800', color: '#000' }]}>₹{grandTotal}</Text>
          </View>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.payBtn} onPress={handleProceedToPayment}>
          <Text style={styles.payBtnText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

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
  content: { padding: 16 },
  addressCard: {
    backgroundColor: '#FAFAFA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 20,
  },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#000' },
  addressText: { fontSize: 12, color: '#666', lineHeight: 16 },
  sectionHeader: { fontSize: 14, fontWeight: '700', color: '#000', marginBottom: 12 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  itemImg: { width: 70, height: 70 },
  itemDetails: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  itemTitle: { fontSize: 13, fontWeight: '700', color: '#000' },
  itemMeta: { fontSize: 11, color: '#888', marginVertical: 4 },
  itemPrice: { fontSize: 14, fontWeight: '800', color: '#000' },
  billBox: { backgroundColor: '#FAFAFA', padding: 12, borderRadius: 8, marginBottom: 24 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  billLabel: { fontSize: 12, color: '#666' },
  billVal: { fontSize: 12, color: '#000', fontWeight: '600' },
  payBtn: {
    backgroundColor: '#F44336',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});