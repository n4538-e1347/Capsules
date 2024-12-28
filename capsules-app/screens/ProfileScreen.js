import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, StyleSheet, Animated } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa l'icona

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];

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
                navigation.navigate('Landing'); // Torna alla schermata di benvenuto
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

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profilo</Text>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); navigation.navigate('SendFriendRequest'); }}
          >
            <Text style={styles.buttonText}>Richiedi Amicizia</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); navigation.navigate('PendingFriendRequests'); }}
          >
            <Text style={styles.buttonText}>Richieste in sospeso</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); navigation.navigate('FriendsList'); }}
          >
            <Text style={styles.buttonText}>Elenco degli Amici</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => { animateButton(); handleDeleteAccount(); }}
          >
            <Text style={styles.buttonText}>Elimina Account</Text>
          </TouchableOpacity>
        </Animated.View>
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
    width: 200, // Larghezza fissa per i pulsanti
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center', // Aggiunge centratura orizzontale
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
