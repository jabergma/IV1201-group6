const { findUserByEmail } = require("../integration/dbHandler");
const { hashMatch } = require("../tools/hash");

/**
 * @param  {string} email
 * @param  {string} password
 * @param  {string} session
 *
 * @return {Promise} Promise to login, returning resulted token-message object
 */
exports.login = (email, password, session) => {
  if (email && password) {
    return findUserByEmail(email)
      .then((user) => {
        if (user) {
          return hashMatch(password, user.password).then((result) => {
            if (result) {
              session.loggedIn = true;
              session.email = email;
              return {
                status: 200,
                body: {
                  token: { email: email, authLevel: user.authorization },
                  message: "Logged in",
                },
              };
            } else {
              return {
                status: 401,
                body: { token: false, message: "Incorrect password" },
              };
            }
          });
        } else {
          return {
            status: 401,
            body: {
              token: false,
              message: "There is no account associated with that email",
            },
          };
        }
      })
      .catch((error) => {
        console.log("Problem communicating with database");
        console.log(error);
        return {
          status: 500,
          body: {
            token: false,
            message:
              "Error: Unable to connect to database, please try again later",
          },
        };
      });
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        status: 400,
        body: { token: false, message: "Please enter email and password" },
      });
    });
  }
};
