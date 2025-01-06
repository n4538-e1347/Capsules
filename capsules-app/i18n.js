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
      deleteAccountConfirmation: 'Delete Account Confirmation',
      deleteAccountPrompt: 'Are you sure you want to delete your account? All your data will be deleted, including exchanged messages, and cannot be recovered.',
      cancel: 'Cancel',
      delete: 'Delete',
      accountDeleted: 'Account successfully deleted',
      deleteAccountError: 'Error deleting account',
      connectionError: 'Connection error',
      sendFriendRequest: 'Send Friend Request',
      pendingFriendRequests: 'Pending Friend Requests',
      friendsList: 'Friends List',
      deleteAccount: 'Delete Account',
      friendsListTitle: 'Friends List',
      blockedUsersTitle: 'Blocked Users',
      friendRemovedSuccess: 'Friend successfully removed',
      friendRemovedBlockedSuccess: 'Friend successfully removed and blocked',
      friendRemoveError: 'Error removing friend',
      userUnblockedSuccess: 'User successfully unblocked',
      userUnblockError: 'Error unblocking user',
      confirmFriendshipWith: 'Confirm Friendship with',
      confirm: 'Confirm',
      friendRequestConfirmed: 'Friend request confirmed',
      friendRequestConfirmError: 'Error confirming friend request',
      sentFriendRequests: 'Sent Friend Requests',
      receivedFriendRequests: 'Received Friend Requests',
      friendRequestConfirmed: 'Friend request confirmed',
      friendRequestConfirmError: 'Error confirming friend request',
      friendRequestRejected: 'Friend request rejected',
      friendRequestRejectedBlocked: 'Friend request rejected and user blocked',
      friendRequestRejectError: 'Error rejecting friend request',
      friendRequestRejectBlockError: 'Error rejecting and blocking friend request',
      friendRequestWithdrawn: 'Friend request withdrawn',
      friendRequestWithdrawError: 'Error withdrawing friend request',
      sendFriendRequestTitle: 'Send Friend Request',
      friendUsernamePlaceholder: 'Friend\'s Username',
      messagePlaceholder: 'Accompanying Message',
      sendRequest: 'Send Request',
      authenticationError: 'Authentication error. Please log in again.',
      messageTooLong: 'Message cannot exceed 100 characters.',
      friendRequestSentSuccess: 'Friend request sent successfully',
      friendRequestSendError: 'Error sending friend request',
      resetPasswordTitle: 'Reset Password',
      tokenPlaceholder: 'Token',
      newPasswordPlaceholder: 'New Password',
      resetPasswordButton: 'Reset Password',
      passwordResetSuccess: 'Password reset successfully',
      passwordResetError: 'Error resetting password. Please try again.',
      connectionError: 'Connection error',
      resetPasswordTitle: 'Reset Password',
      emailPlaceholder: 'Email',
      requestResetButton: 'Request Reset',
      resetEmailSentSuccess: 'Password reset email sent successfully',
      resetEmailSendError: 'Error sending password reset email. Please try again.',
      landingWelcome: 'Welcome to Capsules!',
      loginButton: 'Login',
      registerButton: 'Register',
      loginFailed: 'Login failed. Please check your credentials.',
      incorrectUsernamePassword: 'Incorrect username or password',
      forgotPassword: 'Forgot password?',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      registerFailed: 'Registration failed. Please try again.',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      emailPlaceholder: 'Email',
      register: 'Register',
      fetchFriendsError: 'Error fetching friends',
      sendMessageError: 'Error sending message',
      messages: 'Messages',
      selectFriend: 'Select a friend',
      writeMessage: 'Write a message',
      send: 'Send',
	  language: 'Language',
	  sounds: 'Sounds',
	  confirmSend: 'Do you confirm sending?',
	  username: 'Username',
	  email: 'Email',
	  hideEmail: 'Hide Email',
	  showEmail: 'Show Email',
	  premiumStatus: 'Premium User',
	  NoMoreCapsules: 'You have no more capsules!',
	  openCapsulePrompt: 'Do you wish to open a capsule?',
	  removeFriendMessage: 'Do you want to remove this contact?',
	  blockFriendMessage: 'Do you want to block this contact?',
	  helpCenter: 'Help Center',
	  notifications: 'Notifications',
	  contactUs: 'Contact Us',
	  termsPrivacy: 'Terms and Privacy',
	  appInfo: 'App info',
      termsAndConditions: `
		**Last updated: January 2025**

		**Acceptance of Terms**
		By using the **Capsules** app, the user agrees to abide by these Terms and Conditions. If you do not agree with these terms, please do not use the app.

		**Use of the Application**
		The app is intended for personal use only. The user agrees not to use the app for illegal or unauthorized purposes. The user also agrees not to interfere with the normal operation of the app.

		**Intellectual Property**
		All content within the app, including text, images, logos, and trademarks, is the property of **Capsules** or its licensors. Copying, modifying, distributing, or creating derivative works from the content without written consent from **Capsules** is prohibited.

		**Limitation of Liability**
		The app is provided "as is" and "as available." We do not guarantee that the app will be error-free or uninterrupted. **Capsules** will not be liable for any damages arising from the use of the app.

		**Changes to Terms**
		We reserve the right to modify these Terms at any time. Changes will be posted within the app, and continued use of the app constitutes acceptance of the new Terms.
			`,
	  privacyPolicy: `
		**Last updated: January 2025**

		**Introduction**
		This Privacy Policy describes how we collect, use, and protect the personal data of users of the **Capsules** app.

		**Data Collection**
		We collect personal data provided voluntarily by the user, such as name and email address, during registration. Additionally, we collect data related to the use of the app, such as preferences and settings.

		**Data Use**
		We use the collected data to provide and improve the services offered by the app, to communicate with the user, and to ensure the security of the app.

		**Data Sharing**
		We do not share users' personal data with third parties, except where required by law or with the user's explicit consent.

		**Data Security**
		We implement technical and organizational security measures to protect users' personal data from unauthorized access, loss, or destruction.

		**User Rights**
		Users have the right to access, correct, and delete their personal data. To exercise these rights, please contact us at the email address provided within the app.

		**Changes to Privacy Policy**
		We reserve the right to modify this Privacy Policy at any time. Changes will be posted within the app, and continued use of the app constitutes acceptance of the new Privacy Policy.
			`  
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
      deleteAccountConfirmation: 'Conferma Eliminazione Account',
      deleteAccountPrompt: 'Sei sicuro di voler eliminare il tuo account? Tutti i tuoi dati verranno cancellati, inclusi i messaggi scambiati, e non potranno essere recuperati.',
      cancel: 'Annulla',
      delete: 'Elimina',
      accountDeleted: 'Account eliminato con successo',
      deleteAccountError: 'Errore nell\'eliminazione dell\'account',
      connectionError: 'Errore di connessione',
      sendFriendRequest: 'Richiedi Amicizia',
      pendingFriendRequests: 'Richieste in sospeso',
      friendsList: 'Elenco degli Amici',
      deleteAccount: 'Elimina Account',
      friendsListTitle: 'Elenco degli Amici',
      blockedUsersTitle: 'Utenti Bloccati',
      friendRemovedSuccess: 'Amico rimosso con successo',
      friendRemovedBlockedSuccess: 'Amico rimosso e bloccato con successo',
      friendRemoveError: 'Errore nella rimozione dell\'amico',
      userUnblockedSuccess: 'Utente sbloccato con successo',
      userUnblockError: 'Errore nello sblocco dell\'utente',
      confirmFriendshipWith: 'Confermare Amicizia con',
      confirm: 'Conferma',
      friendRequestConfirmed: 'Richiesta di amicizia confermata',
      friendRequestConfirmError: 'Errore nella conferma della richiesta di amicizia',
      sentFriendRequests: 'Richieste di Amicizia Inviate',
      receivedFriendRequests: 'Richieste di Amicizia Ricevute',
      friendRequestConfirmed: 'Richiesta di amicizia confermata',
      friendRequestConfirmError: 'Errore nella conferma della richiesta di amicizia',
      friendRequestRejected: 'Richiesta di amicizia rifiutata',
      friendRequestRejectedBlocked: 'Richiesta di amicizia rifiutata e utente bloccato',
      friendRequestRejectError: 'Errore nel rifiuto della richiesta di amicizia',
      friendRequestRejectBlockError: 'Errore nel rifiuto e blocco della richiesta di amicizia',
      friendRequestWithdrawn: 'Richiesta di amicizia ritirata',
      friendRequestWithdrawError: 'Errore nel ritiro della richiesta di amicizia',
      sendFriendRequestTitle: 'Invia Richiesta di Amicizia',
      friendUsernamePlaceholder: 'Username dell\'Amico',
      messagePlaceholder: 'Messaggio di accompagnamento',
      sendRequest: 'Invia Richiesta',
      authenticationError: 'Errore di autenticazione. Per favore, effettua nuovamente il login.',
      messageTooLong: 'Il messaggio non può superare i 100 caratteri.',
      friendRequestSentSuccess: 'Richiesta di amicizia inviata con successo',
      friendRequestSendError: 'Errore nell\'invio della richiesta di amicizia',
      resetPasswordTitle: 'Reset della Password',
      tokenPlaceholder: 'Token',
      newPasswordPlaceholder: 'Nuova Password',
      resetPasswordButton: 'Reset Password',
      passwordResetSuccess: 'Password resettata con successo',
      passwordResetError: 'Errore nel reset della password. Per favore, riprova.',
      connectionError: 'Errore di connessione',
      resetPasswordTitle: 'Reset della Password',
      emailPlaceholder: 'Email',
      requestResetButton: 'Richiedi Reset',
      resetEmailSentSuccess: 'Email di reset della password inviata con successo',
      resetEmailSendError: 'Errore nella richiesta di reset della password. Per favore, riprova.',
      landingWelcome: 'Benvenuto su Capsules!',
      loginButton: 'Login',
      registerButton: 'Registrati',
      loginFailed: 'Accesso fallito. Per favore, controlla le tue credenziali.',
      incorrectUsernamePassword: 'Username o password non corretti',
      forgotPassword: 'Password dimenticata?',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      registerFailed: 'Registrazione fallita. Per favore, riprova.',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      emailPlaceholder: 'Email',
      register: 'Registrati',
      fetchFriendsError: 'Errore nel recupero degli amici',
      sendMessageError: 'Errore nell\'invio del messaggio',
      messages: 'Messaggi',
      selectFriend: 'Seleziona un amico',
      writeMessage: 'Scrivi un messaggio',
      send: 'Invia',
	  language: 'Lingua',
	  sounds: 'Suoni',
	  confirmSend: 'Confermi l\'invio?',
	  username: 'Username',
	  email: 'e-mail',
	  hideEmail: 'Nascondi e-mail',
	  showEmail: 'Mostra e-mail',
	  premiumStatus: 'Utente Premium',
	  NoMoreCapsules: 'Hai finito le capsule!',
	  openCapsulePrompt: 'Vuoi aprire una capsula?',
	  removeFriendMessage: 'Vuoi rimuovere il contatto?',
	  blockFriendMessage: 'Vuoi bloccare il contatto?',
	  helpCenter: 'Centro Assistenza',
	  notifications: 'Notifiche',
	  contactUs: 'Contattaci',
	  termsPrivacy: 'Termini e Privacy',
	  appInfo: 'App info',
	  termsAndConditions: `
		**Ultimo aggiornamento: Gennaio 2025**

		**Accettazione dei Termini**
		Utilizzando l'applicazione **Capsules**, l'utente accetta di rispettare i presenti Termini e Condizioni. Se non si accettano questi termini, si prega di non utilizzare l'app.

		**Uso dell'Applicazione**
		L'app è destinata esclusivamente all'uso personale. L'utente si impegna a non utilizzare l'app per scopi illegali o non autorizzati. L'utente si impegna inoltre a non interferire con il normale funzionamento dell'app.

		**Proprietà Intellettuale**
		Tutti i contenuti presenti nell'app, inclusi testi, immagini, loghi e marchi, sono di proprietà di **Capsules** o dei suoi licenziatari. È vietato copiare, modificare, distribuire o creare opere derivate dai contenuti senza il consenso scritto di **Capsules**.

		**Limitazione di Responsabilità**
		L'app è fornita "così com'è" e "come disponibile". Non garantiamo che l'app sarà priva di errori o interruzioni. **Capsules** non sarà responsabile per eventuali danni derivanti dall'uso dell'app.

		**Modifiche ai Termini**
		Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche saranno pubblicate all'interno dell'app e l'uso continuato dell'app costituisce l'accettazione dei nuovi Termini.
			`,
	  privacyPolicy: `
		**Ultimo aggiornamento: Gennaio 2025**

		**Introduzione**
		La presente Informativa sulla Privacy descrive come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti dell'app **Capsules**.

		**Raccolta dei Dati**
		Raccogliamo dati personali forniti volontariamente dall'utente, come nome e indirizzo email, al momento della registrazione. Inoltre, raccogliamo dati relativi all'uso dell'app, come le preferenze e le impostazioni.

		**Utilizzo dei Dati**
		Utilizziamo i dati raccolti per fornire e migliorare i servizi offerti dall'app, per comunicare con l'utente e per garantire la sicurezza dell'app.

		**Condivisione dei Dati**
		Non condividiamo i dati personali degli utenti con terze parti, salvo ove richiesto dalla legge o con il consenso esplicito dell'utente.

		**Sicurezza dei Dati**
		Adottiamo misure di sicurezza tecniche e organizzative per proteggere i dati personali degli utenti da accessi non autorizzati, perdita o distruzione.

		**Diritti degli Utenti**
		Gli utenti hanno il diritto di accedere, correggere e cancellare i propri dati personali. Per esercitare questi diritti, contattaci all'indirizzo email fornito nell'app.

		**Modifiche alla Privacy**
		Ci riserviamo il diritto di modificare questa Informativa sulla Privacy in qualsiasi momento. Le modifiche saranno pubblicate all'interno dell'app e l'uso continuato dell'app costituisce l'accettazione della nuova Informativa sulla Privacy.
			`
    }
  },
  de: {
    translation: {
      welcome: 'Willkommen bei Capsules!',
      showMessage: 'Nachricht anzeigen',
      close: 'Schließen',
      profile: 'Profil',
      sendMessage: 'Nachricht senden',
      login: 'Anmelden',
      register: 'Registrieren',
      logout: 'Abmelden',
      settings: 'Einstellungen',
      archivedMessages: 'Archivierte Nachrichten',
      settingsTitle: 'Einstellungen',
      english: 'Englisch',
      italian: 'Italienisch',
      german: 'Deutsch',
      spanish: 'Spanisch',
      french: 'Französisch',
      deleteAccountConfirmation: 'Löschen des Kontos bestätigen',
      deleteAccountPrompt: 'Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Alle Ihre Daten, einschließlich ausgetauschter Nachrichten, werden gelöscht und können nicht wiederhergestellt werden.',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      accountDeleted: 'Konto erfolgreich gelöscht',
      deleteAccountError: 'Fehler beim Löschen des Kontos',
      connectionError: 'Verbindungsfehler',
      sendFriendRequest: 'Freundschaftsanfrage senden',
      pendingFriendRequests: 'Ausstehende Freundschaftsanfragen',
      friendsList: 'Freundesliste',
      deleteAccount: 'Konto löschen',
      friendsListTitle: 'Freundesliste',
      blockedUsersTitle: 'Blockierte Benutzer',
      friendRemovedSuccess: 'Freund erfolgreich entfernt',
      friendRemovedBlockedSuccess: 'Freund erfolgreich entfernt und blockiert',
      friendRemoveError: 'Fehler beim Entfernen des Freundes',
      userUnblockedSuccess: 'Benutzer erfolgreich entsperrt',
      userUnblockError: 'Fehler beim Entsperren des Benutzers',
      confirmFriendshipWith: 'Freundschaft bestätigen mit',
      confirm: 'Bestätigen',
      friendRequestConfirmed: 'Freundschaftsanfrage bestätigt',
      friendRequestConfirmError: 'Fehler beim Bestätigen der Freundschaftsanfrage',
      sentFriendRequests: 'Gesendete Freundschaftsanfragen',
      receivedFriendRequests: 'Erhaltene Freundschaftsanfragen',
      friendRequestConfirmed: 'Freundschaftsanfrage bestätigt',
      friendRequestConfirmError: 'Fehler bei der Bestätigung der Freundschaftsanfrage',
      friendRequestRejected: 'Freundschaftsanfrage abgelehnt',
      friendRequestRejectedBlocked: 'Freundschaftsanfrage abgelehnt und Benutzer blockiert',
      friendRequestRejectError: 'Fehler beim Ablehnen der Freundschaftsanfrage',
      friendRequestRejectBlockError: 'Fehler beim Ablehnen und Blockieren der Freundschaftsanfrage',
      friendRequestWithdrawn: 'Freundschaftsanfrage zurückgezogen',
      friendRequestWithdrawError: 'Fehler beim Zurückziehen der Freundschaftsanfrage',
      sendFriendRequestTitle: 'Freundschaftsanfrage senden',
      friendUsernamePlaceholder: 'Benutzername des Freundes',
      messagePlaceholder: 'Begleitende Nachricht',
      sendRequest: 'Anfrage senden',
      authenticationError: 'Authentifizierungsfehler. Bitte melden Sie sich erneut an.',
      messageTooLong: 'Nachricht darf 100 Zeichen nicht überschreiten.',
      friendRequestSentSuccess: 'Freundschaftsanfrage erfolgreich gesendet',
      friendRequestSendError: 'Fehler beim Senden der Freundschaftsanfrage',
      resetPasswordTitle: 'Passwort zurücksetzen',
      tokenPlaceholder: 'Token',
      newPasswordPlaceholder: 'Neues Passwort',
      resetPasswordButton: 'Passwort zurücksetzen',
      passwordResetSuccess: 'Passwort erfolgreich zurückgesetzt',
      passwordResetError: 'Fehler beim Zurücksetzen des Passworts. Bitte versuchen Sie es erneut.',
      connectionError: 'Verbindungsfehler',
      resetPasswordTitle: 'Passwort zurücksetzen',
      emailPlaceholder: 'E-Mail',
      requestResetButton: 'Reset anfordern',
      resetEmailSentSuccess: 'E-Mail zum Zurücksetzen des Passworts erfolgreich gesendet',
      resetEmailSendError: 'Fehler beim Senden der E-Mail zum Zurücksetzen des Passworts. Bitte versuchen Sie es erneut.',
      landingWelcome: 'Willkommen bei Capsules!',
      loginButton: 'Anmelden',
      registerButton: 'Registrieren',
      loginFailed: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.',
      incorrectUsernamePassword: 'Falscher Benutzername oder falsches Passwort',
      forgotPassword: 'Passwort vergessen?',
      usernamePlaceholder: 'Benutzername',
      passwordPlaceholder: 'Passwort',
      registerFailed: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
      usernamePlaceholder: 'Benutzername',
      passwordPlaceholder: 'Passwort',
      emailPlaceholder: 'E-Mail',
      register: 'Registrieren',
      fetchFriendsError: 'Fehler beim Abrufen von Freunden',
      sendMessageError: 'Fehler beim Senden der Nachricht',
      messages: 'Nachrichten',
      selectFriend: 'Wähle einen Freund',
      writeMessage: 'Schreibe eine Nachricht',
      send: 'Senden',
	  language: 'Sprache',
	  sounds: 'Klänge',
	  confirmSend: 'Bestätigen Sie das Senden?',
	  username: 'Benutzername',
	  email: 'E-Mail',
	  hideEmail: 'E-Mail verbergen',
	  showEmail: 'E-Mail anzeigen',
	  premiumStatus: 'Premium-Benutzer',
	  NoMoreCapsules: 'Du hast keine Kapseln mehr!',
	  openCapsulePrompt: 'Möchtest du eine Kapsel öffnen?',
	  removeFriendMessage: 'Möchtest du diesen Kontakt entfernen?',
	  blockFriendMessage: 'Möchtest du diesen Kontakt blockieren?',
	  helpCenter: 'Hilfezentrum',
	  notifications: 'Benachrichtigungen',
	  contactUs: 'Kontaktieren Sie uns',
	  termsPrivacy: 'AGB und Datenschutz',
	  appInfo: 'App-Info',
      termsAndConditions: `
		**Letzte Aktualisierung: Januar 2025**

		**Akzeptanz der Bedingungen**
		Durch die Nutzung der Anwendung **Capsules** erklärt sich der Benutzer mit diesen Bedingungen einverstanden. Wenn Sie diese Bedingungen nicht akzeptieren, verwenden Sie die App bitte nicht.

		**Verwendung der Anwendung**
		Die App ist nur für den persönlichen Gebrauch bestimmt. Der Benutzer verpflichtet sich, die App nicht für illegale oder nicht autorisierte Zwecke zu verwenden. Der Benutzer verpflichtet sich außerdem, den normalen Betrieb der App nicht zu stören.

		**Geistiges Eigentum**
		Alle Inhalte der App, einschließlich Texte, Bilder, Logos und Marken, sind Eigentum von **Capsules** oder deren Lizenzgebern. Es ist verboten, die Inhalte ohne schriftliche Genehmigung von **Capsules** zu kopieren, zu ändern, zu verteilen oder abgeleitete Werke zu erstellen.

		**Haftungsbeschränkung**
		Die App wird "wie besehen" und "wie verfügbar" bereitgestellt. Wir garantieren nicht, dass die App fehlerfrei oder unterbrechungsfrei ist. **Capsules** haftet nicht für Schäden, die sich aus der Nutzung der App ergeben.

		**Änderungen der Bedingungen**
		Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen werden in der App veröffentlicht und die fortgesetzte Nutzung der App stellt die Annahme der neuen Bedingungen dar.
			`,
	  privacyPolicy: `
		**Letzte Aktualisierung: Januar 2025**

		**Einführung**
		Diese Datenschutzrichtlinie beschreibt, wie wir die personenbezogenen Daten der Benutzer der App **Capsules** erfassen, verwenden und schützen.

		**Datenerfassung**
		Wir erfassen personenbezogene Daten, die der Benutzer freiwillig bei der Registrierung angibt, wie Name und E-Mail-Adresse. Außerdem erfassen wir Daten über die Nutzung der App, wie Präferenzen und Einstellungen.

		**Datenverwendung**
		Wir verwenden die erfassten Daten, um die angebotenen Dienste der App bereitzustellen und zu verbessern, mit dem Benutzer zu kommunizieren und die Sicherheit der App zu gewährleisten.

		**Datenweitergabe**
		Wir geben die personenbezogenen Daten der Benutzer nicht an Dritte weiter, es sei denn, dies ist gesetzlich vorgeschrieben oder mit ausdrücklicher Zustimmung des Benutzers.

		**Datensicherheit**
		Wir ergreifen technische und organisatorische Maßnahmen, um die personenbezogenen Daten der Benutzer vor unbefugtem Zugriff, Verlust oder Zerstörung zu schützen.

		**Rechte der Benutzer**
		Benutzer haben das Recht, auf ihre personenbezogenen Daten zuzugreifen, diese zu korrigieren und zu löschen. Um diese Rechte auszuüben, kontaktieren Sie uns bitte unter der in der App angegebenen E-Mail-Adresse.

		**Änderungen der Datenschutzrichtlinie**
		Wir behalten uns das Recht vor, diese Datenschutzrichtlinie jederzeit zu ändern. Änderungen werden in der App veröffentlicht und die fortgesetzte Nutzung der App stellt die Annahme der neuen Datenschutzrichtlinie dar.
			`	  
    }
  },
  es: {
    translation: {
      welcome: '¡Bienvenido a Capsules!',
      showMessage: 'Mostrar mensaje',
      close: 'Cerrar',
      profile: 'Perfil',
      sendMessage: 'Enviar mensaje',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión',
      settings: 'Configuraciones',
      archivedMessages: 'Mensajes archivados',
      settingsTitle: 'Configuraciones',
      english: 'Inglés',
      italian: 'Italiano',
      german: 'Alemán',
      spanish: 'Español',
      french: 'Francés',
      deleteAccountConfirmation: 'Confirmar eliminación de cuenta',
      deleteAccountPrompt: '¿Estás seguro de que deseas eliminar tu cuenta? Todos tus datos se eliminarán, incluidos los mensajes intercambiados, y no se podrán recuperar.',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      accountDeleted: 'Cuenta eliminada con éxito',
      deleteAccountError: 'Error al eliminar la cuenta',
      connectionError: 'Error de conexión',
      sendFriendRequest: 'Enviar solicitud de amistad',
      pendingFriendRequests: 'Solicitudes de amistad pendientes',
      friendsList: 'Lista de amigos',
      deleteAccount: 'Eliminar cuenta',
      friendsListTitle: 'Lista de amigos',
      blockedUsersTitle: 'Usuarios bloqueados',
      friendRemovedSuccess: 'Amigo eliminado con éxito',
      friendRemovedBlockedSuccess: 'Amigo eliminado y bloqueado con éxito',
      friendRemoveError: 'Error al eliminar al amigo',
      userUnblockedSuccess: 'Usuario desbloqueado con éxito',
      userUnblockError: 'Error al desbloquear al usuario',
      confirmFriendshipWith: 'Confirmar amistad con',
      confirm: 'Confirmar',
      friendRequestConfirmed: 'Solicitud de amistad confirmada',
      friendRequestConfirmError: 'Error al confirmar la solicitud de amistad',
      sentFriendRequests: 'Solicitudes de amistad enviadas',
      receivedFriendRequests: 'Solicitudes de amistad recibidas',
      friendRequestConfirmed: 'Solicitud de amistad confirmada',
      friendRequestConfirmError: 'Error al confirmar la solicitud de amistad',
      friendRequestRejected: 'Solicitud de amistad rechazada',
      friendRequestRejectedBlocked: 'Solicitud de amistad rechazada y usuario bloqueado',
      friendRequestRejectError: 'Error al rechazar la solicitud de amistad',
      friendRequestRejectBlockError: 'Error al rechazar y bloquear la solicitud de amistad',
      friendRequestWithdrawn: 'Solicitud de amistad retirada',
      friendRequestWithdrawError: 'Error al retirar la solicitud de amistad',
      sendFriendRequestTitle: 'Enviar solicitud de amistad',
      friendUsernamePlaceholder: 'Nombre de usuario del amigo',
      messagePlaceholder: 'Mensaje acompañante',
      sendRequest: 'Enviar solicitud',
      authenticationError: 'Error de autenticación. Por favor, inicie sesión nuevamente.',
      messageTooLong: 'El mensaje no puede exceder los 100 caracteres.',
      friendRequestSentSuccess: 'Solicitud de amistad enviada con éxito',
      friendRequestSendError: 'Error al enviar la solicitud de amistad',
      resetPasswordTitle: 'Restablecer la Contraseña',
      tokenPlaceholder: 'Token',
      newPasswordPlaceholder: 'Nueva Contraseña',
      resetPasswordButton: 'Restablecer la Contraseña',
      passwordResetSuccess: 'Contraseña restablecida con éxito',
      passwordResetError: 'Error al restablecer la contraseña. Por favor, inténtelo de nuevo.',
      connectionError: 'Error de conexión',
      resetPasswordTitle: 'Restablecer la Contraseña',
      emailPlaceholder: 'Correo electrónico',
      requestResetButton: 'Solicitar restablecimiento',
      resetEmailSentSuccess: 'Correo electrónico de restablecimiento de contraseña enviado con éxito',
      resetEmailSendError: 'Error al enviar el correo electrónico de restablecimiento de contraseña. Por favor, inténtelo de nuevo.',
      landingWelcome: '¡Bienvenido a Capsules!',
      loginButton: 'Iniciar sesión',
      registerButton: 'Registrarse',
      loginFailed: 'Error de inicio de sesión. Por favor, verifique sus credenciales.',
      incorrectUsernamePassword: 'Nombre de usuario o contraseña incorrectos',
      forgotPassword: '¿Olvidaste tu contraseña?',
      usernamePlaceholder: 'Nombre de usuario',
      passwordPlaceholder: 'Contraseña',
      registerFailed: 'Registro fallido. Por favor, inténtelo de nuevo.',
      usernamePlaceholder: 'Nombre de usuario',
      passwordPlaceholder: 'Contraseña',
      emailPlaceholder: 'Correo electrónico',
      register: 'Registrarse',
      fetchFriendsError: 'Error al recuperar amigos',
      sendMessageError: 'Error al enviar mensaje',
      messages: 'Mensajes',
      selectFriend: 'Selecciona un amigo',
      writeMessage: 'Escribe un mensaje',
      send: 'Enviar',
	  language: 'Idioma',
	  sounds: 'Sonidos',
	  confirmSend: '¿Confirmas el envío?',
	  username: 'Nombre de usuario',
	  email: 'Correo electrónico',
	  hideEmail: 'Ocultar correo electrónico',
	  showEmail: 'Mostrar correo electrónico',
	  premiumStatus: 'Usuario Premium',
	  NoMoreCapsules: '¡No tienes más cápsulas!',
	  openCapsulePrompt: '¿Quieres abrir una cápsula?',
	  removeFriendMessage: '¿Quieres eliminar este contacto?',
	  blockFriendMessage: '¿Quieres bloquear este contacto?',
	  helpCenter: 'Centro de ayuda',
	  notifications: 'Notificaciones',
	  contactUs: 'Contáctenos',
	  termsPrivacy: 'Términos y privacidad',
	  appInfo: 'Información de la app',
	  termsAndConditions: `
		**Última actualización: Enero 2025**

		**Aceptación de los Términos**
		Al utilizar la aplicación **Capsules**, el usuario acepta cumplir con estos Términos y Condiciones. Si no acepta estos términos, no utilice la aplicación.

		**Uso de la Aplicación**
		La aplicación está destinada únicamente para uso personal. El usuario se compromete a no utilizar la aplicación para fines ilegales o no autorizados. El usuario también se compromete a no interferir con el funcionamiento normal de la aplicación.

		**Propiedad Intelectual**
		Todos los contenidos presentes en la aplicación, incluidos textos, imágenes, logotipos y marcas, son propiedad de **Capsules** o de sus licenciantes. Está prohibido copiar, modificar, distribuir o crear obras derivadas de los contenidos sin el consentimiento escrito de **Capsules**.

		**Limitación de Responsabilidad**
		La aplicación se proporciona "tal como está" y "según disponibilidad". No garantizamos que la aplicación esté libre de errores o interrupciones. **Capsules** no será responsable de ningún daño derivado del uso de la aplicación.

		**Cambios en los Términos**
		Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios se publicarán dentro de la aplicación y el uso continuado de la aplicación constituye la aceptación de los nuevos Términos.
			`,
	  privacyPolicy: `
		**Última actualización: Enero 2025**

		**Introducción**
		Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos los datos personales de los usuarios de la aplicación **Capsules**.

		**Recopilación de Datos**
		Recopilamos datos personales proporcionados voluntariamente por el usuario, como nombre y dirección de correo electrónico, al momento del registro. Además, recopilamos datos relacionados con el uso de la aplicación, como las preferencias y configuraciones.

		**Uso de los Datos**
		Utilizamos los datos recopilados para proporcionar y mejorar los servicios ofrecidos por la aplicación, para comunicarnos con el usuario y para garantizar la seguridad de la aplicación.

		**Compartir Datos**
		No compartimos los datos personales de los usuarios con terceros, salvo cuando sea requerido por la ley o con el consentimiento explícito del usuario.

		**Seguridad de los Datos**
		Adoptamos medidas de seguridad técnicas y organizativas para proteger los datos personales de los usuarios contra accesos no autorizados, pérdida o destrucción.

		**Derechos de los Usuarios**
		Los usuarios tienen el derecho de acceder, corregir y eliminar sus datos personales. Para ejercer estos derechos, contáctenos en la dirección de correo electrónico proporcionada en la aplicación.

		**Cambios en la Política de Privacidad**
		Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios se publicarán dentro de la aplicación y el uso continuado de la aplicación constituye la aceptación de la nueva Política de Privacidad.
			`	  
    }
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur Capsules!',
      showMessage: 'Afficher le message',
      close: 'Fermer',
      profile: 'Profil',
      sendMessage: 'Envoyer message',
      login: 'Se connecter',
      register: 'S\'inscrire',
      logout: 'Se déconnecter',
      settings: 'Paramètres',
      archivedMessages: 'Messages archivés',
      settingsTitle: 'Paramètres',
      english: 'Anglais',
      italian: 'Italien',
      german: 'Allemand',
      spanish: 'Espagnol',
      french: 'Français',
      deleteAccountConfirmation: 'Confirmer la suppression du compte',
      deleteAccountPrompt: 'Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données, y compris les messages échangés, seront supprimées et ne pourront pas être récupérées.',
      cancel: 'Annuler',
      delete: 'Supprimer',
      accountDeleted: 'Compte supprimé avec succès',
      deleteAccountError: 'Erreur de suppression du compte',
      connectionError: 'Erreur de connexion',
      sendFriendRequest: 'Envoyer une demande d\'ami',
      pendingFriendRequests: 'Demandes d\'amis en attente',
      friendsList: 'Liste d\'amis',
      deleteAccount: 'Supprimer le compte',
      friendsListTitle: 'Liste d\'amis',
      blockedUsersTitle: 'Utilisateurs bloqués',
      friendRemovedSuccess: 'Ami supprimé avec succès',
      friendRemovedBlockedSuccess: 'Ami supprimé et bloqué avec succès',
      friendRemoveError: 'Erreur lors de la suppression de l\'ami',
      userUnblockedSuccess: 'Utilisateur débloqué avec succès',
      userUnblockError: 'Erreur lors du déblocage de l\'utilisateur',
      confirmFriendshipWith: 'Confirmer l\'amitié avec',
      confirm: 'Confirmer',
      friendRequestConfirmed: 'Demande d\'amitié confirmée',
      friendRequestConfirmError: 'Erreur lors de la confirmation de la demande d\'amitié',
      sentFriendRequests: 'Demandes d\'amitié envoyées',
      receivedFriendRequests: 'Demandes d\'amitié reçues',
      friendRequestConfirmed: 'Demande d\'amitié confirmée',
      friendRequestConfirmError: 'Erreur lors de la confirmation de la demande d\'amitié',
      friendRequestRejected: 'Demande d\'amitié rejetée',
      friendRequestRejectedBlocked: 'Demande d\'amitié rejetée et utilisateur bloqué',
      friendRequestRejectError: 'Erreur lors du rejet de la demande d\'amitié',
      friendRequestRejectBlockError: 'Erreur lors du rejet et du blocage de la demande d\'amitié',
      friendRequestWithdrawn: 'Demande d\'amitié retirée',
      friendRequestWithdrawError: 'Erreur lors du retrait de la demande d\'amitié',
      sendFriendRequestTitle: 'Envoyer une demande d\'ami',
      friendUsernamePlaceholder: 'Nom d\'utilisateur de l\'ami',
      messagePlaceholder: 'Message d\'accompagnement',
      sendRequest: 'Envoyer la demande',
      authenticationError: 'Erreur d\'authentification. Veuillez vous reconnecter.',
      messageTooLong: 'Le message ne peut pas dépasser 100 caractères.',
      friendRequestSentSuccess: 'Demande d\'amitié envoyée avec succès',
      friendRequestSendError: 'Erreur lors de l\'envoi de la demande d\'amitié',
      resetPasswordTitle: 'Réinitialiser le Mot de Passe',
      tokenPlaceholder: 'Jeton',
      newPasswordPlaceholder: 'Nouveau Mot de Passe',
      resetPasswordButton: 'Réinitialiser le Mot de Passe',
      passwordResetSuccess: 'Mot de passe réinitialisé avec succès',
      passwordResetError: 'Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.',
      connectionError: 'Erreur de connexion',
      resetPasswordTitle: 'Réinitialiser le Mot de Passe',
      emailPlaceholder: 'Email',
      requestResetButton: 'Demander la réinitialisation',
      resetEmailSentSuccess: 'E-mail de réinitialisation de mot de passe envoyé avec succès',
      resetEmailSendError: 'Erreur lors de l\'envoi de l\'e-mail de réinitialisation de mot de passe. Veuillez réessayer.',
      landingWelcome: 'Bienvenue sur Capsules!',
      loginButton: 'Se connecter',
      registerButton: 'S\'inscrire',
      loginFailed: 'Échec de la connexion. Veuillez vérifier vos identifiants.',
      incorrectUsernamePassword: 'Nom d\'utilisateur ou mot de passe incorrect',
      forgotPassword: 'Mot de passe oublié?',
      usernamePlaceholder: 'Nom d\'utilisateur',
      passwordPlaceholder: 'Mot de passe',
      registerFailed: 'Échec de l\'inscription. Veuillez réessayer.',
      usernamePlaceholder: 'Nom d\'utilisateur',
      passwordPlaceholder: 'Mot de passe',
      emailPlaceholder: 'Email',
      register: 'S\'inscrire',
      fetchFriendsError: 'Erreur lors de la récupération des amis',
      sendMessageError: 'Erreur lors de l\'envoi du message',
      messages: 'Messages',
      selectFriend: 'Sélectionnez un ami',
      writeMessage: 'Écrire un message',
      send: 'Envoyer',
	  language: 'Langue',
	  sounds: 'Sons',
	  confirmSend: 'Confirmez-vous l\'envoi?',
	  username: 'Nom d\'utilisateur',
	  email: 'Email',
	  hideEmail: 'Masquer l\'email',
	  showEmail: 'Afficher l\'email',
	  premiumStatus: 'Utilisateur Premium',
	  NoMoreCapsules: 'Vous n\'avez plus de capsules!',
	  openCapsulePrompt: 'Voulez-vous ouvrir une capsule?',
	  removeFriendMessage: 'Voulez-vous supprimer ce contact?',
	  blockFriendMessage: 'Voulez-vous bloquer ce contact?',
	  helpCenter: 'Centre d\'aide',
	  notifications: 'Notifications',
	  contactUs: 'Contactez-nous',
	  termsPrivacy: 'Termes et confidentialité',
	  appInfo: 'Infos sur l\'app',
      termsAndConditions: `
		**Dernière mise à jour : Janvier 2025**

		**Acceptation des Termes**
		En utilisant l'application **Capsules**, l'utilisateur accepte de respecter les présents Termes et Conditions. Si vous n'acceptez pas ces termes, veuillez ne pas utiliser l'application.

		**Utilisation de l'Application**
		L'application est destinée à un usage personnel uniquement. L'utilisateur s'engage à ne pas utiliser l'application à des fins illégales ou non autorisées. L'utilisateur s'engage également à ne pas interférer avec le fonctionnement normal de l'application.

		**Propriété Intellectuelle**
		Tous les contenus présents dans l'application, y compris les textes, images, logos et marques, sont la propriété de **Capsules** ou de ses licenciés. Il est interdit de copier, modifier, distribuer ou créer des œuvres dérivées des contenus sans le consentement écrit de **Capsules**.

		**Limitation de Responsabilité**
		L'application est fournie "en l'état" et "selon disponibilité". Nous ne garantissons pas que l'application sera exempte d'erreurs ou d'interruptions. **Capsules** ne sera pas responsable des dommages résultant de l'utilisation de l'application.

		**Modifications des Termes**
		Nous nous réservons le droit de modifier ces Termes à tout moment. Les modifications seront publiées dans l'application et l'utilisation continue de l'application constitue l'acceptation des nouveaux Termes.
			`,
	  privacyPolicy: `
		**Dernière mise à jour : Janvier 2025**

		**Introduction**
		La présente Politique de Confidentialité décrit comment nous collectons, utilisons et protégeons les données personnelles des utilisateurs de l'application **Capsules**.

		**Collecte des Données**
		Nous collectons des données personnelles fournies volontairement par l'utilisateur, telles que le nom et l'adresse e-mail, lors de l'inscription. En outre, nous collectons des données relatives à l'utilisation de l'application, telles que les préférences et les paramètres.

		**Utilisation des Données**
		Nous utilisons les données collectées pour fournir et améliorer les services offerts par l'application, pour communiquer avec l'utilisateur et pour garantir la sécurité de l'application.

		**Partage des Données**
		Nous ne partageons pas les données personnelles des utilisateurs avec des tiers, sauf lorsque cela est requis par la loi ou avec le consentement explicite de l'utilisateur.

		**Sécurité des Données**
		Nous adoptons des mesures de sécurité techniques et organisationnelles pour protéger les données personnelles des utilisateurs contre tout accès non autorisé, perte ou destruction.

		**Droits des Utilisateurs**
		Les utilisateurs ont le droit d'accéder à leurs données personnelles, de les corriger et de les supprimer. Pour exercer ces droits, veuillez nous contacter à l'adresse e-mail fournie dans l'application.

		**Modifications de la Politique de Confidentialité**
		Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. Les modifications seront publiées dans l'application et l'utilisation continue de l'application constitue l'acceptation de la nouvelle Politique de Confidentialité.
			`	  
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
