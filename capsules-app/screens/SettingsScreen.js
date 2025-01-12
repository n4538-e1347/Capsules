import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  const toggleSounds = () => {
    setSoundsEnabled(!soundsEnabled);
    console.log(`I suoni sono ora ${soundsEnabled ? 'disattivati' : 'attivati'}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('settingsTitle')}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>{t('profile')}</Text>
        </TouchableOpacity>		
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LanguageScreen')}
        >
          <Text style={styles.buttonText}>{t('language')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleSounds}
        >
          <Text style={styles.buttonText}>{soundsEnabled ? t('sounds') + ' On' : t('sounds') + ' Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NotificationsScreen')}
        >
          <Text style={styles.buttonText}>{t('notifications')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HelpScreen')}
        >
          <Text style={styles.buttonText}>{t('helpCenter')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.iconWrapper}>
            <Icon name="arrow-left" size={24} color="#FFF" />
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
  button: {
    padding: 10,
    backgroundColor: '#32CD32',
    borderRadius: 5,
    marginVertical: 5,
    width: 200, // Larghezza fissa per i pulsanti
    alignItems: 'center', // Centra il testo orizzontalmente
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18, // Aumenta la dimensione del testo per una migliore leggibilità
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
