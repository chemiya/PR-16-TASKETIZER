import clientPromise from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Tasketizer");
    const { username,password } = req.body;

    const post = await db.collection("usuarios").findOne({
      username:username,
      password:password
    });

   if(post==null){
    res.json("no");
   }else{
    res.json(post);
   }

   
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};