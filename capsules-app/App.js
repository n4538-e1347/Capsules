import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './contexts/AuthContext';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MessageScreen from './screens/MessageScreen';
import LandingScreen from './screens/LandingScreen';
import SendFriendRequestScreen from './screens/SendFriendRequestScreen';
import PendingFriendRequestsScreen from './screens/PendingFriendRequestsScreen';
import ConfirmFriendRequestScreen from './screens/ConfirmFriendRequestScreen';
import FriendsListScreen from './screens/FriendsListScreen';
import ProfileScreen from './screens/ProfileScreen';
import RequestPasswordResetScreen from './screens/RequestPasswordResetScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Messages" component={MessageScreen} />
            <Stack.Screen name="SendFriendRequest" component={SendFriendRequestScreen} />
            <Stack.Screen name="PendingFriendRequests" component={PendingFriendRequestsScreen} />
            <Stack.Screen name="ConfirmFriendRequest" component={ConfirmFriendRequestScreen} />
            <Stack.Screen name="FriendsList" component={FriendsListScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="RequestPasswordReset" component={RequestPasswordResetScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
