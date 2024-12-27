import React, { useContext } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Conferma Eliminazione Account",
      "Sei sicuro di voler eliminare il tuo account? Tutti i tuoi dati verranno cancellati, inclusi i messaggi scambiati, e non potranno essere recuperati.",
      [
        {
          text: "Annulla",
          style: "cancel"
        },
        {
          text: "Elimina",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await axios.post('http://192.168.1.14:3000/deleteAccount', { username: user.username });
              if (response.status === 200) {
                alert('Account eliminato con successo');
                logout(); // Esegui il logout dell'utente dopo l'eliminazione dell'account
              } else {
                alert('Errore nell\'eliminazione dell\'account');
              }
            } catch (error) {
              alert(`Errore di connessione: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilo</Text>
      <Button title="Invia Richiesta di Amicizia" onPress={() => navigation.navigate('SendFriendRequest')} />
      <Button title="Richieste di Amicizia Pendenti" onPress={() => navigation.navigate('PendingFriendRequests')} />
      <Button title="Elenco degli Amici" onPress={() => navigation.navigate('FriendsList')} />
      <Button 
        title="Elimina Account" 
        color="red" 
        onPress={handleDeleteAccount} 
      />
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
});
