import { MongoClient } from 'mongodb';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed

const uri = process.env.DATABASE_URL; // Your MongoDB connection string
const client = new MongoClient(uri);

async function listenForChanges() {
  await client.connect();
  const database = client.db('YOUR_DATABASE_NAME'); // Replace with your database name
  const collection = database.collection('YOUR_COLLECTION_NAME'); // Replace with your collection name

  const changeStream = collection.watch();

  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const newDocument = change.fullDocument;

      if (!newDocument.misconductType) { // Check if misconduct type is empty
        const response = await fetch("YOUR_AZURE_FUNCTION_URL", { // Call Azure Function
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDocument),
        });
        const result = await response.json();

        // Optionally, update the document in MongoDB with the new misconduct type
        await collection.updateOne(
          { _id: newDocument._id },
          { $set: { misconductType: result.misconductType } }
        );
      }
    }
  });
}

listenForChanges().catch(console.error);