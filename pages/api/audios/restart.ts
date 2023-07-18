import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAO } from "../../../src/dao/audios/audioDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'POST'){

        const { audioCode }  = req.body

        const audioInstance = new AudioDAO()

        await audioInstance.UpdateStatusRestart(audioCode)

        return res.send(res.statusCode)
    }
}