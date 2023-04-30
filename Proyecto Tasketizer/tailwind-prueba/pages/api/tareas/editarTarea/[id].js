import clientPromise from "../../../../utils/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Tasketizer");
        const { id } = req.query;
        const { titulo,descripcion,fechaLimite,estado,tema,prioridad} = req.body;
console.log(id)


        const post = await db
            .collection("tareas")
            .updateOne(
                {
                    "_id":new ObjectId(id)
                },
                {
                    $set: {
                        "titulo": titulo,
                        "descripcion":descripcion,
                        "fechaLimite":fechaLimite,
                        "tema":tema,
                        "estado":estado,
                        "prioridad":prioridad

                        
                    }
                }

            );

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};