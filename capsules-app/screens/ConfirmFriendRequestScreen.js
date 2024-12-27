import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ConfirmFriendRequestScreen({ route, navigation }) {
  const { username, friendUsername } = route.params;

  const handleConfirmRequest = async () => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/confirmFriendRequest', { username, friendUsername });
      if (response.status === 200) {
        alert('Richiesta di amicizia confermata');
        navigation.goBack();
      } else {
        alert('Errore nella conferma della richiesta di amicizia');
      }
    } catch (error) {
      alert(`Errore di connessione: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confermare Amicizia con {friendUsername}</Text>
      <Button title="Conferma" onPress={handleConfirmRequest} />
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
