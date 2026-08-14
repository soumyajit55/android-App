import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-basic-elements';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/User';
import AuthService from '../../Services/Auth';

const SignIn = ({ navigation }) => {
  const colors = useTheme();
  const dispatch = useDispatch();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Example call to your AuthService
      const res = await AuthService.login({
        email: usernameOrEmail,
        password: password,
      });

      if (res?.status) {
        dispatch(setUser(res.data));
      } else {
        Alert.alert('Login Failed', res?.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Title */}
        <Text style={styles.title}>Welcome{'\n'}Back!</Text>

        {/* Username/Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="user" size={16} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor="#8E8E93"
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={16} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8E8E93"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: colors.primaryThemeColor || '#F44336' }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Social Dividers & Icons */}
        <View style={styles.socialSection}>
          <Text style={styles.orText}>- OR Continue with -</Text>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="google" size={20} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="apple" size={22} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook-f" size={20} color="#1877F2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Navigation Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Create An Account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.signUpText, { color: colors.primaryThemeColor || '#F44336' }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 44,
    marginBottom: 36,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    paddingHorizontal: 16,
    height: 55,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#F44336',
    fontSize: 12,
    fontWeight: '500',
  },
  loginButton: {
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  orText: {
    fontSize: 12,
    color: '#575757',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4F4',
    marginHorizontal: 6,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#575757',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});