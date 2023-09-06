import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAO } from "../../../src/dao/audios/audioDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'POST'){
        const { id, userID } = req.body

        console.log(id, userID, "query param")

        

        const audioInstance = new AudioDAO()

        const audioDetails = await audioInstance.GetAudio({id, userID});
        
        return res.send(audioDetails)
        
    }
}