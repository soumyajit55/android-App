import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'react-native-basic-elements';

const ForgotPassword = ({ navigation }) => {
  const colors = useTheme();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Forgot{'\n'}password?</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={16} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#8E8E93"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.noteText}>
          <Text style={{ color: colors.primaryThemeColor || '#F44336' }}>* </Text>
          We will send you a message to set or reset your new password
        </Text>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primaryThemeColor || '#F44336' }]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  innerContainer: { paddingHorizontal: 28, paddingTop: 40 },
  title: { fontSize: 36, fontWeight: '800', color: '#000000', lineHeight: 44, marginBottom: 36 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    paddingHorizontal: 16,
    height: 55,
    marginBottom: 12,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 14, color: '#000000' },
  noteText: { fontSize: 11, color: '#676767', marginBottom: 30 },
  button: {
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});