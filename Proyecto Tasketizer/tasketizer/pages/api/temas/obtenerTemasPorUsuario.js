import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Tasketizer");
        const { id } = req.query;
        console.log(id)

        const posts = await db
            .collection("temas")
            .find({'idUsuario': id})
            .limit(20)
            .toArray();

        res.json(posts);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};