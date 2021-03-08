"use strict";
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      ssn: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
  Person.associate = function (models) {
    // associations can be defined here
    Person.belongsTo(models.Role, {
      as: "role",
      foreignKey: "role_id",
    });
    Person.hasMany(models.Availability, {
      as: "availabilities",
      foreignKey: "person_id",
    });
    Person.hasMany(models.Competence_profile, {
      as: "competence_profiles",
      foreignKey: "person_id",
    });
  };
  return Person;
};
