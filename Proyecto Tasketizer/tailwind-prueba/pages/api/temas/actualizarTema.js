import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Tasketizer");
        const { id } = req.query;
        const { nombre } = req.body;

        const post = await db
            .collection("temas")
            .updateOne(
                {
                    "_id":new ObjectId(id)
                },
                {
                    $set: {
                        "nombre": nombre,
                        
                    }
                }

            );

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};