"use strict";
module.exports = (sequelize, DataTypes) => {
  const Competence_profile = sequelize.define(
    "Competence_profile",
    {
      years_of_experience: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  Competence_profile.associate = function (models) {
    // associations can be defined here
    Competence_profile.belongsTo(models.Person, {
      as: "person",
      foreignKey: "person_id",
    });
    Competence_profile.belongsTo(models.Competence, {
      as: "competence",
      foreignKey: "competence_id",
    });
  };
  return Competence_profile;
};
