"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
  Role.associate = function (models) {
    // associations can be defined here
    Role.hasMany(models.Person, {
      as: "persons",
      foreignKey: "role_id",
    });
  };
  return Role;
};
