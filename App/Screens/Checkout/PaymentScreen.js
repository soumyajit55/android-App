import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const METHODS = [
  { id: 'visa', name: 'VISA / MasterCard', icon: 'cc-visa' },
  { id: 'paypal', name: 'PayPal', icon: 'cc-paypal' },
  { id: 'apple', name: 'Apple Pay', icon: 'apple' },
];

const PaymentScreen = ({ route, navigation }) => {
  const { grandTotal = 7030 } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('visa');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleContinuePayment = () => {
    setSuccessModalVisible(true);
  };

  const handleFinish = () => {
    setSuccessModalVisible(false);
    navigation.navigate('HomeScreen');
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

      <View style={styles.content}>
        {/* Bill Summary */}
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Total Order Amount:</Text>
          <Text style={styles.amount}>₹{grandTotal}</Text>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>

        {/* Method Selectors */}
        {METHODS.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.methodCard,
              selectedMethod === m.id && styles.activeMethodCard,
            ]}
            onPress={() => setSelectedMethod(m.id)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Icon name={m.icon} size={22} color="#222" />
              <Text style={styles.methodName}>{m.name}</Text>
            </View>
            <Icon
              name={selectedMethod === m.id ? 'dot-circle' : 'circle'}
              size={16}
              color={selectedMethod === m.id ? '#F44336' : '#CCC'}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.payBtn} onPress={handleContinuePayment}>
          <Text style={styles.payBtnText}>Continue & Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Successful Modal */}
      <Modal transparent visible={successModalVisible} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={styles.successIconCircle}>
              <Icon name="check" size={28} color="#FFF" />
            </View>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successSub}>Your order has been placed successfully.</Text>

            <TouchableOpacity style={styles.modalBtn} onPress={handleFinish}>
              <Text style={styles.modalBtnText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentScreen;

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
  content: { padding: 20 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  label: { fontSize: 14, color: '#666' },
  amount: { fontSize: 16, fontWeight: '800', color: '#000' },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#000', marginBottom: 16 },
  methodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    marginBottom: 12,
  },
  activeMethodCard: { borderColor: '#F44336', backgroundColor: '#FFF5F5' },
  methodName: { fontSize: 13, fontWeight: '600', color: '#000' },
  payBtn: {
    backgroundColor: '#F44336',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  payBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 6 },
  successSub: { fontSize: 12, color: '#666', textAlign: 'center', marginBottom: 20 },
  modalBtn: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
});