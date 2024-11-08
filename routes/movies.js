import express from "express";
import { getAllMovies, getMovieById, getMoviesWinners, getMoviesByLanguaje } from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});


//> 1. Necesitamos un endpoint que nos devuelva una película (**movie**) particular por \_id
router.get("/:id", async (req, res) => {
  console.log("Id");
  const movie = await getMovieById(req.params.id);
  res.json(movie);
})


//> 2. Los desarrolladores de frontend estan haciendo un pantalla para mostrar solo las películas ganadoras de al menos un premio.
//Necesitamos que desarrolles el endpoint respectivo. Solo necesitan el titulo, el poster y el resumen de la reseña (**plot**)
router.get("/winners", async (req, res) => {
  console.log("Peliculas con al menos un premio")
  const winners = await getMoviesWinners();
  res.json(winners);
});

//Necesitamos un endpoint que nos devuelva las peliculas filtradas por idioma. 
//Toma en cuenta que estas películas pueden ser muchas y el desarrollador de frontend va mostrarlas paginadas.
router.get("/byLanguage/:languaje", async (req, res) => {
  console.log("Peliculas por lenguaje");
  const movies = await getMoviesByLanguaje(req.params.languaje);
  res.json(movies);
});


export default router;
