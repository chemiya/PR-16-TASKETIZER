import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb';
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Tasketizer");
    const {  nombre,idUsuario } = req.body;

    const usuarioNuevo = await db.collection("prioridades").insertOne({
      nombre,idUsuario
    });

  


    res.json(usuarioNuevo);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};