require('dotenv').config();
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');

// Require the API routes
const api = require('./api');

// Require/configure the db
require('./api/config/db.config');

// Configure the next.js server
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: './frontend',
});
const handle = app.getRequestHandler();

// Require tasks (just the airtable migration task)
const tasks = require('./api/task');

// Require env files
require('dotenv').config({ path: '.env' }) //eslint-disable-line

// Startup task
const startup = async () => {
  await app.prepare();

  // Create a new server
  const server = express();

  // Allow json requests and use /api for the api
  server.use(bodyParser.json());
  server.use('/api', api);

  // Handle other requests using next
  server.get('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 4006;

  // Listen on the port and start the app
  server.listen(PORT, async () => {
    // Ensure we run tasks when the application starts
    await tasks();
    console.info(`cultivo-media-innovation-map listening on ${PORT}`);

    // Schedule the job to run that the top of the hour, every hour
    schedule.scheduleJob('0 * * * *', () => {
      tasks();
    });
  });
};

startup();
