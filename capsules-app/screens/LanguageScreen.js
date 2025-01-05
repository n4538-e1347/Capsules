import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext'; // Importa il contesto AuthContext

export default function SettingsScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext); // Ottieni user dal contesto Auth
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    // Controllo utente al montaggio del componente
    if (!user || !user.username) {
      Alert.alert(
        t('error'),
        t('userNotAuthenticated'),
        [{ text: t('ok'), onPress: () => navigation.goBack() }]
      );
    }
  }, [user, navigation, t]);

  // Funzione per cambiare lingua
  const changeLanguage = async (language) => {
    if (!user || !user.username) {
      console.error('Errore: utente non autenticato');
      Alert.alert(t('error'), t('userNotAuthenticated'));
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.14:3000/updateLanguage', {
        username: user.username,
        language,
      });

      console.log('Risposta del server:', response.data); // Debug
      i18n.changeLanguage(language);
      setSelectedLanguage(language);
    } catch (error) {
      console.error('Errore nell\'aggiornamento della lingua', error?.response?.data || error.message);
      Alert.alert(t('error'), t('languageUpdateFailed'));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('settingsTitle')}</Text>
        <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.languageButton}>
          <Text style={selectedLanguage === 'en' ? styles.selectedText : styles.buttonText}>{t('english')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('it')} style={styles.languageButton}>
          <Text style={selectedLanguage === 'it' ? styles.selectedText : styles.buttonText}>{t('italian')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('de')} style={styles.languageButton}>
          <Text style={selectedLanguage === 'de' ? styles.selectedText : styles.buttonText}>{t('german')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('es')} style={styles.languageButton}>
          <Text style={selectedLanguage === 'es' ? styles.selectedText : styles.buttonText}>{t('spanish')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('fr')} style={styles.languageButton}>
          <Text style={selectedLanguage === 'fr' ? styles.selectedText : styles.buttonText}>{t('french')}</Text>
        </TouchableOpacity>
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
  languageButton: {
    padding: 10,
    backgroundColor: '#32CD32',
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#FFF',
  },
  selectedText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
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
  iconWrapper: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
  },
});
