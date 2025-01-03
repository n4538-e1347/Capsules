import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa le icone

export default function SettingsScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language is English

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    // Logica per cambiare la lingua nell'app
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Impostazioni</Text>
        <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.languageButton}>
          <Text style={selectedLanguage === 'en' ? styles.selectedText : styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('it')} style={styles.languageButton}>
          <Text style={selectedLanguage === 'it' ? styles.selectedText : styles.buttonText}>Italiano</Text>
        </TouchableOpacity>
        {/* Aggiungi altre lingue se necessario */}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Torna alla Home
        >
          <Text>
            <Icon name="arrow-left" size={24} color="#FFF" /> {/* Icona back */}
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
    justifyContent: 'flex-start', // Allinea a sinistra
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: '#32CD32', // Verde
    borderRadius: 50, // Pulsante rotondo
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
