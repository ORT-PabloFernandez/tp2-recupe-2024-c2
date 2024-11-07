import express from "express";
import { getAllMovies, getAllMoviesByFreshRating, getLanguage, getMovieByid, getWinners, getUserComments } from "../data/movies.js";



const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/awards/winners", async (req, res) => {
  console.log("Awards winners")
  const movies = await getWinners()
  res.json(movies)

} ) 

router.get("/language", async (req, res) =>{
console.log("LANGUAGE")
const { language, pageSize, page } = req.query
const movies = await getLanguage (language, parseInt(pageSize) , parseInt(page))
res.json(movies)

})

router.get("/fresh/all", async (req,res) => {
  const freshMovies = await getAllMoviesByFreshRating()
  res.json(freshMovies)
})

router.get("/:id", async (req, res) => {
  console.log("ID")
  const movie = await getMovieByid(req.params.id)
  res.json(movie)
})

router.get("/comments" , async (req, res) => {
const userId = req.query.userId
const comments = await getUserComments(userId)
res.json(comments)

})
export default router;
