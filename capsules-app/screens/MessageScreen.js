import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function MessageScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const username = 'yourUsername'; // Dovrebbe essere l'username dell'utente loggato
  
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://192.168.1.14:3000/messages/${username}`);
      setMessages(response.data);
    } catch (error) {
      alert(`Errore nel recupero dei messaggi: ${error.message}`);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/sendMessage', {
        sender: username,
        receiver: 'receiverUsername', // Sostituire con il destinatario effettivo
        message: newMessage
      });
      if (response.status === 201) {
        fetchMessages(); // Aggiorna i messaggi dopo l'invio
        setNewMessage('');
      } else {
        alert('Errore nell\'invio del messaggio. Per favore, riprova.');
      }
    } catch (error) {
      alert(`Errore nell'invio del messaggio: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messaggi</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.sender}: {item.message}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Scrivi un messaggio"
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <Button title="Invia" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
