import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb';
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Tasketizer");
    const {  titulo,descripcion,fechaLimite,estado,tema,prioridad,idUsuario } = req.body;

    const usuarioNuevo = await db.collection("tareas").insertOne({
      titulo,descripcion,fechaLimite,estado,tema,prioridad,idUsuario
    });

  


    res.json(usuarioNuevo);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};