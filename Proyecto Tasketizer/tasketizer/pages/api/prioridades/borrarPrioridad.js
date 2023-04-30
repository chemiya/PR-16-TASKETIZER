import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Tasketizer");
        const { id } = req.query;

        const post = await db
            .collection("prioridades")
            .deleteOne({
                '_id': new ObjectId(id)
            })

            const tarea = await db
            .collection("tareas")
            .deleteMany({
                'prioridad': (id)
            })

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};