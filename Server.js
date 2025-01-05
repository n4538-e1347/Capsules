const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const app = express();
const trimString = (str) => str.trim();
//const Schema = mongoose.Schema;
const Schema = mongoose.Schema;

const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextFsBackend = require('i18next-fs-backend');


i18next
  .use(i18nextFsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'it', 'de', 'es', 'fr'],
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/translation.json'
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie']
    }
  });

app.use(i18nextMiddleware.handle(i18next));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // Aggiungi questa linea per gestire i dati urlencoded

// Connessione a MongoDB Atlas
mongoose.connect('mongodb+srv://corradosinigoi:h2H3ZwUxDCKe98Yf@cluster0.6yvqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Schema per le richieste di amicizia
const friendRequestSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    message: { type: String, maxlength: 100 }
});

// Schema utente aggiornato con il campo lingua
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [friendRequestSchema],
    sentRequests: [friendRequestSchema],
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    language: { type: String, default: 'en' }, // Campo lingua con valore di default
	premium: { type: Boolean, default: false } // Campo premium con valore di default false
});
const User = mongoose.model('User', userSchema);
// Esportazione del modello utente
module.exports = User;


// Schema Messaggio
const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false } // Aggiungi il campo archived
});
const Message = mongoose.model('Message', messageSchema);


// Script per aggiungere un campo agli utenti esistenti
const addPremiumField = async () => {
  try {
    await User.updateMany({}, { $set: { premium: false } }); // Aggiungi il campo premium con valore predefinito false
    console.log('Campo premium aggiunto con successo agli utenti esistenti.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Errore nell\'aggiornamento degli utenti:', error);
  }
};
// Chiamare la funzione per aggiornare gli utenti esistenti
//addPremiumField();

// Rotta di Prova per la Radice
app.get('/', (req, res) => {
    res.send(req.t('welcome'));
});

// API di Registrazione
app.post('/register', async (req, res) => {
    let { username, password, email } = req.body;
    
    // Pulire le stringhe
    username = trimString(username);
    password = trimString(password);
    email = trimString(email);

    try {
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send(req.t('usernameTaken'));
        }
        if (existingEmail) {
            return res.status(400).send(req.t('emailTaken'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();
        res.status(201).send(req.t('registrationSuccess'));
    } catch (error) {
        console.error('Errore nella registrazione:', error.message);
        res.status(500).send(`Errore nella registrazione: ${error.message}`);
    }
});

// API di Login
app.post('/login', async (req, res) => {
    let { username, password } = req.body;

    // Pulire le stringhe
    username = trimString(username);
    password = trimString(password);

    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            // Restituisci i dati utente completi al client
            res.status(200).json({
                username: user.username,
                email: user.email,
                language: user.language
            });
        } else {
            res.status(400).send(req.t('loginError'));
        }
    } catch (error) {
        console.error('Errore nel login:', error.message);
        res.status(500).send(`Errore nel login: ${error.message}`);
    }
});

// API per Richiedere il Reset della Password
app.post('/requestPasswordReset', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send(req.t('userNotFound'));
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 ora
        await user.save();

        // Configura nodemailer per inviare email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'capsules.cs@gmail.com',
                pass: 'ogtw ofka smvr zuab'
            }
        });

        const mailOptions = {
            to: user.email,
            from: 'passwordreset@demo.com',
            subject: req.t('resetPasswordSubject'),
            text: `${req.t('resetPasswordText')} \n\n
                   http://${req.headers.host}/reset/${token} \n\n`
        };

        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.error('Errore durante l\'invio dell\'email:', error);
                res.status(500).send(req.t('emailError'));
            } else {
                res.status(200).send(req.t('emailSent'));
            }
        });
    } catch (error) {
        res.status(500).send(req.t('resetPasswordRequestError'));
    }
});

// API per Reset della Password
app.post('/resetPassword', async (req, res) => {
    let { token, newPassword } = req.body;

    // Pulire le stringhe
    token = trimString(token);
    newPassword = trimString(newPassword);

    console.log(`Received token: ${token}`);
    console.log(`Received newPassword: ${newPassword}`);
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            console.error('Token non valido o scaduto');
            return res.status(400).json({ error: req.t('invalidToken') });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: req.t('passwordResetSuccess') });
    } catch (error) {
        console.error('Errore nel reset della password:', error.message);
        res.status(500).json({ error: req.t('passwordResetError') });
    }
});

