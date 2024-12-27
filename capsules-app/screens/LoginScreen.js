import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

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

  return (
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('RequestPasswordReset')}>
        <Text style={styles.link}>Password dimenticata?</Text>
      </TouchableOpacity>
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
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    marginTop: 10,
  }
});
