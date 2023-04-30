import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb';
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Tasketizer");
    const { username,password,email } = req.body;

    const filtro="estado"
    const usuarioNuevo = await db.collection("usuarios").insertOne({
      username,password,email,filtro
    });

  
    var idUsuario=usuarioNuevo.insertedId
    idUsuario=idUsuario.toString();
    var nombre="Pendiente"

    const estadoDefectoNuevo = await db.collection("estados").insertOne({
      idUsuario,nombre
    });

    nombre="En ejecucción"

    const estadoDefectoNuevo1 = await db.collection("estados").insertOne({
      idUsuario,nombre
    });


    nombre="Cerrada"

    const estadoDefectoNuevo2 = await db.collection("estados").insertOne({
      idUsuario,nombre
    });







    nombre="Trabajo"

    const temaDefectoNuevo = await db.collection("temas").insertOne({
      idUsuario,nombre
    });

    nombre="Casa"

    const temaDefectoNuevo1 = await db.collection("temas").insertOne({
      idUsuario,nombre
    });


    nombre="Tiempo libre"

    const temaDefectoNuevo2 = await db.collection("temas").insertOne({
      idUsuario,nombre
    });



    nombre="Alta"

    const prioridadesDefectoNuevo = await db.collection("prioridades").insertOne({
      idUsuario,nombre
    });

    nombre="Media"

    const prioridadesDefectoNuevo1 = await db.collection("prioridades").insertOne({
      idUsuario,nombre
    });


    nombre="Baja"

    const prioridadesDefectoNuevo2 = await db.collection("prioridades").insertOne({
      idUsuario,nombre
    });
    
   
    

    res.json(usuarioNuevo);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};