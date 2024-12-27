import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RequestPasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');  // Cambia da username a email

  const handleRequestReset = async () => {
    try {
      const trimmedEmail = email.trim();  // Trimmare gli spazi all'inizio e alla fine

      const response = await axios.post('http://192.168.1.14:3000/requestPasswordReset', { email: trimmedEmail });  // Usa l'email
      if (response.status === 200) {
        alert('Email di reset della password inviata con successo');
        navigation.navigate('Login');
      } else {
        alert('Errore nella richiesta di reset della password. Per favore, riprova.');
      }
    } catch (error) {
      alert(`Errore di connessione: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset della Password</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}  // Cambia da setUsername a setEmail
      />
      <Button title="Richiedi Reset" onPress={handleRequestReset} />
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
});
