import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AddFriendScreen({ navigation }) {
  const [friendUsername, setFriendUsername] = useState('');

  const handleAddFriend = async () => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/addFriend', {
        username: 'yourUsername',  // sostituire con l'username dell'utente loggato
        friendUsername: friendUsername
      });
      if (response.status === 200) {
        alert('Amico aggiunto con successo');
      } else {
        alert('Errore nell\'aggiunta dell\'amico. Per favore, riprova.');
      }
    } catch (error) {
      alert(`Errore di connessione: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aggiungi un Amico</Text>
      <TextInput
        style={styles.input}
        placeholder="Username dell'amico"
        value={friendUsername}
        onChangeText={setFriendUsername}
      />
      <Button title="Aggiungi Amico" onPress={handleAddFriend} />
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
