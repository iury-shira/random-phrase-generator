require('dotenv').config({path: __dirname + '/.env'});

const dbSettings = require('./database/settings');

dbSettings.main().catch(console.error);