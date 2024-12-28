import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa l'icona

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/login', { username, password });
      if (response.status === 200) {
        const userData = { username }; // Salva l'username dell'utente
        login(userData); // Passa i dati dell'utente alla funzione di login del contesto
        navigation.navigate('Home');
      } else {
        alert('Login fallito. Per favore, controlla le tue credenziali.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Username o password non corretti');
      } else {
        alert(`Errore di connessione: ${error.message}`);
      }
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
        <Text style={styles.title}>Login</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          value={username} 
          onChangeText={setUsername} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); handleLogin(); }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.navigate('RequestPasswordReset')}>
          <Text style={styles.link}>Password dimenticata?</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#32CD32', // Verde
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
    marginVertical: 10, // Aggiunge margine tra i pulsanti
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
  link: {
    color: 'blue',
    marginTop: 10,
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
