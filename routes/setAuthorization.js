const { setAuthLevel } = require("../integration/dbHandler");
const { findUserByEmail } = require("../integration/dbHandler");

/**
 * @param  {string} email
 * @param  {int} int desired authorization level
 *
 * @return {Promise}
 */
exports.setAuthorization = (authLevel, email) => {
  if (email === "" || (authLevel !== 0 && authLevel !== 1))
    return new Promise((resolve, reject) => {
      resolve({ message: "all fields required" });
    });
  else {
    return findUserByEmail(email)
      .then((user) => {
        setAuthLevel(user, authLevel);
        return {
          token: { email: email, authLevel: user.authorization },
          message: "User updated",
        };
      })
      .catch((error) => {
        console.log("Problem communicating with database");
        console.log(error);
        return {
          token: false,
          message: "Some error occurred on the backend while registering",
        };
      });
  }
};
