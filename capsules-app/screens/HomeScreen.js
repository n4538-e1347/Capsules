import React, { useContext, useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image, ImageBackground } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window'); 

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];
  const scaleModalValue = useState(new Animated.Value(0))[0];
  const scaleConfirmModalValue = useState(new Animated.Value(0))[0];
  const scaleNoMessagesModalValue = useState(new Animated.Value(0))[0];
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');
  const [noMessagesModalVisible, setNoMessagesModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [logoutConfirmModalVisible, setLogoutConfirmModalVisible] = useState(false); // Aggiungi lo stato per il messaggio di conferma logout
  const animation = useRef(null);

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
    archiveMessage(selectedMessage._id);
    animation.current.play();
    setTimeout(() => {
      setModalVisible(true);
      Animated.timing(scaleModalValue, { toValue: 1, duration: 2500, useNativeDriver: true }).start();
    }, 3000); 
  };

  const confirmOpenCapsule = () => {
    if (messages.length === 0) {
      setNoMessagesModalVisible(true);
      Animated.timing(scaleNoMessagesModalValue, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    } else {
      setConfirmModalVisible(true);
      Animated.timing(scaleConfirmModalValue, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }
  };

  const handleConfirmClose = () => {
    setConfirmModalVisible(false);
    scaleConfirmModalValue.setValue(0); // Reset della scala per l'animazione del messaggio di conferma
  };

  const handleModalClose = () => {
    setModalVisible(false);
    scaleModalValue.setValue(0); // Reset della scala per l'animazione del messaggio
  };

  const handleNoMessagesClose = () => {
    setNoMessagesModalVisible(false);
    scaleNoMessagesModalValue.setValue(0); // Reset della scala per l'animazione del messaggio "No More Capsules"
  };

  // Funzioni per gestire il messaggio di conferma logout
  const handleLogoutConfirmClose = () => {
    setLogoutConfirmModalVisible(false);
    scaleConfirmModalValue.setValue(0); // Reset della scala per l'animazione del messaggio di conferma logout
  };

  const handleLogoutConfirm = () => {
    handleLogoutConfirmClose();
    handleLogout();
  };
  
  const [fontsLoaded] = useFonts({
  'DancingScript': require('../assets/fonts/DancingScript-Regular.ttf'), // Adjust the path as needed
});

if (!fontsLoaded) {
  return <AppLoading />;
}


return (
  <SafeAreaView style={styles.safeArea}>
    <ImageBackground 
      source={require('../assets/images/background_image.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.roundButtonArchive, styles.topLeftButton]}
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
          style={[styles.roundButtonSettings, styles.topRightButton]}
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
        <TouchableOpacity style={styles.clickableArea} onPress={confirmOpenCapsule}>
          <Image 
            source={require('../assets/images/button_image.jpg')} 
            style={styles.largeButton} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        <LottieView
          ref={animation}
          source={require('../assets/animations/confetti.json')} // Assicurati che il percorso sia corretto
          autoPlay={false}
          loop={false}
          style={styles.lottie}
        />
        {isModalVisible && (
          <View style={styles.overlay} pointerEvents="auto">
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleModalValue }] }]}>
              <Text style={styles.messageText}>{randomMessage}</Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={styles.closeButton}>{t('close')}</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        {noMessagesModalVisible && (
          <View style={styles.overlay} pointerEvents="auto">
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleNoMessagesModalValue }] }]}>
              <Text style={styles.modalText}>{t('NoMoreCapsules')}</Text>
              <TouchableOpacity onPress={handleNoMessagesClose}>
                <Text style={styles.closeButton}>{t('close')}</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        {confirmModalVisible && (
          <View style={styles.overlay} pointerEvents="auto">
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleConfirmModalValue }] }]}>
              <Text style={styles.modalText}>{t('openCapsulePrompt')}</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={handleConfirmClose} style={styles.modalButtonLeft}>
                  <Text style={styles.closeButton}>{t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleConfirmClose(); showRandomMessage(); }} style={styles.modalButtonRight}>
                  <Text style={styles.closeButton}>{t('confirm')}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}
        {logoutConfirmModalVisible && (
          <View style={styles.overlay} pointerEvents="auto">
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleConfirmModalValue }] }]}>
              <Text style={styles.modalText}>{t('logoutPrompt')}</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={handleLogoutConfirmClose} style={styles.modalButtonLeft}>
                  <Text style={styles.closeButton}>{t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogoutConfirm} style={styles.modalButtonRight}>
                  <Text style={styles.closeButton}>{t('confirm')}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}
        {isAuthenticated ? (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={[styles.roundButtonInvite, styles.bottomButton]}
                onPress={() => {
                  animateButton();
                  navigation.navigate('Profile');
                }}
              >
                <View style={styles.iconWrapper}>
                  <Icon name="user-plus" size={24} color="#FFF" />
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
                style={[styles.roundButtonExit, styles.bottomButton]}
                onPress={() => {
                  animateButton();
                  setLogoutConfirmModalVisible(true); // Mostra il messaggio di conferma logout
                  Animated.timing(scaleConfirmModalValue, { toValue: 1, duration: 500, useNativeDriver: true }).start();
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
    </ImageBackground>
  </SafeAreaView>
);
}			
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    width: '100%', // Ensure the image fills the clickable area
    height: '100%',
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
  roundButtonArchive: {
    backgroundColor: '#9932CC',
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
  roundButtonSettings: {
    backgroundColor: '#FFD700',
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
  roundButtonExit: {
    backgroundColor: '#FF0000',
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
  roundButtonInvite: {
    backgroundColor: '#00FF00',
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
    backgroundColor: '#0000FF',
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
    zIndex: 10, // Aggiungi zIndex per portare la modale in primo piano
    width: width * 0.9, // Imposta la larghezza del messaggio
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalTextItalic: {  //removable
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'IndieFlower-Regular', // Use the font family for the handwriting effect
    fontStyle: 'italic', // Optional: use to make the text italic
  },
  messageText: {
    fontFamily: 'DancingScript', // Use the name you provided in useFonts
    fontSize: 36,
    color: 'black',
	textAlign: 'center', 
	margin: 10, 
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
  lottie: {
    width: 450,
    height: 450,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -225,
    marginLeft: -225,
    zIndex: 1,
  },
  clickableArea: {
    width: 300, // Set the size of the clickable area
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    // Optional: add a border to visualize the area during debugging
    //borderWidth: 1,
    //borderColor: 'red',
	zIndex: 1,
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,  // Add this to ensure full horizontal coverage
    bottom: 0, // Add this to ensure full vertical coverage
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5, // Keep this to ensure the overlay is on top
  },
});