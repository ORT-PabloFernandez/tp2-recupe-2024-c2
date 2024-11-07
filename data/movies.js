import getConnection from "./conn.js";
import { ObjectId } from "mongodb"
const DATABASE = "sample_mflix";
const MOVIES = "movies";
const COMMENTS= "comments";

async function getAllMovies(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMovieById(movieId) {
  const connectiondb = await getConnection();
  if (!ObjectId.isValid(movieId)) {
    throw new Error("El ID no es valido");
  }
  return await connectiondb.db(DATABASE).collection(MOVIES).findOne({ _id: new ObjectId(movieId) });
}

async function getAwardWinningMovies() {
  const connectiondb = await getConnection();
  return await connectiondb.db(DATABASE).collection(MOVIES).find(
    { "awards.wins": { $gt: 0 } }, 
    { projection: { title: 1, poster: 1, plot: 1 } }
  ).toArray();
}

async function getMoviesByLanguage(language, pageSize, page) {
  const connectiondb = await getConnection();
  return await connectiondb.db(DATABASE).collection(MOVIES).find({ languages: language })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
}

async function getMoviesByFreshRating() {
  const connectiondb = await getConnection();
  return await connectiondb.db(DATABASE).collection(MOVIES).find({ "tomatoes.fresh": { $exists: true } })
    .sort({ "tomatoes.fresh": -1 })
    .toArray();
}



export { getAllMovies, getMovieById, getAwardWinningMovies, getMoviesByLanguage, getMoviesByFreshRating };
