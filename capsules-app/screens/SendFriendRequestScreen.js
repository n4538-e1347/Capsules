import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function SendFriendRequestScreen({ navigation }) {
  const [friendUsername, setFriendUsername] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        navigation.navigate('Profile');  // Naviga alla pagina del profilo dopo 2,5 secondi
      }, 2500);

      return () => clearTimeout(timer);  // Cleanup il timer
    }
  }, [showConfirmation, navigation]);

  const handleSendRequest = async () => {
    if (!user || !user.username) {
      setConfirmationMessage('Errore di autenticazione. Per favore, effettua nuovamente il login.');
      setShowConfirmation(true);
      return;
    }

    const trimmedFriendUsername = friendUsername.trim(); // Trimma gli spazi dall'username dell'amico

    if (message.length > 100) {
      setConfirmationMessage('Il messaggio non può superare i 100 caratteri.');
      setShowConfirmation(true);
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.14:3000/sendFriendRequest', { username: user.username, friendUsername: trimmedFriendUsername, message });
      if (response.status === 200) {
        setConfirmationMessage('Richiesta di amicizia inviata con successo');
        setShowConfirmation(true);
      } else {
        setConfirmationMessage('Errore nell\'invio della richiesta di amicizia');
        setShowConfirmation(true);
      }
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 404)) {
        setConfirmationMessage(error.response.data);  // Mostra il messaggio di errore specifico
        setShowConfirmation(true);
      } else {
        setConfirmationMessage(`Errore di connessione: ${error.message}`);
        setShowConfirmation(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invia Richiesta di Amicizia</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username dell'Amico" 
        value={friendUsername} 
        onChangeText={setFriendUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Messaggio di accompagnamento" 
        value={message} 
        onChangeText={text => setMessage(text.slice(0, 100))}  // Limita i caratteri a 100
      />
      <Button title="Invia Richiesta" onPress={handleSendRequest} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => {
          setShowConfirmation(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{confirmationMessage}</Text>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
