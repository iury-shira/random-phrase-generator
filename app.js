require('dotenv').config({path: __dirname + '/.env'});

const dbSettings = require('./database/settings');

dbSettings.run().catch(console.dir);
