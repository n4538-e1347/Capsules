import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function PendingFriendRequestsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const scaleValue = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const receivedResponse = await axios.get(`http://192.168.1.14:3000/friendRequests/${user.username}`);
        setFriendRequests(receivedResponse.data);

        const sentResponse = await axios.get(`http://192.168.1.14:3000/sentFriendRequests/${user.username}`);
        setSentRequests(sentResponse.data);

        // Debug logging
        console.log("Received Friend Requests:", receivedResponse.data);
        console.log("Sent Friend Requests:", sentResponse.data);
      } catch (error) {
        alert(`Errore di connessione: ${error.message}`);
      }
    };

    fetchRequests();
  }, [user.username]);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Profile');  // Naviga alla pagina del profilo dopo 3 secondi
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [modalVisible, navigation]);

  const handleAcceptRequest = async (friendUsername) => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/confirmFriendRequest', { username: user.username, friendUsername });
      if (response.status === 200) {
        setSelectedMessage('Richiesta di amicizia confermata');
        setModalVisible(true);
        setFriendRequests(friendRequests.filter(request => request.userId.username !== friendUsername));
        setSentRequests(sentRequests.filter(request => request.username !== friendUsername));
      } else {
        alert('Errore nella conferma della richiesta di amicizia');
      }
    } catch (error) {
      alert(`Errore di connessione: ${error.message}`);
    }
  };

  const handleRejectRequest = async (friendUsername, block = false) => {
    try {
      const url = block ? 'http://192.168.1.14:3000/rejectAndBlockFriendRequest' : 'http://192.168.1.14:3000/rejectFriendRequest';
      const response = await axios.post(url, { username: user.username, friendUsername });
      if (response.status === 200) {
        setSelectedMessage(block ? 'Richiesta di amicizia rifiutata e utente bloccato' : 'Richiesta di amicizia rifiutata');
        setModalVisible(true);
        setFriendRequests(friendRequests.filter(request => request.userId.username !== friendUsername));
        setSentRequests(sentRequests.filter(request => request.username !== friendUsername));
      } else {
        alert(block ? 'Errore nel rifiuto e blocco della richiesta di amicizia' : 'Errore nel rifiuto della richiesta di amicizia');
      }
    } catch (error) {
      alert(`Errore di connessione: ${error.message}`);
    }
  };

  const handleWithdrawRequest = async (friendUsername) => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/withdrawFriendRequest', { username: user.username, friendUsername });
      if (response.status === 200) {
        setSelectedMessage('Richiesta di amicizia ritirata');
        setModalVisible(true);
        setSentRequests(sentRequests.filter(request => request.username !== friendUsername));
      } else {
        alert('Errore nel ritiro della richiesta di amicizia');
      }
    } catch (error) {
      alert(`Errore di connessione: ${error.message}`);
    }
  };

  const showMessage = (message) => {
    if (message) {
      setSelectedMessage(message);
      setMessageModalVisible(true);
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const renderRequestItem = (item, type) => (
    <TouchableOpacity onPress={() => showMessage(item.message)}>
      <View style={styles.requestItem}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{item.username}</Text>
          {item.message && <Icon name="envelope" size={20} color="blue" style={styles.messageIcon} />}
        </View>
        {type === 'sent' && (
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity onPress={() => { animateButton(); handleWithdrawRequest(item.username); }}>
              <Icon name="undo" size={20} color="gray" />
            </TouchableOpacity>
          </Animated.View>
        )}
        {type === 'received' && (
          <>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity onPress={() => { animateButton(); handleAcceptRequest(item.userId.username); }}>
                <Icon name="check-circle" size={20} color="green" style={styles.actionIcon} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity onPress={() => { animateButton(); handleRejectRequest(item.userId.username); }}>
                <Icon name="times-circle" size={20} color="red" style={styles.actionIcon} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity onPress={() => { animateButton(); handleRejectRequest(item.userId.username, true); }}>
                <Icon name="ban" size={20} color="black" style={styles.actionIcon} />
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Richieste di Amicizia Inviate</Text>
        <FlatList 
          data={sentRequests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderRequestItem(item, 'sent')}
        />
        <Text style={styles.title}>Richieste di Amicizia Ricevute</Text>
        <FlatList 
          data={friendRequests}
          keyExtractor={(item) => item.userId._id}
          renderItem={({ item }) => renderRequestItem(item, 'received')}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{selectedMessage}</Text>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={messageModalVisible}
          onRequestClose={() => {
            setMessageModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{selectedMessage}</Text>
              <TouchableOpacity onPress={() => setMessageModalVisible(false)} style={styles.button}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    paddingTop: 40, // Aggiungi padding per evitare sovrapposizioni con la status bar
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  requestItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF', // Colore di sfondo per gli elementi della lista
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    marginRight: 20, // Aggiungi spazio tra il nome e l'icona
  },
  messageIcon: {
    marginRight: 20, // Aggiungi spazio tra l'icona e i pulsanti
  },
  actionIcon: {
    marginLeft: 20, // Aggiungi spazio tra le icone delle azioni
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
    color: 'white',
    fontWeight: 'bold',
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
