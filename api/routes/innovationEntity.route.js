const { Router } = require('express');

const { InnovationEntityModel } = require('../models/innovationEntity.model');

const router = new Router();

router.get('/', async (req, res) => {
  const innovationEntities = await InnovationEntityModel.find({});

  return res.send(innovationEntities);
});

module.exports = router;
