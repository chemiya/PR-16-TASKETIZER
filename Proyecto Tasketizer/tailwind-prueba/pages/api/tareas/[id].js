import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Tasketizer");
        const { id } = req.query;
        console.log(id)

        const post = await db
            .collection("tareas")
            .findOne({
                '_id': new ObjectId(id)
            })

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};