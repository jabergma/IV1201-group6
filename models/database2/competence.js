"use strict";
module.exports = (sequelize, DataTypes) => {
  const Competence = sequelize.define(
    "Competence",
    {
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
  Competence.associate = function (models) {
    // associations can be defined here
    Competence.hasMany(models.Competence_profile, {
      as: "competence_profiles",
      foreignKey: "competence_id",
    });
  };
  return Competence;
};
