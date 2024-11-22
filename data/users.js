import getConnection from "./conn.js";

const DATABASE = "sample_mflix";
const USERS = "users";

export async function getUserById(id) {
    const connectiondb = await getConnection();
    const user = await connectiondb
      .db(DATABASE)
      .collection(USERS)
      .findOne({ _id: id });
    return user;
  }