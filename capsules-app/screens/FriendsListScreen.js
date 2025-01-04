import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next'; // Importa il hook useTranslation

export default function FriendsListScreen({ navigation }) {
  const { t } = useTranslation(); // Utilizza il hook useTranslation correttamente
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const scaleValue = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const fetchFriendsAndBlockedUsers = async () => {
      try {
        const friendsResponse = await axios.get(`http://192.168.1.14:3000/contacts/${user.username}`);
        setFriends(friendsResponse.data);
        const blockedUsersResponse = await axios.get(`http://192.168.1.14:3000/blockedUsers/${user.username}`);
        setBlockedUsers(blockedUsersResponse.data);
      } catch (error) {
        alert(`${t('connectionError')}: ${error.message}`);
      }
    };
    fetchFriendsAndBlockedUsers();
  }, [user.username]);

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        navigation.navigate('Profile'); // Naviga alla pagina del profilo dopo 2,5 secondi
      }, 2500);
      return () => clearTimeout(timer); // Cleanup il timer
    }
  }, [showConfirmation, navigation]);

  const handleRemoveFriend = async (friendUsername, block = false) => {
    try {
      if (block) {
        await axios.post('http://192.168.1.14:3000/blockUser', { username: user.username, blockUsername: friendUsername });
      }
      const response = await axios.post('http://192.168.1.14:3000/removeFriend', { username: user.username, friendUsername });
      if (response.status === 200) {
        setConfirmationMessage(block ? t('friendRemovedBlockedSuccess') : t('friendRemovedSuccess'));
        setShowConfirmation(true);
        setFriends(friends.filter(friend => friend.username !== friendUsername));
        if (block) {
          // Aggiungi una chiave unica per ogni utente bloccato
          setBlockedUsers([...blockedUsers, { username: friendUsername, _id: new Date().getTime().toString() }]);
        }
      } else {
        setConfirmationMessage(t('friendRemoveError'));
        setShowConfirmation(true);
      }
    } catch (error) {
      setConfirmationMessage(`${t('connectionError')}: ${error.message}`);
      setShowConfirmation(true);
    }
  };

  const handleUnblockUser = async (blockUsername) => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/unblockUser', { username: user.username, unblockUsername: blockUsername });
      if (response.status === 200) {
        setConfirmationMessage(t('userUnblockedSuccess'));
        setShowConfirmation(true);
        setBlockedUsers(blockedUsers.filter(user => user.username !== blockUsername));
      } else {
        setConfirmationMessage(t('userUnblockError'));
        setShowConfirmation(true);
      }
    } catch (error) {
      setConfirmationMessage(`${t('connectionError')}: ${error.message}`);
      setShowConfirmation(true);
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('friendsListTitle')}</Text>
        <FlatList
          data={friends}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.friendItem}>
              <Text>{item.username}</Text>
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <TouchableOpacity
                  onPress={() => { animateButton(); handleRemoveFriend(item.username); }}
                  style={styles.iconButton}
                >
                  <Icon name="user-times" size={20} color="red" />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <TouchableOpacity
                  onPress={() => { animateButton(); handleRemoveFriend(item.username, true); }}
                  style={styles.iconButton}
                >
                  <Icon name="ban" size={20} color="black" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        />
        <Text style={styles.title}>{t('blockedUsersTitle')}</Text>
        <FlatList
          data={blockedUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.friendItem}>
              <Text>{item.username}</Text>
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <TouchableOpacity
                  onPress={() => { animateButton(); handleUnblockUser(item.username); }}
                  style={styles.iconButton}
                >
                  <Icon name="unlock" size={20} color="green" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showConfirmation}
          onRequestClose={() => { setShowConfirmation(false); }}
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
    paddingTop: 40, // Aumenta il padding per spostare il testo "Elenco degli Amici" più in basso
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
    backgroundColor: '#FFF', // Colore di sfondo per gli elementi della lista
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    shadowOffset: { width: 0, height: 2 },
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
