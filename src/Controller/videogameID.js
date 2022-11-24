const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

async function getDbId(id) {
  const gameDB = await Videogame.findOne({
    where: {
      id,
    },
    include: [Genre],
  });
  const parceToArray = new Array(gameDB);
  return parceToArray;
}

async function getVideogameById(id) {
  const regex = /([a-zA-Z]+([0-9]+)+)/;
  try {
    if (regex.test(id)) {
      let videogame = await getDbId(id);
      return videogame;
    } else {
      const apiId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const detail = apiId.data;
      return [
        {
          id: detail.id,
          name: detail.name,
          background_image: detail.background_image,
          released: detail.released,
          rating: detail.rating,
          description_raw: detail.description_raw,
          genres: detail.genres.map((e) => e.name),
          platform: detail.platforms.map((e) => e.platform.name),
        },
      ];
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = getVideogameById;
