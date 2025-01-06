import React, { useEffect } from 'react';
import { BackHandler, Alert, SafeAreaView, StyleSheet } from 'react-native';
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
import ArchivedMessagesScreen from './screens/ArchivedMessagesScreen';
import SettingsScreen from './screens/SettingsScreen';
import LanguageScreen from './screens/LanguageScreen';
import './i18n'; 
import HelpScreen from './screens/HelpScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Attenzione!", "Vuoi davvero uscire dall'app?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Sì", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator 
              initialRouteName="Landing" 
              screenOptions={{ headerShown: false }}
            >
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
			  <Stack.Screen name="ArchivedMessagesScreen" component={ArchivedMessagesScreen} />
			  <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
			  <Stack.Screen name="LanguageScreen" component={LanguageScreen} />		
			  <Stack.Screen name="HelpScreen" component={HelpScreen} />				  
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
