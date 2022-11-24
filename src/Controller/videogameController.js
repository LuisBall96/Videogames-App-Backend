const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const url = async () => {
  try {
    let rutas = [];

    for (let i = 1; i <= 5; i++) {
      rutas.push(i);
    }

    const promises = rutas.map((ele) =>
      axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${ele}`)
    );

    const allRoutes = await Promise.all(promises);

    const videogames = allRoutes
      .map((elemento) => {
        return elemento.data.results.map((elemento) => {
          return {
            id: elemento.id,
            name: elemento.name,
            released: elemento.released,
            background_image: elemento.background_image,
            rating: elemento.rating,
            genres: elemento.genres.map((ele) => {
              return {
                name: ele.name,
              };
            }),
            platform: elemento.platforms.map((ele) => ele.platform.name),
          };
        });
      })
      .flat();

    console.log("Longitud es:", videogames.length);
    return videogames;
  } catch (error) {
    console.log(error);
  }
};

const getVideoGameDB = async () => {
  return await Videogame.findAll({
    //Si solo necesito que me traiga todos los datos del modelo, solo pongo el findAll ()
    include: {
      //Si quiero incluir a otro modelo para que se vea, pongo  include
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [], //Aquí pongo el atributo del modelo incluido que salga en pantalla
      },
    },
  });
};

const allVideogames = async () => {
  let api = await url();
  let db = await getVideoGameDB();
  let videogamesUnited = api.concat(db);
  return videogamesUnited;
};

const videogameName = async (req, res) => {
  try {
    let data = await allVideogames();
    let { name } = req.query;
    if (name) {
      let searchData = data.filter((ele) =>
        ele.name.toLowerCase().includes(name.toLowerCase())
      );
      let dataIn15 = searchData.slice(0, 15);
      let dataRequire = dataIn15.map((ele) => {
        return {
          name: ele.name,
          background_image: ele.background_image,
          genres: ele.genres,
          rating: ele.rating,
        };
      });
      console.log(dataIn15.length);
      res.send(
        dataRequire.length
          ? dataRequire
          : "No existen videojuegos con ese nombre"
      );
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = videogameName;
