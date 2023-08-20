const dbSettings = require('./settings');

async function getAllValues() {
    return {
        'characters': await findFromType(
            dbSettings.client, 
            dbSettings.databaseName, 
            dbSettings.databaseCollection, 
            5, 
            'character'
        ),
        'actions': await findFromType(
            dbSettings.client, 
            dbSettings.databaseName, 
            dbSettings.databaseCollection, 
            5, 
            'action'
        ),
        'things': await findFromType(
            dbSettings.client,
            dbSettings.databaseName, 
            dbSettings.databaseCollection, 
            5, 
            'thing'
        )
    }
}


async function findFromType(client, databaseName, databaseCollection, resultsLimit, type) {
    const cursor = client
        .db(databaseName)
        .collection(databaseCollection)
        .find({ type })
        .limit(resultsLimit);

    return await cursor.toArray();
}

module.exports = { getAllValues };