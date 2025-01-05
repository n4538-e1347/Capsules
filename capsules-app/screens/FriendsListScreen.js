import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

export default function FriendsListScreen({ navigation }) {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmText, setConfirmText] = useState('');
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
        navigation.navigate('Profile');
      }, 2500);
      return () => clearTimeout(timer);
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

  const confirmActionPopup = (friendUsername, action, message) => {
    setSelectedFriend(friendUsername);
    setConfirmAction(() => action);
    setConfirmText(message);
    setConfirmModalVisible(true);
  };

  const executeAction = () => {
    if (confirmAction) {
      confirmAction(selectedFriend);
    }
    setConfirmModalVisible(false);
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
              <Text style={styles.friendName}>{item.username}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => confirmActionPopup(item.username, () => handleRemoveFriend(item.username), t('removeFriendMessage'))}
                  style={styles.iconButton}
                >
                  <Icon name="user-times" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmActionPopup(item.username, () => handleRemoveFriend(item.username, true), t('blockFriendMessage'))}
                  style={styles.iconButton}
                >
                  <Icon name="ban" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <Text style={styles.title}>{t('blockedUsersTitle')}</Text>
        <FlatList
          data={blockedUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.friendItem}>
              <Text style={styles.friendName}>{item.username}</Text>
              <TouchableOpacity
                onPress={() => { animateButton(); handleUnblockUser(item.username); }}
                style={styles.iconButton}
              >
                <Icon name="unlock" size={20} color="green" />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text>
              <Icon name="arrow-left" size={24} color="#FFF" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={confirmModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{confirmText}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={() => setConfirmModalVisible(false)} style={styles.modalButtonLeft}>
              <Text style={styles.closeButton}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={executeAction} style={styles.modalButtonRight}>
              <Text style={styles.closeButton}>{t('confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFACD',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#32CD32',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButtonLeft: {
    marginRight: 20,
  },
  modalButtonRight: {
    marginLeft: 20,
  },
});
