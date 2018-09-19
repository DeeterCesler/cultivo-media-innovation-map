const cacheOrganizationsTask = require('./airtable.task');
const generateDefaultUserTask = require('./user.task');

// Create a runTasks function that handles caching the data from airtable
const runTasks = async () => {
  await cacheOrganizationsTask();
  await generateDefaultUserTask();

  console.info('Finished running tasks.');
};

module.exports = runTasks;
