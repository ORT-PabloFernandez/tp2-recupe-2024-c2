import express from "express";
import { getAllMovies, getMovieById, getAwardWinningMovies, getMoviesByLanguage, getMoviesByFreshRating } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/awards/winning", async (req, res) => {
  res.json(await getAwardWinningMovies());
});

router.get("/language/:language", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getMoviesByLanguage(req.params.language, pageSize, page));
});

router.get("/rankings/fresh", async (req, res) => {
  res.json(await getMoviesByFreshRating());
});


export default router;