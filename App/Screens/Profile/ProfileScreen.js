import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/reducer/User';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.User || {});

  const [pincode, setPincode] = useState(userData?.pincode || '');
  const [address, setAddress] = useState(userData?.address || '');
  const [city, setCity] = useState(userData?.city || '');
  const [stateName, setStateName] = useState(userData?.stateName || '');
  const [mobile, setMobile] = useState(userData?.mobile || '');

  const handleSaveProfile = () => {
    if (!pincode || !address || !city || !mobile) {
      Alert.alert('Required', 'Please fill in all address and contact details.');
      return;
    }

    const updatedUser = {
      ...userData,
      pincode,
      address,
      city,
      stateName,
      mobile,
    };

    dispatch(setUser(updatedUser));
    Alert.alert('Success', 'Profile & Shipping Address updated!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Shipping</Text>
        <View style={{ width: 18 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="user" size={30} color="#FFF" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Contact & Address Details</Text>

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />

        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 400016"
          keyboardType="number-pad"
          value={pincode}
          onChangeText={setPincode}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="House no, Street area"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>City</Text>
        <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />

        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="State"
          value={stateName}
          onChangeText={setStateName}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
          <Text style={styles.saveBtnText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#000', marginBottom: 16 },
  label: { fontSize: 11, fontWeight: '700', color: '#333', marginBottom: 6 },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 14,
    fontSize: 13,
    color: '#000',
  },
  saveBtn: {
    backgroundColor: '#F44336',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});