import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function ArchivedMessagesScreen({ navigation }) {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const scaleValue = useState(new Animated.Value(1))[0];
  const [archivedMessages, setArchivedMessages] = useState([]);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.title, { marginTop: 60 }]}>{t('archivedMessages')}</Text>
        <FlatList
          data={archivedMessages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.message}>
              <Text>{item.sender}: {item.message}</Text>
            </View>
          )}
        />
        <View style={styles.bottomContainer}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => { animateButton(); navigation.goBack(); }}
            >
              <Text>
                <Icon name="arrow-left" size={24} color="#FFF" /> {/* Icona back */}
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
