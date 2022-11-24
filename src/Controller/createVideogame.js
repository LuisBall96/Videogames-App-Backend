const { Videogame, Genre } = require("../db.js");

const createVideogame = async (req, res) => {
  try {
    let {
      name,
      released,
      description,
      rating,
      platform,
      background_image,
      genres,
      createdInDB,
    } = req.body;

    let newGame = await Videogame.create({
      name,
      released,
      description,
      rating,
      platform,
      background_image,
      genres,
      createdInDB,
    });

    const relacion = await Genre.findAll({
      where: {
        name: genres,
      },
    });

    await newGame.addGenre(relacion);

    res.send(newGame);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = createVideogame;
