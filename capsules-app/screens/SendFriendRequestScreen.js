import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa l'icona
import { useTranslation } from 'react-i18next'; // Importa il hook useTranslation

export default function SendFriendRequestScreen({ navigation }) {
  const { t } = useTranslation(); // Utilizza il hook useTranslation correttamente
  const [friendUsername, setFriendUsername] = useState('');
  const [message, setMessage] = useState('');
//  const { user } = useContext(AuthContext);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const scaleValue = useState(new Animated.Value(1))[0];

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
      setConfirmationMessage(t('authenticationError'));
      setShowConfirmation(true);
      return;
    }

    const trimmedFriendUsername = friendUsername.trim(); // Trimma gli spazi dall'username dell'amico

    if (message.length > 100) {
      setConfirmationMessage(t('messageTooLong'));
      setShowConfirmation(true);
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.14:3000/sendFriendRequest', { username: user.username, friendUsername: trimmedFriendUsername, message });
      if (response.status === 200) {
        setConfirmationMessage(t('friendRequestSentSuccess'));
        setShowConfirmation(true);
      } else {
        setConfirmationMessage(t('friendRequestSendError'));
        setShowConfirmation(true);
      }
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 404)) {
        setConfirmationMessage(error.response.data);  // Mostra il messaggio di errore specifico
        setShowConfirmation(true);
      } else {
        setConfirmationMessage(`${t('connectionError')}: ${error.message}`);
        setShowConfirmation(true);
      }
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
        <Text style={styles.title}>{t('sendFriendRequestTitle')}</Text>
        <TextInput 
          style={styles.input} 
          placeholder={t('friendUsernamePlaceholder')} 
          value={friendUsername} 
          onChangeText={setFriendUsername} 
        />
        <TextInput 
          style={styles.input} 
          placeholder={t('messagePlaceholder')} 
          value={message} 
          onChangeText={text => setMessage(text.slice(0, 100))}  // Limita i caratteri a 100
        />
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); handleSendRequest(); }}
          >
            <Text style={styles.buttonText}>{t('sendRequest')}</Text>
          </TouchableOpacity>
        </Animated.View>
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
  button: {
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
    width: 150, // Larghezza fissa per i pulsanti
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
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
