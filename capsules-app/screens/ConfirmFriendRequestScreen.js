import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa l'icona

export default function ConfirmFriendRequestScreen({ route, navigation }) {
  const { username, friendUsername } = route.params;
  const scaleValue = useState(new Animated.Value(1))[0];

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

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Confermare Amicizia con {friendUsername}</Text>
        <Button title="Conferma" onPress={handleConfirmRequest} />
		 <View style={styles.bottomContainer}>
			<TouchableOpacity
			 style={styles.backButton}
			 onPress={() => navigation.goBack()}
			>
				<Text style={styles.iconWrapper}>
					<Text>
					  <Icon name="arrow-left" size={24} color="#FFF" />
					</Text>
				</Text>
			</TouchableOpacity>
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