// API per l'Invio dei Messaggi
app.post('/sendMessage', async (req, res) => {
    const { sender, receiver, message } = req.body;
    try {
        const user = await User.findOne({ username: sender }).populate('friends');
        const friend = user.friends.find(friend => friend.username === receiver);
        if (friend) {
            const newMessage = new Message({ sender, receiver, message });
            await newMessage.save();
            res.status(201).send(req.t('messageSent'));
        } else {
            res.status(403).send(req.t('notAFriend'));
        }
    } catch (error) {
        console.error(`Errore nell'invio del messaggio: ${error.message}`);
        res.status(500).send(req.t('sendMessageError'));
    }
});

// API per Inviare Richieste di Amicizia
app.post('/sendFriendRequest', async (req, res) => {
    const { username, friendUsername, message } = req.body;
    if (username === friendUsername) {
        return res.status(400).send(req.t('selfFriendRequest'));
    }
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });
        if (!user) {
            return res.status(404).send(req.t('userNotFound'));
        }
        if (!friend) {
            return res.status(404).send(req.t('friendNotFound'));
        }

        // Verifica se uno dei due utenti ha bloccato l'altro
        if (user.blockedUsers.includes(friend._id) || friend.blockedUsers.includes(user._id)) {
            return res.status(404).send(req.t('userNotFound'));
        }

        // Verifica se esiste già una richiesta pendente in entrambe le direzioni
        const existingFriendRequest = friend.friendRequests.some(req => req.userId.equals(user._id));
        const existingSentRequest = user.sentRequests.some(req => req.userId.equals(friend._id));
        const reverseFriendRequest = user.friendRequests.some(req => req.userId.equals(friend._id));
        const reverseSentRequest = friend.sentRequests.some(req => req.userId.equals(user._id));

        if (existingFriendRequest || existingSentRequest || reverseFriendRequest || reverseSentRequest) {
            return res.status(400).send(req.t('pendingRequest'));
        }

        // Verifica se sono già amici
        if (user.friends.includes(friend._id)) {
            return res.status(400).send(req.t('alreadyFriends'));
        }

        const request = { userId: user._id, username: user.username, message };
        friend.friendRequests.push(request);
        user.sentRequests.push({ userId: friend._id, username: friend.username, message });
        await friend.save();
        await user.save();

        res.status(200).send(req.t('friendRequestSent'));
    } catch (error) {
        console.error(`Errore nell'invio della richiesta di amicizia: ${error.message}`);
        res.status(500).send(req.t('sendFriendRequestError'));
    }
});
// API per Confermare Richieste di Amicizia
app.post('/confirmFriendRequest', async (req, res) => {
    const { username, friendUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });

        if (user && friend) {
            // Verifica se esiste una richiesta di amicizia da parte di `friend`
            const friendRequest = user.friendRequests.find(req => req.userId.equals(friend._id));
            if (!friendRequest) {
                return res.status(400).send('No friend request found');
            }

            // Rimuovi la richiesta di amicizia reciproca (se esiste)
            user.friendRequests = user.friendRequests.filter(req => !req.userId.equals(friend._id));
            friend.friendRequests = friend.friendRequests.filter(req => !req.userId.equals(user._id));

            // Rimuovi le richieste di amicizia inviate
            user.sentRequests = user.sentRequests.filter(req => !req.userId.equals(friend._id));
            friend.sentRequests = friend.sentRequests.filter(req => !req.userId.equals(user._id));

            // Aggiungi l'amico
            user.friends.push(friend._id);
            friend.friends.push(user._id);

            await user.save();
            await friend.save();

            res.status(200).send('Friend request confirmed and mutual requests removed');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error confirming friend request: ${error.message}`);
        res.status(500).send(`Error confirming friend request: ${error.message}`);
    }
});

// API per Rifiutare Richieste di Amicizia
app.post('/rejectFriendRequest', async (req, res) => {
    const { username, friendUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });
        if (user && friend) {
            const request = user.friendRequests.find(req => req.userId.toString() === friend._id.toString());
            if (!request) {
                return res.status(400).send('No friend request found');
            }

            user.friendRequests = user.friendRequests.filter(req => req.userId.toString() !== friend._id.toString());
            friend.sentRequests = friend.sentRequests.filter(req => req.userId.toString() !== user._id.toString());

            // Rimuove eventuali richieste inviate
            user.sentRequests = user.sentRequests.filter(req => req.userId.toString() !== friend._id.toString());
            friend.friendRequests = friend.friendRequests.filter(req => req.userId.toString() !== user._id.toString());

            await user.save();
            await friend.save();

            res.status(200).send('Friend request rejected');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error rejecting friend request: ${error.message}`);
        res.status(500).send(`Error rejecting friend request: ${error.message}`);
    }
});

