const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserModel } = require('../models/user.model');

/**
 * SALT_ROUNDS
 *
 * @type {number}
 *
 * The number of times we want to ensure that the hash occurs for the password.
 */
const SALT_ROUNDS = 10;

/**
 * KEY
 *
 * @type {string}
 *
 * A key used when signing JWTs for the application.
 */
const KEY = 'dummy_key_to_change';

/**
 * TOKEN_COOKIE_NAME
 *
 * @type {string}
 *
 * A string representing the name of the cookie we request from the auth cookies.
 */
const TOKEN_COOKIE_NAME = 'cultivoMediaInnovationMap';

/**
 * hashPassword()
 *
 * function
 *
 * Hashes a password and returns either a hashed password or an error.
 *
 * @param {string} password - A password to hash.
 *
 * @returns {string} A hashed password.
 */
const hashPassword = async password => bcrypt.hash(password, SALT_ROUNDS);

/**
 * comparePassword()
 *
 * function
 *
 * Compares a password with a hash to see if the password matches when hasehd.
 *
 * @param {string} password
 * @param {string} hashedPassword
 *
 * @returns {boolean} A boolean of whether the password matches.
 */
const comparePassword = async (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

/**
 * generateJwtForBody()
 *
 * function
 *
 * Generates a JWT for a body using a KEY.
 *
 * @param {object} body - A body to generate a JWT for.
 *
 * @param {string} - A response string of the JWT.
 */
const generateJwtForBody = async body => jwt.sign(body, KEY);

/**
 * generateJwtForUser()
 *
 * function
 *
 * Generates a JWT for a user based off of a userId. This function then finds a user for that userId
 *  and generates a token based off of that user.
 *
 * @param {string} userId - A userId we use to generate a user for.
 */
const generateJwtForUser = async userId => generateJwtForBody({ user: userId });

/**
 * decodeToken()
 *
 * function
 *
 * Decodes a token param.
 *
 * @param {string} token - A token we use to decode inside the function.
 */
const decodeToken = async (token) => {
  if (typeof token !== 'string') throw new Error('decodetoken requires a string token to decode');
  const decoded = await jwt.verify(token, KEY);

  const user = await UserModel.findOne({ _id: decoded.user }).exec();

  if (!user) throw new Error('No user exists for the decoded id');

  return {
    userId: user._id //eslint-disable-line
  };
};

/**
 * createAsyncAuthMiddleware()
 *
 * pure function
 *
 * Returns a new express middleware based on whether or not the async authorizor allows
 *  authentication on the specified route.
 *
 * @param {Function} asyncAuthorizor - An asynchronous function that yields a boolean authentication
 *  value.
 *
 * @returns {Function} Express middleware that uses that async authorizor to check authentication.
 */
const createAsyncAuthMiddleware = async asyncAuthorizor => async (req, res, next) => {
  if (!req.authContext) {
    return res.status(401).send({
      message: 'Sorry, you must be logged in to perform that action.',
      status: 401,
    });
  }

  let result;

  try {
    result = await asyncAuthorizor(req);
  } catch (err) {
    console.error('error in async authorizer: ', err);
    return res.status(err.status || 500).send({
      message: 'Sorry, an error occured authenticating your request. Please contact support',
      status: err.status || 500,
    });
  }

  if (result === true) return next();
  if (result === false) {
    return res.status(403).send({
      message: 'Sorry, you are not currently authorized to perform that action.',
      status: 403,
    });
  }

  throw new TypeError(`invalid resolved value from asyncAuthorizer(); type must be a boolean; got: ${typeof result} ${result}`);
};

/**
 * attachAuthContextMiddleware()
 *
 * express middleware
 *
 * Calls a function to decode the JWT and attach the result to the authContext body.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @param {Function} next - express next middleware function
 */
const attachAuthContextMiddleware = async (req, res, next) => {
  if (!req.cookies) throw new Error('AuthMiddleware: missing req.cookies object');

  // Get the token from the cookie store
  const token = req.cookies[TOKEN_COOKIE_NAME];

  // If we're missing the auth token cookie, the user just isn't logged in; the authorizers are
  // responsible for handling this
  if ((typeof token !== 'string') || token === '') {
    req.authContext = null;
    return next();
  }

  let authContext;
  try {
    authContext = await decodeToken(token);
  } catch (err) {
    // If we got an error, log it and send it to the client.
    console.error(`AuthMiddleware: authentication error: ${err}`);
    return res.status(err.status || 500).send({
      message: err.message || 'unknown auth error',
      status: err.status || 500,
    });
  }

  // Attach the new authContext to the request object
  req.authContext = authContext;
  return next();
};

/**
 * hasOrganizationAccess()
 *
 * express middleware function
 *
 * Determines whether or not a user has access to read or write to a single organization.
 *
 * @param {string} idSource
 * @param {string} idName
 *
 * @returns {boolean} Whether or not the authentication passed.
 */
const hasOrganizationAccess = () =>
  createAsyncAuthMiddleware(async (req) => {
    // Find a user that has the same ID as the one in the authContext
    const currentUser = await UserModel.findOne({ _id: req.authContext.userId }).exec();

    // If the user exists (very basic, low-level auth) then they can access this
    if (currentUser && currentUser.email) return true;

    // Otherwise, return false immediately
    return false;
  });

module.exports = {
  hashPassword,
  comparePassword,
  generateJwtForUser,
  attachAuthContextMiddleware,
  hasOrganizationAccess,
};
