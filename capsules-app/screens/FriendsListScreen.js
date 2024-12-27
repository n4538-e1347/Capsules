import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function FriendsListScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchFriendsAndBlockedUsers = async () => {
      try {
        const friendsResponse = await axios.get(`http://192.168.1.14:3000/contacts/${user.username}`);
        setFriends(friendsResponse.data);

        const blockedUsersResponse = await axios.get(`http://192.168.1.14:3000/blockedUsers/${user.username}`);
        setBlockedUsers(blockedUsersResponse.data);
      } catch (error) {
        alert(`Errore di connessione: ${error.message}`);
      }
    };

    fetchFriendsAndBlockedUsers();
  }, [user.username]);

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        navigation.navigate('Profile');  // Naviga alla pagina del profilo dopo 2,5 secondi
      }, 2500);

      return () => clearTimeout(timer);  // Cleanup il timer
    }
  }, [showConfirmation, navigation]);

  const handleRemoveFriend = async (friendUsername, block = false) => {
    try {
      if (block) {
        await axios.post('http://192.168.1.14:3000/blockUser', { username: user.username, blockUsername: friendUsername });
      }
      const response = await axios.post('http://192.168.1.14:3000/removeFriend', { username: user.username, friendUsername });
      if (response.status === 200) {
        setConfirmationMessage(block ? 'Amico rimosso e bloccato con successo' : 'Amico rimosso con successo');
        setShowConfirmation(true);
        setFriends(friends.filter(friend => friend.username !== friendUsername));
        if (block) {
          // Aggiungi una chiave unica per ogni utente bloccato
          setBlockedUsers([...blockedUsers, { username: friendUsername, _id: new Date().getTime().toString() }]);
        }
      } else {
        setConfirmationMessage('Errore nella rimozione dell\'amico');
        setShowConfirmation(true);
      }
    } catch (error) {
      setConfirmationMessage(`Errore di connessione: ${error.message}`);
      setShowConfirmation(true);
    }
  };

  const handleUnblockUser = async (blockUsername) => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/unblockUser', { username: user.username, unblockUsername: blockUsername });
      if (response.status === 200) {
        setConfirmationMessage('Utente sbloccato con successo');
        setShowConfirmation(true);
        setBlockedUsers(blockedUsers.filter(user => user.username !== blockUsername));
      } else {
        setConfirmationMessage('Errore nello sblocco dell\'utente');
        setShowConfirmation(true);
      }
    } catch (error) {
      setConfirmationMessage(`Errore di connessione: ${error.message}`);
      setShowConfirmation(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elenco degli Amici</Text>
      <FlatList 
        data={friends}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text>{item.username}</Text>
            <TouchableOpacity onPress={() => handleRemoveFriend(item.username)} style={styles.iconButton}>
              <Icon name="user-times" size={20} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveFriend(item.username, true)} style={styles.iconButton}>
              <Icon name="ban" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.title}>Utenti Bloccati</Text>
      <FlatList 
        data={blockedUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text>{item.username}</Text>
            <TouchableOpacity onPress={() => handleUnblockUser(item.username)} style={styles.iconButton}>
              <Icon name="unlock" size={20} color="green" />
            </TouchableOpacity>
          </View>
        )}
      />
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
  friendItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
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