// API per Rifiutare e Bloccare Richieste di Amicizia
app.post('/rejectAndBlockFriendRequest', async (req, res) => {
    const { username, friendUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });
        if (user && friend) {
            const request = user.friendRequests.find(req => req.userId.toString() === friend._id.toString());
            if (!request) {
                return res.status(400).send('No friend request found');
            }

            user.friendRequests = user.friendRequests.filter(req => req.userId.toString() !== friend._id.toString());
            friend.sentRequests = friend.sentRequests.filter(req => req.userId.toString() !== user._id.toString());

            // Rimuove eventuali richieste inviate
            user.sentRequests = user.sentRequests.filter(req => req.userId.toString() !== friend._id.toString());
            friend.friendRequests = friend.friendRequests.filter(req => req.userId.toString() !== user._id.toString());

            user.blockedUsers.push(friend._id);
            await user.save();
            await friend.save();

            res.status(200).send('Friend request rejected and user blocked');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error rejecting and blocking friend request: ${error.message}`);
        res.status(500).send(`Error rejecting and blocking friend request: ${error.message}`);
    }
});

// API per Ritirare Richieste di Amicizia
app.post('/withdrawFriendRequest', async (req, res) => {
    const { username, friendUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });
        if (user && friend) {
            const requestIndex = user.sentRequests.findIndex(req => req.userId.toString() === friend._id.toString());
            if (requestIndex === -1) {
                return res.status(400).send('No friend request found');
            }

            user.sentRequests.splice(requestIndex, 1);
            friend.friendRequests = friend.friendRequests.filter(req => req.userId.toString() !== user._id.toString());
            await user.save();
            await friend.save();

            res.status(200).send('Friend request withdrawn');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error withdrawing friend request: ${error.message}`);
        res.status(500).send(`Error withdrawing friend request: ${error.message}`);
    }
});

// API per Rimuovere un Amico
app.post('/removeFriend', async (req, res) => {
    const { username, friendUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });
        if (user && friend) {
            // Rimuovi l'amico dalla lista degli amici dell'utente
            user.friends = user.friends.filter(friendId => friendId.toString() !== friend._id.toString());
            // Rimuovi l'utente dalla lista degli amici dell'amico
            friend.friends = friend.friends.filter(friendId => friendId.toString() !== user._id.toString());

            // Rimuovi eventuali richieste di amicizia in sospeso tra i due utenti
            user.friendRequests = user.friendRequests.filter(req => !req.userId.equals(friend._id));
            friend.friendRequests = friend.friendRequests.filter(req => !req.userId.equals(user._id));

            // Rimuovi le richieste di amicizia inviate
            user.sentRequests = user.sentRequests.filter(req => !req.userId.equals(friend._id));
            friend.sentRequests = friend.sentRequests.filter(req => !req.userId.equals(user._id));

            await user.save();
            await friend.save();

            res.status(200).send('Friend removed successfully and pending friend requests deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error removing friend: ${error.message}`);
        res.status(500).send(`Error removing friend: ${error.message}`);
    }
});

// API per Bloccare Contatti
app.post('/blockUser', async (req, res) => {
    const { username, blockUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const blockUser = await User.findOne({ username: blockUsername });
        if (!user || !blockUser) {
            return res.status(404).send('User not found');
        }

        if (!user.blockedUsers.includes(blockUser._id)) {
            user.blockedUsers.push(blockUser._id);
        }

        await user.save();
        res.status(200).send('User successfully blocked');
    } catch (error) {
        console.error(`Error blocking user: ${error.message}`);
        res.status(500).send(`Error blocking user: ${error.message}`);
    }
});

