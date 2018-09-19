const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  /**
   * username
   *
   * string
   *
   * The email of the user that has an account that can be used to edit organizations.
   */
  username: {
    type: String,
    required: true,
  },

  /**
   * passwordHash
   *
   * string
   *
   * A string representing a hashed version of the password of a user.
   */
  passwordHash: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
