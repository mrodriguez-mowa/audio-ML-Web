import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAOMongo } from "../../../../src/mongo/dao/audioDAO";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'POST'){

        const { audioCode, userId }  = req.body

        const audioInstance = new AudioDAOMongo()

        audioInstance.SkipAudioForUser({userId, audioId: audioCode})

        return res.send(res.statusCode)
    }
}