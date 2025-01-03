import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa le icone
import axios from 'axios';
import Modal from 'react-native-modal';

export default function HomeScreen({ navigation }) {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');

  useEffect(() => {
    if (user && user.username) {
      fetchMessages();
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://192.168.1.14:3000/messages/${user.username}`);
      setMessages(response.data.filter(msg => !msg.archived)); // Filtra solo i messaggi non archiviati
    } catch (error) {
      alert(`Errore nel recupero dei messaggi: ${error.message}`);
    }
  };

  const archiveMessage = async (messageId) => {
    try {
      await axios.post('http://192.168.1.14:3000/archiveMessage', { messageId });
      fetchMessages(); // Aggiorna i messaggi dopo l'archiviazione
    } catch (error) {
      alert(`Errore nell'archiviazione del messaggio: ${error.message}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Landing');
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const showRandomMessage = () => {
    if (messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      const selectedMessage = messages[randomIndex];
      setRandomMessage(selectedMessage.message);
      setModalVisible(true);
      archiveMessage(selectedMessage._id); // Archivia il messaggio visualizzato
    } else {
      alert("Nessun messaggio disponibile");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.roundButton, styles.topLeftButton]}
          onPress={() => { animateButton(); navigation.navigate('ArchivedMessagesScreen'); }} // Naviga a ArchivedMessagesScreen
        >
          <Text style={styles.iconWrapper}>
            <Icon name="envelope-open" size={24} color="#FFF" style={styles.icon} /> {/* Icona busta bianca aperta */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roundButton, styles.topRightButton]}
          onPress={() => { animateButton(); navigation.navigate('SettingsScreen'); }} // Naviga a SettingsScreen
        >
          <Text style={styles.iconWrapper}>
            <Icon name="cog" size={24} color="#FFF" style={styles.icon} /> {/* Icona Settings */}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title, { marginTop: 60 }]}>Welcome to Capsules!</Text>
        <TouchableOpacity style={styles.largeButton} onPress={showRandomMessage}>
          <Text style={styles.buttonText}>Mostra Messaggio</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{randomMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {isAuthenticated ? (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={[styles.roundButton, styles.bottomButton]}
                onPress={() => { animateButton(); navigation.navigate('Profile'); }}
              >
                <Text style={styles.iconWrapper}>
                  <Icon name="user" size={24} color="#FFF" style={styles.icon} />
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => { animateButton(); navigation.navigate('Messages'); }}
              >
                <Text style={styles.buttonText}>Invia Messaggio</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={[styles.roundButton, styles.bottomButton]}
                onPress={() => { animateButton(); handleLogout(); }}
              >
                <Text style={styles.iconWrapper}>
                  <Icon name="sign-out" size={24} color="#FFF" style={styles.icon} />
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => { animateButton(); navigation.navigate('Login'); }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => { animateButton(); navigation.navigate('Register'); }}
              >
                <Text style={styles.buttonText}>Registrati</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
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
  topLeftButton: {
    position: 'absolute',
    top: 50, // Sposta il pulsante più in basso
    left: 20,
  },
  topRightButton: {
    position: 'absolute',
    top: 50, // Sposta il pulsante più in basso
    right: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  largeButton: {
    width: 280, // Dimensioni del pulsante quadrato grande
    height: 450,
    backgroundColor: '#32CD32', // Colore verde
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Spazio tra il pulsante grande e i pulsanti in basso
    borderRadius: 10, // Arrotonda gli angoli del pulsante
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  roundButton: {
    backgroundColor: '#32CD32', // Verde
    borderRadius: 50,
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
  iconWrapper: {
    textAlign: 'center', // Centra l'icona orizzontalmente
    textAlignVertical: 'center', // Centra l'icona verticalmente
    width: '100%', // Assicura che l'icona occupi l'intera area del pulsante
    height: '100%',
  },
  icon: {
    alignSelf: 'center', // Allinea l'icona al centro orizzontalmente
  },
  bottomButton: {
    alignItems: 'center', // Allineamento centrale
  },
  rectangleButton: {
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
  },
  buttonText: {
    color: '#FFF',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 18,
    color: '#32CD32',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
