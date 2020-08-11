const dbConnection = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

dbConnection()
  .then(() => {
    require('./config/express');
    console.log('DB is connected...')
  })
  .catch((err) => console.error(err));
