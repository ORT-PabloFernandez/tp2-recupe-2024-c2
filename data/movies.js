import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_mflix";
const MOVIES = "movies";
const USERS = "users"
const COMMENTS = "comments"


export async function getAllMovies(pageSize, page) {
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

export async function getMovieByid(id) {
  const connectiondb = await getConnection();
  const movie = await connectiondb 
  .db(DATABASE)
  .collection(MOVIES)
  .findOne({_id: new ObjectId(id)})
  return movie;
}

export async function getWinners() {
  const connectiondb = await getConnection()
  const movie = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .findOne({_id: new ObjectId(id)})
  .proyect({title: 1, poster: 1, plot: 1 })
  .toArray()
  return movie;
}

export async function getLanguage(language, pageSize, page) {
  const connectiondb = await getConnection()
  const movies = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .find({ language: language})
  .limit(pageSize)
  .skip(pageSize * page)
  .toArray()
  return movies
}

export async function getAllMoviesByFreshRating() {
  const connectiondb = await getConnection()
  const movies = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .find({"tomatoes.fresh": { $exists : true}})
  .sort({"tomatoes.fresh" : -1})
  .toArray()
  return movies;
}

export async function getUserComments(userId) {
  const connectiondb = await getConnection()
  const comments = await connectiondb 
  .db(DATABASE)
  .collection(COMMENTS)
  .find({ userId: new ObjectId(userId)})
  .toArray()

}
