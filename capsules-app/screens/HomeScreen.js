import React, { useContext, useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image, ImageBackground } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Audio } from 'expo-av';

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
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const clickSound = useRef(null);  
  const messageOpeningSound = useRef(null);  
useEffect(() => {
  // Preload the sound
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/click.mp3')
    );
    clickSound.current = sound;
  };

  loadSound();

  return () => {
    if (clickSound.current) {
      clickSound.current.unloadAsync(); // Unload sound on unmount
    }
  };
}, []); // Fixed empty dependency array

useEffect(() => {
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/messageopening.mp3')
    );
    messageOpeningSound.current = sound;
  };

  loadSound();
  return () => {
    if (messageOpeningSound.current) {
      messageOpeningSound.current.unloadAsync(); // Unload when component unmounts
    }
  };
}, []);

useEffect(() => {
  // Fetch messages when the component mounts
  if (user && user.username) {
    fetchMessages();
  }
}, []); // Empty dependency array to run only once

  // Function to play the preloaded sound
  const playSound = async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the preloaded sound
    }
  };
  
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

const showRandomMessage = async () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const selectedMessage = messages[randomIndex];
  setRandomMessage(selectedMessage.message);
  archiveMessage(selectedMessage._id);
  animation.current.play();

  // Add a delay before playing the sound
  setTimeout(() => {
    if (messageOpeningSound.current) {
      messageOpeningSound.current.replayAsync();
    }
  }, 2500); 

  setTimeout(() => {
    setModalVisible(true);
    Animated.timing(scaleModalValue, { 
      toValue: 1, 
      duration: 2500, 
      useNativeDriver: true 
    }).start();
  }, 3000);
};

  const handleOpenCapsule = () => {
    setIsAnimationPlaying(true); // Bring animation to the front
    animation.current.play(); // Start the animation
    setTimeout(() => {
      setIsAnimationPlaying(false); // Send animation to the back after completion
    }, 3000); // Match the animation duration
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
			playSound(); // Play sound when button is clicked  
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
			playSound();  
            animateButton();
            navigation.navigate('SettingsScreen');
          }}
        >
          <View style={styles.iconWrapper}>
            <Icon name="cog" size={24} color="#FFF" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.title, { marginTop: 60 }]}>{t('welcome')}</Text>

        {/* Main Button */}
<TouchableOpacity 
  style={styles.centeredButton} 
  onPress={async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the sound
    }
    confirmOpenCapsule(); // Execute the original function
  }}
>
  <Image 
    source={require('../assets/images/button_image.jpg')} 
    style={styles.largeButton} 
    resizeMode="contain"
  />
</TouchableOpacity>


		<LottieView
		  ref={animation}
		  source={require('../assets/animations/confetti.json')}
		  autoPlay={false}
		  loop={false}
		  style={[
			styles.lottie,
			{ zIndex: isAnimationPlaying ? 15 : 1 }, // Higher zIndex when playing
		  ]}
		  pointerEvents={isAnimationPlaying ? 'auto' : 'none'} // Prevent blocking button
		/>


        {/* Modals */}
		{isModalVisible && (
		  <View style={styles.overlay} pointerEvents="auto">
			<Animated.View
			  style={[
				styles.modalContent,
				{ transform: [{ scale: scaleModalValue }] },
			  ]}
			>
			  {/* Decorations */}
			  <Image
				source={require('../assets/images/deco.png')}
				style={[styles.decoration, styles.upperRightDecoration]}
			  />
			  <Image
				source={require('../assets/images/deco.png')}
				style={[
				  styles.decoration,
				  styles.lowerLeftDecoration,
				  { transform: [{ rotate: '180deg' }] }, // Rotated for the lower left
				]}
			  />

			  {/* Message Content */}
			  <Text style={styles.messageText}>{randomMessage}</Text>
<TouchableOpacity 
  onPress={async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the sound
    }
    handleModalClose(); // Execute the original function
  }}
>
  <Text style={styles.closeButton}>{t('close')}</Text>
</TouchableOpacity>

			</Animated.View>
		  </View>
		)}

        {noMessagesModalVisible && (
          <View style={styles.overlay} pointerEvents="auto">
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleNoMessagesModalValue }] }]}>
              <Text style={styles.modalText}>{t('NoMoreCapsules')}</Text>
<TouchableOpacity 
  onPress={async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the sound
    }
    handleNoMessagesClose(); // Execute the original function
  }}
>
  <Text style={styles.closeButton}>{t('close')}</Text>
</TouchableOpacity>

            </Animated.View>
          </View>
        )}
		{confirmModalVisible && (
		  <View style={styles.overlay} pointerEvents="auto">
			<Animated.View
			  style={[
				styles.modalContent,
				{ transform: [{ scale: scaleConfirmModalValue }] },
			  ]}
			>
			  {/* Message Text */}
			  <Text style={styles.modalText}>{t('openCapsulePrompt')}</Text>

			  {/* Buttons */}
			  <View style={styles.modalButtonContainer}>
<TouchableOpacity 
  onPress={async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the sound
    }
    handleConfirmClose(); // Execute the original function
  }} 
  style={styles.modalButtonLeft}
>
  <Text style={styles.closeButton}>{t('cancel')}</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the sound
    }
    handleConfirmClose(); // Close the modal
    handleOpenCapsule(); // Play animation
    showRandomMessage(); // Display the message
  }}
  style={styles.modalButtonRight}
>
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
<TouchableOpacity
  onPress={async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the sound
    }
    handleLogoutConfirmClose(); // Close the modal
  }}
  style={styles.modalButtonLeft}
>
  <Text style={styles.closeButton}>{t('cancel')}</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={async () => {
    if (clickSound.current) {
      await clickSound.current.replayAsync(); // Play the sound
    }
    handleLogoutConfirm(); // Confirm logout
  }}
  style={styles.modalButtonRight}
>
  <Text style={styles.closeButton}>{t('confirm')}</Text>
</TouchableOpacity>

              </View>
            </Animated.View>
          </View>
        )}

        {/* Bottom Buttons */}
        {isAuthenticated ? (
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={[styles.roundButtonInvite, styles.bottomButton]}
                onPress={() => {
				  playSound();	
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
				  playSound();	
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
				  playSound();	
                  animateButton();
                  setLogoutConfirmModalVisible(true);
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
				  playSound();	
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
				  playSound();	
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
  centeredButton: {
    width: 300, // Adjust width as needed for the button's size
    height: 400, // Adjust height as needed for the button's size
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5, // Ensures the button is above other elements
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
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  messageText: {
    fontFamily: 'DancingScript',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
decoration: {
  position: 'absolute',
  width: 100, // Fixed size for the decoration
  height: 100, // Fixed size for the decoration
  zIndex: 15, // Ensures decorations are above modal content
  resizeMode: 'contain', // Maintain aspect ratio
},
upperRightDecoration: {
  top: 10, // Fixed distance from the top
  right: 10, // Fixed distance from the right edge
},
lowerLeftDecoration: {
  bottom: 10, // Fixed distance from the bottom
  left: 10, // Fixed distance from the left edge
},
modalContent: {
  backgroundColor: 'white',
  padding: 20,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  zIndex: 10,
  width: '90%',
  maxWidth: 400, // Optional: to cap modal width
  overflow: 'visible', // Prevent clipping of decorations
},

  
});
