const { Router } = require("express");
const createVideogame = require("../Controller/createVideogame");
const getGenres = require("../Controller/genreController");
const videogameName = require("../Controller/videogameController");
const getVideogameById = require("../Controller/videogameID");
const rutaID = require("../Controller/videogameID");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req,res) => {
  res.send("Welcome to videogames app!");
})
router.get("/videogames", videogameName);
router.get("/prueba", rutaID);
router.get("/genres", getGenres);
router.post("/crearJuego", createVideogame);
router.get("/videogames/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let games = await getVideogameById(id);
    if (games) {
      return res.send(games);
    } else {
      res.json({ msg: `Game with the id ${id} no exits` });
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
