const { Router } = require('express');

// Models
const { OrganizationModel } = require('../models/organization.model');

// Auth
const { hasOrganizationAccess } = require('../config/auth.config');

// Util
const handleError = require('../util/handleError');

const router = new Router();

/**
 * GET /api/organizations
 *
 * Fetches all organizations.
 */
router.get('/', async (req, res) => {
  try {
    const organizations = await OrganizationModel
      .find({})
      .select('name duAffiliation location innovationCategory')
      .sort('name')
      .exec();
    return res.status(200).send(organizations);
  } catch (err) {
    return res.status(err.status || 422).send(err);
  }
});

/**
 * GET /api/organizations/categories
 *
 * Finds all different types categories (affiliations with DU) that are unique.
 */
router.get('/categories', async (req, res) => {
  const unfilteredCategories = await OrganizationModel.find({}).select('innovationCategory').exec();
  // Merge the arrays together
  const mergedCategories = unfilteredCategories
    // Move to just an array of arrays
    .map(m => m.innovationCategory)
    // Ensure that each one is a non-empty string
    .filter(String)
    // Sort them all alphabetically
    .sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
  // Ensure there are no duplicates by creating a set then creating an array
  const uniqueCategories = [...new Set(mergedCategories)];
  // Return with the result
  return res.send(uniqueCategories);
});

/**
 * GET /api/organizations/:id
 *
 * Finds a single organization that has an _id that matches req.params.id.
 */
router.get('/:id', async (req, res) => {
  try {
    const organization = await OrganizationModel.findOne({ _id: req.params.id }).exec();
    return res.status(200).send(organization);
  } catch (err) {
    return res.status(err.status || 422).send(err);
  }
});

/**
 * POST /api/organizations/:id
 *
 * Updates a single organization that has an _id that matches req.params.id;
 */
router.post('/:id', hasOrganizationAccess, async (req, res) => {
  // Validate body input
  const { body } = req;
  if (!body) {
    return handleError(res)({
      status: 422,
      message: 'Malformed body object supplied to POST /api/organizations/:id',
    });
  }

  // Update the organization
  let organization;
  try {
    organization = await OrganizationModel
      .findByIdAndUpdate({ _id: req.params.id }, body, { new: true })
      .exec();
  } catch (err) {
    return handleError(res)(err);
  }

  // Respond with the updated organization
  return res.send(organization);
});

module.exports = router;
