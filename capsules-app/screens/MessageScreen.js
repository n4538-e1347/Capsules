import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function MessageScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const username = 'yourUsername'; // Dovrebbe essere l'username dell'utente loggato
  const scaleValue = useState(new Animated.Value(1))[0];

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

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Messaggi</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Scrivi un messaggio"
            value={newMessage}
            onChangeText={setNewMessage}
            maxLength={150} // Imposta il limite di caratteri a 150
            multiline={true} // Permette il testo su più righe
          />
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.message}>
              <Text>{item.sender}: {item.message}</Text>
            </View>
          )}
        />
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
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => { animateButton(); sendMessage(); }}
            >
              <Text style={styles.buttonText}>Invia</Text>
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
    paddingTop: 40, // Aumenta il padding per spostare il testo "Messaggi" più in basso
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center', // Centra verticalmente
    marginBottom: 20, // Spazio dal titolo
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top', // Allinea il testo in alto
    height: 200, // Aumenta l'altezza dell'input per contenere visivamente i 150 caratteri
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Allinea orizzontalmente
    alignItems: 'center', // Centra verticalmente
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  sendButton: {
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
    marginHorizontal: 10, // Spazio orizzontale tra i pulsanti
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
    marginHorizontal: 10, // Spazio orizzontale tra i pulsanti
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
