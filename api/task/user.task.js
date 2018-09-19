const { UserModel } = require('../models/user.model');

const { hashPassword } = require('../config/auth.config');

// Ensure that we have the deafult user's password
const { DEFAULT_USER_PASSWORD } = process.env;
if (!DEFAULT_USER_PASSWORD) throw new Error('DEFAULT_USER_PASSWORD is required in the environment');

/**
 * generateDefaultUserTask()
 *
 * function
 *
 * Generates a default user using the provided DEFAULT_USER_PASSWORD from the environmental
 *  variables.
 */
const generateDefaultUserTask = async () => {
  const hashedPassword = await hashPassword(DEFAULT_USER_PASSWORD);
  // Basic user config
  const defaultUser = {
    username: 'admin',
    passwordHash: hashedPassword,
  };

  // Create the user and save it
  const user = new UserModel(defaultUser);
  await user.save();

  console.info('Successfully created a default user');
};

module.exports = generateDefaultUserTask;
