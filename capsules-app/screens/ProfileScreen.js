import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, StyleSheet, Animated } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];
  const [emailVisible, setEmailVisible] = useState(false); // Stato per la visibilità dell'email

  const handleDeleteAccount = async () => {
    Alert.alert(
      t('deleteAccountConfirmation'),
      t('deleteAccountPrompt'),
      [
        {
          text: t('cancel'),
          style: 'cancel'
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await axios.post('http://192.168.1.14:3000/deleteAccount', { username: user.username });
              if (response.status === 200) {
                alert(t('accountDeleted'));
                logout(); // Esegui il logout dell'utente dopo l'eliminazione dell'account
                navigation.navigate('Landing'); // Torna alla schermata di benvenuto
              } else {
                alert(t('deleteAccountError'));
              }
            } catch (error) {
              alert(`${t('connectionError')}: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const toggleEmailVisibility = () => {
    setEmailVisible(!emailVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('profile')}</Text>
        <View style={styles.userInfoBox}>
          <Text style={styles.userInfoText}>{t('username')}: {user.username}</Text>
          <Text style={styles.userInfoText}>{t('email')}:</Text>
          {emailVisible ? (
            <Text style={styles.userInfoText}>{user.email}</Text>
          ) : (
            <Text style={styles.userInfoText}>*******</Text>
          )}
          <TouchableOpacity onPress={toggleEmailVisibility} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {emailVisible ? t('hideEmail') : t('showEmail')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.userInfoText}>{t('premiumStatus')}: {user.isPremium ? t('yes') : t('no')}</Text>
        </View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); navigation.navigate('SendFriendRequest'); }}
          >
            <Text style={styles.buttonText}>{t('sendFriendRequest')}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); navigation.navigate('PendingFriendRequests'); }}
          >
            <Text style={styles.buttonText}>{t('pendingFriendRequests')}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { animateButton(); navigation.navigate('FriendsList'); }}
          >
            <Text style={styles.buttonText}>{t('friendsList')}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => { animateButton(); handleDeleteAccount(); }}
          >
            <Text style={styles.buttonText}>{t('deleteAccount')}</Text>
          </TouchableOpacity>
        </Animated.View>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfoBox: {
    backgroundColor: '#32CD32',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  userInfoText: {
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 5,
  },
  toggleButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#228B22',
    borderRadius: 10,
  },
  toggleButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#32CD32',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: 200,
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
});
