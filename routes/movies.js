import express from "express";
import { getAllMovies , getMovieById, getAwardWinners, getMoviesByLanguage, getMoviesByFreshRating} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/id/:id", async (req,res) =>{
  try{
    const movie = await getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener la película', error: err });
    }
});

router.get("/winners", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10; // Valor predeterminado
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
    const winners = await getAwardWinners(pageSize, page);
    res.json(winners);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las películas ganadoras', error: err });
  }
});

router.get("/language/:language", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
      const language = req.params.language;
      const movies = await getMoviesByLanguage(language, pageSize, page);
      res.json(movies);
  } catch (err) {
      res.status(500).json({ message: 'Error al obtener las películas por idioma', error: err });
  }
});

router.get("/ranking", async (req, res) => {
  try {
      const movies = await getMoviesByFreshRating();
      res.json(movies);
  } catch (err) {
      res.status(500).json({ message: 'Error al obtener las películas por puntaje fresh', error: err });
  }
});

export default router;
