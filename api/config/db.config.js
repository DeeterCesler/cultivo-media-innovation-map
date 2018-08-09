const mongoose = require('mongoose');

// Set the DB_NAME (the db we will connect to)
const DB_NAME = 'cultivo-media-innovation-map';

const connectionUrl = `mongodb://localhost:27017/${DB_NAME}`;

// Configure a new connection
const connection = mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
});

module.exports = {
  connection,
};
