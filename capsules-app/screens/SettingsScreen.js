import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
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
