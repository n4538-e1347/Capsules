import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');
  const [noMessagesModalVisible, setNoMessagesModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    if (user && user.username) {
      fetchMessages();
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://192.168.1.14:3000/messages/${user.username}`);
      setMessages(response.data.filter(msg => !msg.archived));
    } catch (error) {
      alert(`Errore nel recupero dei messaggi: ${error.message}`);
    }
  };

  const archiveMessage = async (messageId) => {
    try {
      await axios.post('http://192.168.1.14:3000/archiveMessage', { messageId });
      fetchMessages();
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
    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];
    setRandomMessage(selectedMessage.message);
    setModalVisible(true);
    archiveMessage(selectedMessage._id);
  };

  const confirmOpenCapsule = () => {
    if (messages.length === 0) {
      setNoMessagesModalVisible(true);
    } else {
      setConfirmModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.roundButton, styles.topLeftButton]}
          onPress={() => {
            animateButton();
            navigation.navigate('ArchivedMessagesScreen');
          }}
        >
          <View style={styles.iconWrapper}>
            <Icon name="envelope-open" size={24} color="#FFF" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roundButton, styles.topRightButton]}
          onPress={() => {
            animateButton();
            navigation.navigate('SettingsScreen');
          }}
        >
          <View style={styles.iconWrapper}>
            <Icon name="cog" size={24} color="#FFF" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.title, { marginTop: 60 }]}>{t('welcome')}</Text>
        <TouchableOpacity style={styles.largeButton} onPress={confirmOpenCapsule}>
          <Text style={styles.buttonText}>{t('showMessage')}</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{randomMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>{t('close')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={noMessagesModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{t('NoMoreCapsules')}</Text>
            <TouchableOpacity onPress={() => setNoMessagesModalVisible(false)}>
              <Text style={styles.closeButton}>{t('close')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={confirmModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{t('openCapsulePrompt')}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setConfirmModalVisible(false)} style={styles.modalButtonLeft}>
                <Text style={styles.closeButton}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setConfirmModalVisible(false); showRandomMessage(); }} style={styles.modalButtonRight}>
                <Text style={styles.closeButton}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {isAuthenticated ? (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={[styles.roundButton, styles.bottomButton]}
                onPress={() => {
                  animateButton();
                  navigation.navigate('Profile');
                }}
              >
                <View style={styles.iconWrapper}>
                  <Icon name="user" size={24} color="#FFF" />
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => {
                  animateButton();
                  navigation.navigate('Messages');
                }}
              >
                <Text style={styles.buttonText}>{t('sendMessage')}</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={[styles.roundButton, styles.bottomButton]}
                onPress={() => {
                  animateButton();
                  handleLogout();
                }}
              >
                <View style={styles.iconWrapper}>
                  <Icon name="sign-out" size={24} color="#FFF" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => {
                  animateButton();
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.buttonText}>{t('login')}</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.rectangleButton}
                onPress={() => {
                  animateButton();
                  navigation.navigate('Register');
                }}
              >
                <Text style={styles.buttonText}>{t('register')}</Text>
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
    backgroundColor: '#FFFACD',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  topRightButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  largeButton: {
    width: 280,
    height: 450,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
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
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  bottomButton: {
    alignItems: 'center',
  },
  rectangleButton: {
    backgroundColor: '#32CD32',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
