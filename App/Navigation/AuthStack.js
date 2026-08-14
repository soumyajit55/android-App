// App/Navigation/AuthStack.js
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Splash from '../Screens/Auth/Splash';
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/SignUp'; 

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} /> 
    </Stack.Navigator>
  );
};

export default AuthStack;