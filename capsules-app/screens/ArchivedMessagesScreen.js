import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Modal } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PermissionsAndroid, Platform } from 'react-native';

export default function ArchivedMessagesScreen({ navigation }) {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];
  const [archivedMessages, setArchivedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (user && user.username) {
      fetchArchivedMessages();
    }
  }, []);

  const fetchArchivedMessages = async () => {
    try {
      const response = await axios.get(`http://192.168.1.14:3000/messages/${user.username}`);
      setArchivedMessages(response.data.filter(msg => msg.archived)); // Filtra solo i messaggi archiviati
    } catch (error) {
      alert(t('errorFetchingMessages', { error: error.message })); // Testo tradotto con variabile
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  const createPDF = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permesso di scrittura',
            message: 'L\'app ha bisogno del permesso di scrivere i file PDF',
            buttonNeutral: 'Chiedimi più tardi',
            buttonNegative: 'Annulla',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          alert('Permesso di scrittura non concesso');
          return;
        }
      }

      const htmlContent = `
        <h1>${t('archivedMessages')}</h1>
        <ul>
          ${archivedMessages.map(msg => `
            <li>
              <strong>${msg.sender}:</strong> ${msg.message} <br>
              <small>${msg.timestamp}</small>
            </li>`).join('')}
        </ul>
      `;

      const options = {
        html: htmlContent,
        fileName: 'archivedMessages',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      alert(`PDF salvato in: ${file.filePath}`);
    } catch (error) {
      alert(`Errore durante la creazione del PDF: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.title, { marginTop: 60 }]}>{t('archivedMessages')}</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={archivedMessages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedMessage(item)}>
                <View style={styles.messageContainer}>
                  <Text style={styles.sender}>{item.sender}: </Text>
                  <View style={styles.messageWrapper}>
                    <Text style={styles.message}>{item.message}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {selectedMessage && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={!!selectedMessage}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={[styles.modalText, styles.modalAlign]}><Text style={styles.modalLabel}>Da:</Text> {selectedMessage.sender}</Text>
                <Text style={[styles.modalText, styles.modalAlign]}><Text style={styles.modalLabel}>A:</Text> {user.username}</Text>
                <Text style={[styles.modalText, styles.modalAlign]}><Text style={styles.modalLabel}>Data Invio:</Text> {selectedMessage.timestamp}</Text>
                <Text style={[styles.modalText, styles.modalAlign]}><Text style={styles.modalLabel}>Data Apertura:</Text> {selectedMessage.archivedAt}</Text>
                <Text style={[styles.modalText, styles.modalAlign]}><Text style={styles.modalLabel}>Messaggio:</Text> {selectedMessage.message}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>{t('close')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              animateButton();
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pdfButton}
            onPress={() => {
              animateButton();
              createPDF(); // Aggiusta qui per assicurarti che la funzione sia chiamata
            }}
          >
            <Icon name="download" size={24} color="#FFF" />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 60,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sender: {
    fontWeight: 'bold',
    width: '20%',
  },
  messageWrapper: {
    width: '80%',
  },
  message: {
    flexWrap: 'wrap',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: '#32CD32',
    borderRadius: 30,
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
  pdfButton: {
    backgroundColor: '#32CD32',
    borderRadius: 30,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  modalAlign: {
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#32CD32',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
