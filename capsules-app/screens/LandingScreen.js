import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function LandingScreen({ navigation }) {
  const scaleValue = useState(new Animated.Value(1))[0];

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
        <View style={styles.bottomContainer}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              style={[styles.button, styles.leftButton]}
              onPress={() => { animateButton(); navigation.navigate('Login'); }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              style={[styles.button, styles.rightButton]}
              onPress={() => { animateButton(); navigation.navigate('Register'); }}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#32CD32', // Verde
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: 150, // Larghezza fissa per i pulsanti
  },
  buttonText: {
    color: '#FFF',
  },
  leftButton: {
    marginLeft: 10, // Margine a sinistra
  },
  rightButton: {
    marginRight: 10, // Margine a destra
  },
});
