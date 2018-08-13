const { Router } = require('express');

const { OrganizationModel } = require('../models/organization.model');

const router = new Router();

/**
 * GET /api/organizations
 *
 * Fetches all organizations.
 */
router.get('/', async (req, res) => {
  try {
    const organizations = await OrganizationModel.find({}).select('name duAffiliation').exec();
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

module.exports = router;
