import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa le icone

export default function HomeScreen({ navigation }) {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Capsules!</Text>
      {isAuthenticated ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="user" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rectangleButton}
            onPress={() => navigation.navigate('Messages')}
          >
            <Text style={styles.buttonText}>Invia Messaggio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={logout}
          >
            <Icon name="sign-out" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.rectangleButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rectangleButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Registrati</Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  roundButton: {
    backgroundColor: '#6200EE',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
  },
  rectangleButton: {
    backgroundColor: '#6200EE',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
  },
  buttonText: {
    color: '#FFF',
  },
});
