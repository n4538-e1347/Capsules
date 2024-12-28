import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function ResetPasswordScreen({ navigation }) {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const scaleValue = useState(new Animated.Value(1))[0];

  const handleResetPassword = async () => {
    try {
      const trimmedToken = token.trim();
      const trimmedPassword = newPassword.trim();
      
      const response = await axios.post('http://192.168.1.14:3000/resetPassword', { token: trimmedToken, newPassword: trimmedPassword });
      if (response.status === 200) {
        alert('Password resettata con successo');
        navigation.navigate('Login');  // Utilizza la navigazione di React Native per andare alla schermata di login
      } else {
        alert('Errore nel reset della password. Per favore, riprova.');
      }
    } catch (error) {
      alert(`Errore di connessione: ${error.message}`);
    }
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
        <Text style={styles.title}>Reset della Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Token" 
          value={token} 
          onChangeText={setToken} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Nuova Password" 
          value={newPassword} 
          onChangeText={setNewPassword} 
          secureTextEntry 
        />
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => { animateButton(); handleResetPassword(); }}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.bottomContainer}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => { animateButton(); navigation.goBack(); }}
            >
              <Text>
                <Icon name="arrow-left" size={24} color="#FFF" />  {/* Icona back */}
              </Text>
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
    paddingTop: 40, // Aggiungi padding per evitare sovrapposizioni con la status bar
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  resetButton: {
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
    width: 150, // Larghezza fissa per i pulsanti
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  backButton: {
    backgroundColor: '#32CD32', // Verde
    borderRadius: 50, // Pulsante rotondo
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
});
