// App/Screens/Auth/SignUp.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-basic-elements';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/User'; // Import your Redux action

const SignUp = ({ navigation }) => {
  const colors = useTheme();
  const dispatch = useDispatch();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Registration Handler
  const handleSignUp = () => {
    if (!usernameOrEmail || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    // Create dummy user object
    const dummyUser = {
      email: usernameOrEmail,
      name: usernameOrEmail.split('@')[0] || 'User',
      token: 'dummy_auth_token_12345',
    };

    setTimeout(() => {
      setLoading(false);
      // Dispatching setUser updates Redux state `loginStatus` to true
      // App.js automatically switches from AuthStack to AppStack (HomeScreen)
      dispatch(setUser(dummyUser));
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create an{'\n'}account</Text>

        {/* Email Input */}
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
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={16} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#8E8E93"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <MaterialIcon
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By clicking the <Text style={{ color: colors.primaryThemeColor || '#F44336' }}>Register</Text> button, you agree to the public offer
        </Text>

        {/* Create Account Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primaryThemeColor || '#F44336' }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Social Icons */}
        <View style={styles.socialSection}>
          <Text style={styles.orText}>- OR Continue with -</Text>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleSignUp}>
              <Icon name="google" size={20} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={handleSignUp}>
              <Icon name="apple" size={22} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={handleSignUp}>
              <Icon name="facebook-f" size={20} color="#1877F2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>I Already Have An Account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.loginText, { color: colors.primaryThemeColor || '#F44336' }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { paddingHorizontal: 28, paddingTop: 40, paddingBottom: 20 },
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
    marginBottom: 20,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 14, color: '#000000' },
  termsText: { fontSize: 11, color: '#676767', marginBottom: 25 },
  button: {
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  socialSection: { alignItems: 'center', marginBottom: 30 },
  orText: { fontSize: 12, color: '#575757', marginBottom: 20 },
  socialButtonsContainer: { flexDirection: 'row', justifyContent: 'center' },
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
  footerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 14, color: '#575757' },
  loginText: { fontSize: 14, fontWeight: '700', textDecorationLine: 'underline' },
});