"use strict";
module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define(
    "Availability",
    {
      from_date: DataTypes.DATEONLY,
      to_date: DataTypes.DATEONLY,
    },
    {
      freezeTableName: true,
    }
  );
  Availability.associate = function (models) {
    // associations can be defined here
    Availability.belongsTo(models.Person, {
      as: "person",
      foreignKey: "person_id",
    });
  };
  return Availability;
};
