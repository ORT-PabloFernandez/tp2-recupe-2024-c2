import "dotenv/config";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB;

const client = new MongoClient(uri);

let instance = null;

export default async function getConnection() {
  if (instance == null) {
    try {
      instance = await client.connect();
      console.log("Conexión exitosa a la base de datos.");
    } catch (error) {
      console.log("Error de conexión:", error.message);
    }
  }
  return instance;
}
