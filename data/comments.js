import getConnection from "./conn.js";

const DATABASE = "sample_mflix";
const COMMENTS = "comments";


export async function getCommentsByUserId(userId) {
    const connectiondb = await getConnection();
    const comments = await connectiondb
      .db(DATABASE)
      .collection(COMMENTS)
      .find({ userId })
      .toArray();
    return comments;
  }
  