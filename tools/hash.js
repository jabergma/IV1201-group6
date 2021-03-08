const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

/**
 * @param  {string} string
 *
 * @return {Promise} Promise to hash string with salt, returning the salted hashed string
 */
exports.hashString = (string) => {
  return bcrypt.hash(string, BCRYPT_SALT_ROUNDS);
};

/**
 * @param  {string} string
 * @param  {string} hashedString
 *
 * @return {Promise} Promise to see if input matches, returning the results of the comparison of the input strings
 */
exports.hashMatch = (string, hashedString) => {
  return bcrypt.compare(string, hashedString);
};
