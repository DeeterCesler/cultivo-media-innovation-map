/**
 * handleError()
 *
 * helper function
 *
 * Allows us to quickly wrap and properly handle errors within the backend API.
 *s
 * @param {Express Response} res -
 */
const handleError = res => error =>
  res.status(error.status || 400).send({
    status: error.status || 400,
    message: error.message || 'Unknown error',
  });

module.exports = handleError;
