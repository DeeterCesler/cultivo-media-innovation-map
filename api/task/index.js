const cacheOrganizationsTask = require('./airtable.task')

// Create a runTasks function that handles caching the data from airtable
const runTasks = async () => {
  await cacheOrganizationsTask()

  console.info('Finished running tasks.')
};

module.exports = runTasks
