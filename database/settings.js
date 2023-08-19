const { MongoClient, ServerApiVersion } = require('mongodb');

const databasePassword = process.env['DATABASE_PWD'];
const databaseName = process.env['DATABASE_NAME'];
const databaseCollection = process.env['DATABASE_COLLECTION'];
const databaseCluster = process.env['DATABASE_CLUSTER'];
const uri = `mongodb+srv://admin:${databasePassword}@${databaseCluster}.syfkbqc.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        await testConnection(client, databaseName, 1);
        await findCharacters(client, databaseName, databaseCollection, 3);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function testConnection(client, databaseName, pingQuantity) {
    // Send a ping to confirm a successful connection
    await client.db(databaseName).command({ ping: pingQuantity });
    console.log("\nPinged your deployment. You successfully connected to MongoDB!\n");
}

async function findCharacters(client, databaseName, databaseCollection, resultsLimit) {
    const cursor = client
        .db(databaseName)
        .collection(databaseCollection)
        .find({ type: 'character' })
        .limit(resultsLimit);

    const results = await cursor.toArray();
    if (results.length) {
        console.log(`Found ${results.length} result(s): \n`);
        results.forEach( (element, idx) => {
            console.log(`${idx + 1}.`);
            console.log(`    Name: ${element.body.name}`);
            console.log(`    Anime: ${element.body.anime}`);
            console.log(`    Id: ${element._id}\n`);
        });
    } else {
        console.log(`Your ${databaseCollection} MongoDB collection doesn't have entries!`);
    }
}

module.exports = { main };