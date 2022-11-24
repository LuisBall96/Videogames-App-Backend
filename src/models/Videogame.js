const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      released: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      background_image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://bloygo.yoigo.com/embed/278c6e538004048125409188880d5e8b9d17891574091421/2019-Noviembre-Fotos-SEO-videogames-salud.jpg",
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      platform: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
