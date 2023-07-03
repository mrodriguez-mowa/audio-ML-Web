import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAO } from "../../../src/dao/audios/audioDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'GET'){

        const audioInstance = new AudioDAO()

        const values = await audioInstance.ClassifiedByUser()

        return res.send(values)
    }
}