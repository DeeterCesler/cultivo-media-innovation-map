const { Router } = require('express');

const organizationRoute = require('./routes/organization.route');

const router = new Router();

// Routes
router.get('/', (req, res) => res.send('api endpoint'));

router.use('/organizations', organizationRoute);

module.exports = router;
