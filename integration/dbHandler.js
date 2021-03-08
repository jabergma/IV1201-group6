const db = require("./sequelize");
// testing:
//const new_db_users = require("../models/database1/users");
//const old_db_users = require("../models/database2/users");
const db1 = db.Database1.models;
const db2 = db.Database2.models;

/**
 * @return {Promise} Promise to start sequelize returning the started service
 */
exports.dbInitDatabase1 = () => {
  return db.Database1.sync();
};

/**
 * @return {Promise} Promise to start sequelize returning the started service
 */
exports.dbInitDatabase2 = () => {
  return db.Database2.sync();
};

/**
 * @param  {string} email
 *
 * @return {Promise} Promise to find user, returning found user
 */
exports.findUserByEmail = (email) => {
  return db1.users.findOne({
    where: {
      email: email,
    },
  });
};

/**
 *
 * @return {Promise} Promise to find persons, returning found persons
 */
exports.findAllPersons = () => {
  return db2.Person.findAll({
    attributes: ["name", "surname", "email", "password"],
  });
};

/**
 * @param  {string} email
 * @param  {string} password
 *
 * @return {Promise} Promise to find user, returning found user
 */
exports.findUserByEmailAndPasswordDB1 = (email, password) => {
  return db1.users.findOne({
    where: {
      email: email,
      password: password,
    },
    attributes: ["email", "password"],
  });
};

/**
 * @param  {string} firstName
 * @param  {string} lastName
 * @param  {string} email
 * @param  {string} password
 *
 * @return {Promise} Promise to creating the user in the database, returns the changes made
 */
exports.createUser = (firstName, lastName, email, password) => {
  return db1.users.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  });
};

// Testing querying models with associations or testing migration:
exports.migrateUser = async () => {
  // Collect the existing persons from old database:
  const persons = await this.findAllPersons();

  let usersArr = [];
  let existingUsersArr = [];
  for (var i = 0; i < persons.length; i++) {
    // parameter values from the old database:
    const firstname_db2 = persons[i].name;
    const lastname_db2 = persons[i].surname;
    const email_db2 = persons[i].email;
    const password_db2 = persons[i].password;

    // Collect the users in new database inserted from old database:
    existingUsersArr = await this.findUserByEmailAndPasswordDB1(
      email_db2,
      password_db2
    );

    // Check if these users exist, if not add one to the new database
    // else check if these users in new database are the same as in old database.
    if (!existingUsersArr) {
      console.log("This person doesn't exist!");
      usersArr = await this.createUser(
        firstname_db2,
        lastname_db2,
        email_db2,
        password_db2
      );
    } else {
      // JSON Stringify and Parse existing users from new database:
      const existingUsersArrJSON = JSON.stringify(existingUsersArr, null, 4);
      const parsedExistingUsersArrJSON = JSON.parse(existingUsersArrJSON);

      // User parameter values from the new database:
      const email_db1 = parsedExistingUsersArrJSON.email;
      const password_db1 = parsedExistingUsersArrJSON.password;

      // Check if these users in new database are exactly the same as in old database.
      // Else add to new database.
      if (email_db1 == email_db2) {
        console.log("This person already exists!");
      } else {
        console.log("This person doesn't exist!");
        usersArr = await this.createUser(
          firstname_db2,
          lastname_db2,
          email_db2,
          password_db2
        );
      }
    }
  }

  return usersArr;

  // Testing //

  /*return db2.Person.findAll({
    /*where: {
      id: 2,
    },*/
  /*attributes: ["name", "surname", "ssn"],
    include: [
      {
        model: db2.Availability,
        as: "availabilities",
        required: true, // Makes sure to return an object containing the association
        //separate: true,
        attributes: ["from_date", "to_date"],
      },
    ],
  });*/

  /*return db2.Availability.findAll({
    /*where: {
      person_id: 1,
    },*/
  /*attributes: ["from_date", "to_date"],
    include: [
      {
        model: db2.Person,
        as: "person",
        attributes: ["name", "surname", "ssn"],
      },
    ],
  });*/
};

/**
 * Update the person's data from the old database to the new database.
 * @param  {number}  person_id The unique primary key - id of the person.
 * @param  {object}  person    The object including the data to migrate.
 * @return {object}           Success object with the newly saved person inside.
 *
 */
/*exports.updatePerson = (person) => {
  return db1.User.update(
    {
      name: person.name,
      surname: person.surname,
      ssn: person.ssn,
      email: person.email,
      password: person.password,
      username: person.username,
    },
    {
      where: {
        id: person.id,
      },
    }
  );
};*/

exports.setAuthLevel = (user, level) => {
  return user.update({
    authorization: level,
  });
};
