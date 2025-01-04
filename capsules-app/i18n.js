import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Capsules!',
      showMessage: 'Show Message',
      close: 'Close',
      profile: 'Profile',
      sendMessage: 'Send Message',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      settings: 'Settings',
      archivedMessages: 'Archived Messages',
      settingsTitle: 'Settings',
      english: 'English',
      italian: 'Italian',
      german: 'German',
      spanish: 'Spanish',
      french: 'French',
    }
  },
  it: {
    translation: {
      welcome: 'Benvenuto su Capsules!',
      showMessage: 'Mostra Messaggio',
      close: 'Chiudi',
      profile: 'Profilo',
      sendMessage: 'Invia Messaggio',
      login: 'Login',
      register: 'Registrati',
      logout: 'Logout',
      settings: 'Impostazioni',
      archivedMessages: 'Messaggi Archiviati',
      settingsTitle: 'Impostazioni',
      english: 'Inglese',
      italian: 'Italiano',
      german: 'Tedesco',
      spanish: 'Spagnolo',
      french: 'Francese',
    }
  },
  // Aggiungi altre lingue qui
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // lingua di default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react già fa il safe da XSS
    }
  });

export default i18n;
