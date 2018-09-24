const { Router } = require('express');

const handleError = require('../util/handleError');

const { UserModel } = require('../models/user.model');

const { comparePassword, generateJwtForUser } = require('../config/auth.config');

const router = new Router();

/**
 * POST /auth
 *
 * Main authentication route. Handles the way we authenticate a user when they make a POST request
 *  to sign into their account.
 */
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return handleError(res)({
      status: 422,
      message: 'Valid input parameters are not supplied to route POST /auth',
    });
  }

  // Find a user that has the same username as the provided username
  let user;
  try {
    user = await UserModel.findOne({ username }).exec();
  } catch (e) {
    return handleError(res)(e);
  }

  // Validate and ensure that we have a proper password for the user
  const validPassword = await comparePassword(password, user.passwordHash);

  if (!validPassword) {
    return handleError(res)({
      status: 403,
      message: 'Request to POST /auth is not properly authorized',
    });
  }

  // Generate the proper authorization token for the user
  const token = await generateJwtForUser(user._id);

  return res.send({
    token,
  });
});

module.exports = router;
