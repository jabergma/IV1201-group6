const { findUserByEmail, createUser } = require("../integration/dbHandler");
const { hashString } = require("../tools/hash");

/**
 * @param  {string} firstName
 * @param  {string} lastName
 * @param  {string} email
 * @param  {string} password
 *
 * @return {Promise} Promise to register user, returning resulted token-message object
 */
exports.registerUser = (firstName, lastName, email, password) => {
  if (firstName && lastName && email && password) {
    return findUserByEmail(email)
      .then((user) => {
        if (user)
          return {
            status: 401,
            body: { token: false, message: "Email already taken" },
          };
        return hashString(password).then((hashedPassword) => {
          return createUser(firstName, lastName, email, hashedPassword).then(
            (user) => {
              return {
                status: 200,
                body: {
                  token: { email: email, authLevel: user.authorization },
                  message: "User created",
                },
              };
            }
          );
        });
      })
      .catch((error) => {
        console.log("Problem communicating with database");
        console.log(error);
        return {
          status: 500,
          body: {
            token: false,
            message: "Some error occurred on the backend while registering",
          },
        };
      });
  }
  return new Promise((resolve, reject) => {
    resolve({
      status: 400,
      body: { token: false, message: "All fields required" },
    });
  });
};
