import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker'; // Importa DropDownPicker
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next'; // Importa il hook useTranslation

export default function MessageScreen({ navigation }) {
  const { t } = useTranslation(); // Utilizza il hook useTranslation correttamente
  const [newMessage, setNewMessage] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { user } = useContext(AuthContext); // Assicuriamoci di ottenere l'username corretto
  const scaleValue = useState(new Animated.Value(1))[0];
  const [open, setOpen] = useState(false); // Stato per controllare l'apertura del menu a tendina

  useEffect(() => {
    if (user && user.username) {
      fetchFriends();
    }
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://192.168.1.14:3000/contacts/${user.username}`);
      setFriends(response.data.map(friend => ({ label: friend.username, value: friend.username }))); // Formatta i dati per DropDownPicker
    } catch (error) {
      alert(`${t('fetchFriendsError')}: ${error.message}`);
    }
  };

  const sendMessage = async () => {
    if (!selectedFriend || !newMessage.trim()) {
      return; // Se non è selezionato un destinatario o non c'è un messaggio, non fare nulla
    }
    try {
      const response = await axios.post('http://192.168.1.14:3000/sendMessage', {
        sender: user.username,
        receiver: selectedFriend, // Usa il destinatario selezionato
        message: newMessage
      });
      if (response.status === 201) {
        setNewMessage(''); // Pulisci il campo del messaggio dopo l'invio
      } else {
        alert(t('sendMessageError'));
      }
    } catch (error) {
      alert(`${t('sendMessageError')}: ${error.message}`);
    }
  };

const confirmSendMessage = () => {
  // Verifica che ci sia un destinatario selezionato e un messaggio non vuoto
  if (selectedFriend && newMessage) {
    const buttons = [
      { text: t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: t('send'), onPress: sendMessage }
    ];

    Alert.alert(
      t('confirmSend'),
      '',  // Messaggio di conferma vuoto
      buttons,
      { cancelable: false }
    );
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
        <Text style={styles.title}>{t('messages')}</Text>
        <DropDownPicker
          open={open}
          value={selectedFriend}
          items={friends}
          setOpen={setOpen}
          setValue={setSelectedFriend}
          setItems={setFriends}
          placeholder={t('selectFriend')}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          labelStyle={styles.dropdownLabel}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { marginTop: 20 }]} // Sposta l'input messaggio più in basso
            placeholder={t('writeMessage')}
            value={newMessage}
            onChangeText={setNewMessage}
            maxLength={150} // Imposta il limite di caratteri a 150
            multiline={true} // Permette il testo su più righe
          />
        </View>
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
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => { animateButton(); confirmSendMessage(); }}
            >
              <Text style={styles.buttonText}>{t('send')}</Text>
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
  dropdown: {
    height: 60,
    width: '80%',
    backgroundColor: '#32CD32', // Verde per il dropdown
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, // Arrotonda gli angoli del dropdown
    alignSelf: 'center', // Centra orizzontalmente
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#32CD32', // Verde per il contenitore dropdown
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, // Arrotonda gli angoli del contenitore dropdown
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: 'center', // Centra orizzontalmente
  },
  dropdownLabel: {
    color: '#fff', // Colore del testo bianco
    fontWeight: 'bold', // Testo in grassetto
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center', // Centra verticalmente
    marginBottom: 20, // Spazio dal dropdown
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top', // Allinea il testo in alto
    height: 200, // Aumenta l'altezza dell'input per contenere visivamente i 150 caratteri
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
