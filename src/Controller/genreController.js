const axios = require("axios");
const { API_KEY } = process.env;
const { Genre } = require("../db");

const getGenres = async (req, res) => {
  try {
    let url = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    let urlData = url.data.results;
    let urlMap = urlData.map((ele) => ele.name);

    const genreDB = urlMap.map(async (ele) => {
      await Genre.findOrCreate({
        where: {
          name: ele,
        },
      });
    });
    res.send(urlMap);
    return urlData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getGenres;
