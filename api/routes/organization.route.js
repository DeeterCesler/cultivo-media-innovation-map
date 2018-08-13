const { Router } = require('express')

const { OrganizationModel } = require('../models/organization.model')

const router = new Router()

router.get('/', async (req, res) => {
  try {
    const organizations = await OrganizationModel.find({}).exec()
    return res.status(200).send(organizations)
  } catch (err) {
    return res.status(err.status || 422).send(err)
  }
})

module.exports = router
