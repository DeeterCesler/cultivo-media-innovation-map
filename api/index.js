const { Router } = require('express');

// Import configuration
const { attachAuthContextMiddleware } = require('./config/auth.config');

// Import routes
const organizationRoute = require('./routes/organization.route');
const authRoute = require('./routes/auth.route');

// Create the basic express router
const router = new Router();

// Add the async authorization middleware
router.use(attachAuthContextMiddleware);

// Routes
router.use('/organizations', organizationRoute);
router.use('/auth', authRoute);

module.exports = router;
