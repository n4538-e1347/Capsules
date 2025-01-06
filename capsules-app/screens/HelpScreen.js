import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

export default function HelpScreen({ navigation }) {
  const { t } = useTranslation();
  const [showAppInfo, setShowAppInfo] = useState(false);
  const [showTermsPrivacy, setShowTermsPrivacy] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('helpCenter')}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ContactUsScreen')}
        >
          <Text style={styles.buttonText}>{t('contactUs')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTermsPrivacy(true)}
        >
          <Text style={styles.buttonText}>{t('termsPrivacy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAppInfo(true)}
        >
          <Text style={styles.buttonText}>{t('appInfo')}</Text>
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

      {/* Modal Popup for App Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAppInfo}
        onRequestClose={() => setShowAppInfo(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Capsules</Text>
            <Text style={styles.modalText}>Version 0.1</Text>
            <Text style={styles.modalText}>&copy; 2025 Capsules</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAppInfo(false)}
            >
              <Text style={styles.buttonText}>{t('close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Popup for Terms and Privacy */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTermsPrivacy}
        onRequestClose={() => setShowTermsPrivacy(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.modalText}>{t('termsAndConditions')}</Text>
              <Text style={styles.modalText}>{t('privacyPolicy')}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTermsPrivacy(false)}
              >
                <Text style={styles.buttonText}>{t('close')}</Text>
              </TouchableOpacity>
            </ScrollView>
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
  scrollViewContent: {
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#32CD32',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center', // Centra il testo orizzontalmente
  },
});
