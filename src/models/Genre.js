const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
