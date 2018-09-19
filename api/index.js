const { Router } = require('express');

// Import configuration
const { createAsyncAuthMiddleware } = require('./config/auth.config');

// Import routes
const organizationRoute = require('./routes/organization.route');

// Create the basic express router
const router = new Router();

// Add the async authorization middleware
router.use(createAsyncAuthMiddleware);

// Routes
router.use('/organizations', organizationRoute);

module.exports = router;
