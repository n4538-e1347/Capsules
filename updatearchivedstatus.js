const { MongoClient } = require('mongodb');

async function updateArchivedStatus() {
  const uri = 'mongodb+srv://corradosinigoi:h2H3ZwUxDCKe98Yf@cluster0.6yvqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Sostituisci con il tuo URI di connessione
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('test'); // Sostituisci con il nome del tuo database
    const collection = database.collection('messages'); // Sostituisci con il nome della tua collection

    const filter = { archived: true }; // Trova tutti i documenti con archived: true
    const documents = await collection.find(filter).toArray();
    console.log('Documenti filtrati:', documents);

    const updateDoc = {
      $set: {
        archived: false, // Imposta archived a false
      },
    };

    const result = await collection.updateMany(filter, updateDoc);

    console.log(`${result.modifiedCount} documenti sono stati aggiornati.`);
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dei documenti:', error);
  } finally {
    await client.close();
  }
}

updateArchivedStatus();
