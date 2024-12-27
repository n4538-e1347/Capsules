import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Capsules!</Text>
      {isAuthenticated ? (
        <>
          <Button title="Invia Messaggio" onPress={() => navigation.navigate('Messages')} />
          <Button title="Vai al Profilo" onPress={() => navigation.navigate('Profile')} />
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
          <Button title="Registrati" onPress={() => navigation.navigate('Register')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
