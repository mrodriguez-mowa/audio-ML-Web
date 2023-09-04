import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAOMongo } from "../../../../src/mongo/dao/audioDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if (req.method == 'POST') {
        const {audioId, userID} = req.body
        
        const audioMongoDAO = new AudioDAOMongo()

        const audio = await audioMongoDAO.GetAudio({audioId, userId:userID})

        return res.send(audio)
    }
}