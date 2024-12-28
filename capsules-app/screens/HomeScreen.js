import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa le icone

export default function HomeScreen({ navigation }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];

  const handleLogout = () => {
    logout();
    navigation.navigate('Landing');
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Capsules!</Text>
        {isAuthenticated ? (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => { animateButton(); navigation.navigate('Profile'); }}
              >
                <Icon name="user" size={24} color="#FFF" />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => { animateButton(); navigation.navigate('Messages'); }}
              >
                <Text style={styles.buttonText}>Invia Messaggio</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => { animateButton(); handleLogout(); }}
              >
                <Icon name="sign-out" size={24} color="#FFF" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => { animateButton(); navigation.navigate('Login'); }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => { animateButton(); navigation.navigate('Register'); }}
              >
                <Text style={styles.buttonText}>Registrati</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFACD', // Colore di sfondo giallo pallido
  },
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
    backgroundColor: '#32CD32', // Verde
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  rectangleButton: {
    backgroundColor: '#32CD32', // Verde
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
  },
});
