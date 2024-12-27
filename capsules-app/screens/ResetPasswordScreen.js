import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ResetPasswordScreen({ navigation }) {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const trimmedToken = token.trim();
      const trimmedPassword = newPassword.trim();
      
      const response = await axios.post('http://192.168.1.14:3000/resetPassword', { token: trimmedToken, newPassword: trimmedPassword });
      if (response.status === 200) {
        alert('Password resettata con successo');
        navigation.navigate('Login');
      } else {
        alert('Errore nel reset della password. Per favore, riprova.');
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
      <Button title="Reset Password" onPress={handleResetPassword} />
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
