require('dotenv').config({path: __dirname + '/.env'});

const dbSettings = require('./database/settings');

(async () => {

    let { characters, actions, things } = await dbSettings.main().catch(console.error);
    let character = gatRandomObjectFromDocumentsArray(characters);
    let action = gatRandomObjectFromDocumentsArray(actions);
    let thing = gatRandomObjectFromDocumentsArray(things);

    // printDocumentsArrayInfo(characters);
    // printDocumentsArrayInfo(actions);
    // printDocumentsArrayInfo(things);

    console.log("Our random phrase is: \n");

    console.log(`${character.body.name} ${action.body.name} ${thing.body.name}\n`);

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

function gatRandomObjectFromDocumentsArray (documentArray) {
    return documentArray[(Math.floor(Math.random() * documentArray.length))];
}
