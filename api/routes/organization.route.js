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
    const organizations = await OrganizationModel.find({}).select('name duAffiliation location').exec();
    return res.status(200).send(organizations);
  } catch (err) {
    return res.status(err.status || 422).send(err);
  }
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
