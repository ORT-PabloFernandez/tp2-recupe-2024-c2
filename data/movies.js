import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_mflix";
const MOVIES = "movies";

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

export { getAllMovies };


export async function getMovieById(id){
  const conectiondb = await getConnection();
  const movie = conectiondb.db(DATABASE).collection(MOVIES).findOne({ _id: new ObjectId(id)});

  return movie;
}

export async function getMoviesWinners(){
  const connectiondb = await getConnection();
  const movies = connectiondb.db(DATABASE).collection(MOVIES);

  //const moviesWinners = await movies.find({"awards.wins": { $gt: 0 }},{projection: { title: 1, poster: 1 , plot: 1 }}).toArray();
  const moviesWinners = await movies.find().toArray();

  return moviesWinners;
}


export async function getMoviesByLanguaje(languaje) {
  const connectiondb = await getConnection();
  const movies = connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ languages: languaje })
    .toArray();
  return movies;
}
