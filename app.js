require('dotenv').config({path: __dirname + '/.env'});

const dbSettings = require('./database/settings');

(async () => {

    let { characters, actions, things } = await dbSettings.main().catch(console.error);

    printDocumentsArrayInfo(characters);
    printDocumentsArrayInfo(actions);
    printDocumentsArrayInfo(things);

})();

function printDocumentsArrayInfo (documentArray) {
    documentArray.forEach(
        (element, idx) => {
            console.log(`${idx + 1}.`);
            console.log(`    Name: ${element.body.name}`);
            console.log(`    Id: ${element._id}\n`);
        }
    );
}