// API per Rimuovere e Bloccare Contatti
app.post('/removeAndBlockFriend', async (req, res) => {
    const { username, friendUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });
        if (user && friend) {
            user.friends = user.friends.filter(friendId => friendId.toString() !== friend._id.toString());
            friend.friends = friend.friends.filter(friendId => friendId.toString() !== user._id.toString());

            user.blockedUsers.push(friend._id);

            await user.save();
            await friend.save();

            res.status(200).send('Friend successfully removed and blocked');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error removing and blocking friend: ${error.message}`);
        res.status(500).send(`Error removing and blocking friend: ${error.message}`);
    }
});

// API per Sbloccare Contatti
app.post('/unblockUser', async (req, res) => {
    const { username, unblockUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const unblockUser = await User.findOne({ username: unblockUsername });
        if (!user || !unblockUser) {
            return res.status(404).send('User not found');
        }

        user.blockedUsers = user.blockedUsers.filter(blockedId => blockedId.toString() !== unblockUser._id.toString());

        await user.save();
        res.status(200).send('User successfully unblocked');
    } catch (error) {
        console.error(`Error unblocking user: ${error.message}`);
        res.status(500).send(`Error unblocking user: ${error.message}`);
    }
});

// API per Rimuovere l'Account
app.post('/deleteAccount', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            // Rimuovi l'utente dalla lista degli amici di altri utenti
            await User.updateMany(
                { friends: user._id },
                { $pull: { friends: user._id } }
            );

            // Rimuovi le richieste di amicizia inviate dall'utente
            await User.updateMany(
                { 'friendRequests.userId': user._id },
                { $pull: { friendRequests: { userId: user._id } } }
            );

            // Rimuovi le richieste di amicizia ricevute dall'utente
            await User.updateMany(
                { 'sentRequests.userId': user._id },
                { $pull: { sentRequests: { userId: user._id } } }
            );

            // Rimuovi l'utente dalla lista degli utenti bloccati di altri utenti
            await User.updateMany(
                { blockedUsers: user._id },
                { $pull: { blockedUsers: user._id } }
            );

            // Rimuovi tutti i messaggi inviati dall'utente
            await Message.deleteMany({ sender: user._id });

            // Elimina l'account dell'utente
            await User.deleteOne({ _id: user._id });

            res.status(200).send('Account successfully deleted and all related data removed');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(`Error deleting account: ${error.message}`);
        res.status(500).send(`Error deleting account: ${error.message}`);
    }
});

// API per Archiviare i Messaggi
app.post('/archiveMessage', async (req, res) => {
    const { messageId } = req.body;
    try {
        await Message.findByIdAndUpdate(messageId, { archived: true });
        res.status(200).send('Message archived');
    } catch (error) {
        res.status(500).send('Error archiving message');
    }
});

// API per Aggiornare la Lingua
app.post('/updateLanguage', async (req, res) => {
  const { username, language } = req.body;
  try {
    await User.findOneAndUpdate({ username }, { language });
    res.status(200).send('Language successfully updated');
  } catch (error) {
    res.status(500).send('Error updating language');
  }
});

// API per Visualizzare le Richieste di Amicizia
app.get('/friendRequests/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).populate('friendRequests.userId');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user.friendRequests);
    } catch (error) {
        console.error(`Error retrieving friend requests: ${error.message}`);
        res.status(500).send(`Error retrieving friend requests: ${error.message}`);
    }
});

// API per Ricevere le Richieste di Amicizia
app.get('/sentFriendRequests/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const sentRequests = user.sentRequests.map(request => ({
            username: request.username,
            message: request.message,
            _id: request.userId.toString(),
        }));
        res.status(200).json(sentRequests);
    } catch (error) {
        console.error(`Error retrieving sent friend requests: ${error.message}`);
        res.status(500).send(`Error retrieving sent friend requests: ${error.message}`);
    }
});
// API per Visualizzare la Lista dei Contatti
app.get('/contacts/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).populate('friends');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user.friends);
    } catch (error) {
        console.error(`Error retrieving contacts: ${error.message}`);
        res.status(500).send(`Error retrieving contacts: ${error.message}`);
    }
});

// API per la Ricezione dei Messaggi
app.get('/messages/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const messages = await Message.find({ receiver: username });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send('Error retrieving messages');
    }
});

// Rotta per Servire la Pagina di Reset della Password
app.get('/reset/:token', (req, res) => {
    const token = req.params.token;
    const lang = req.query.lang || 'en'; // Imposta 'en' come lingua di default

    fs.readFile(path.join(__dirname, 'reset.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading reset page');
        } else {
            const page = data.replace('<%= token %>', token).replace('<%= lang %>', lang);
            console.log(`Sending page with token: ${token} and lang: ${lang}`);  // Logging del token e della lingua
            res.send(page);
        }
    });
});

app.get('/blockedUsers/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).populate('blockedUsers');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user.blockedUsers);
    } catch (error) {
        console.error(`Error retrieving blocked users: ${error.message}`);
        res.status(500).send(`Error retrieving blocked users: ${error.message}`);
    }
});

// Avvio del Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
