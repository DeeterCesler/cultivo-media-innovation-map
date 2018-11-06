const Airtable = require('airtable');

const { OrganizationModel } = require('../models/organization.model');

// Ensure that we have all proper API variables to connect to Airtable
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error(
    'Environment variable AIRTABLE_API_KEY is required to run cultivo-media-innovation-map',
  );
}
if (!process.env.AIRTABLE_BASE) {
  throw new Error(
    'Environment variable AIRTABLE_BASE is required to run cultivo-media-innovation-map',
  );
}
if (!process.env.AIRTABLE_TABLE) {
  throw new Error(
    'Environment variable AIRTABLE_TABLE is required to run cultivo-media-innovation-map',
  );
}

const { AIRTABLE_API_KEY, AIRTABLE_BASE, AIRTABLE_TABLE } = process.env;

// Configure the Airtable "base" so we can connect to it
const base = new Airtable({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE);

/**
 * fetchDataFromAirtable()
 *
 * function
 *
 * The Airtable API connector that gives us access to connecting with Airtable.
 */
const fetchDataFromAirtable = () => new Promise((resolve, reject) => base(AIRTABLE_TABLE)
  .select({
    view: 'Grid view',
  })
  .firstPage((err, records) => {
    if (err) return reject(err);

    return resolve(records);
  }));

/**
 * mapImageFromRecord()
 *
 * function
 *
 * Maps the record properly (the image record) to a string, if the image exists, otherwise it
 *  returns null. This is valid, however, since images are not required on the organization model.
 *
 * @param {Object} imageData - Data used to map
 */
const mapImageFromRecord = (imageData) => {
  // If it exists, return the url, otherwise just return null
  if (imageData && imageData[0] && imageData[0].url) return imageData[0].url;

  return null;
};

/**
 * mapRecordFromAirtable()
 *
 * function
 *
 * Maps all data from Airtable to a format that can be used within our DB.
 *
 * @param {Object} record - An Airtable record used to get data
 */
const mapRecordFromAirtable = record => ({
  name: record.get('Entity') || '',
  pointOfContact: record.get('Main POC') || 'N/A',
  pointOfContactEmail: record.get('Email') || 'N/A',
  duAffiliation: record.get('DU Affiliation') || 'N/A',
  description: record.get('Details'),
  website: record.get('Website'),
  physicalLocation: record.get('Physical Location'),
  innovationDescription: record.get('Innovation Description') || 'N/A',
  location: {
    lat: record.get('Latitude'),
    lng: record.get('Longitude'),
  },
  innovationCategory: record.get('Category'),
  image: mapImageFromRecord(record.get('Background Image')),
});

/**
 * fetchAirtableTask()
 *
 * function
 *
 * Main task for pulling data from Airtable and then caching it to our database.
 */
const fetchAirtableTask = async () => {
  const records = await fetchDataFromAirtable();
  const mappedDataRecords = records.map(mapRecordFromAirtable);

  // Delete all existing organizations before we update them
  await OrganizationModel.remove().exec();

  // Create all new organizations
  await OrganizationModel.create(mappedDataRecords);

  console.info('Create new organizations.');
};

module.exports = fetchAirtableTask;
