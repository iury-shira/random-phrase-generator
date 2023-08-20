require('dotenv').config({path: __dirname + '/.env'});

const db = require('./database/settings');
const prompt = require('prompt-sync')({sigint: true});

let selectedOption = 0;

function main () {
    console.log("\nWelcome to the random phrase generator app v1.0!\n");
    clearScreen();
    mainMenu();
}

async function mainMenu() {

    const options = [1, 2, 3];

    while (options.indexOf(selectedOption) === -1) {
        console.log();
        console.log("1 - Generate random phrase");
        console.log("2 - Display possible values");
        console.log("3 - Exit");
        console.log();
        selectedOption = prompt("Please select one of the above options (enter the relative number option): ");
        selectedOption = Number(selectedOption);
    }

    switch (selectedOption) {
        case 1:
            await generateRandomPhrase();
            selectedOption = 0;
            clearScreen();
            mainMenu();
            break;
        case 2:
            await printPossibleValues();
            selectedOption = 0;
            clearScreen();
            mainMenu();
            break;
        case 3:
            console.log("\nThank you for using the Random Generator Phrase App!");
            clearScreen();
            break;
        default:
            console.log("\nSorry... some internal error occurred!");
            clearScreen();
    }
}

async function generateRandomPhrase () {
    let { characters, actions, things } = await db.main().catch(console.error);
    let character = gatRandomObjectFromDocumentsArray(characters);
    let action = gatRandomObjectFromDocumentsArray(actions);
    let thing = gatRandomObjectFromDocumentsArray(things);
    console.log("\nOur random phrase is: \n");
    console.log(`${character.body.name} ${action.body.name} ${thing.body.name}\n`);
}

async function printPossibleValues () {
    let { characters, actions, things } = await db.main().catch(console.error);
    printDocumentsArrayInfo(characters);
    printDocumentsArrayInfo(actions);
    printDocumentsArrayInfo(things);
}

function printDocumentsArrayInfo (documentArray) {
    console.log(`\nDocument type ${documentArray[0].type}\n`)
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

function clearScreen() {
    prompt("\nPress ENTER to continue...");
    console.clear();
}

main();
