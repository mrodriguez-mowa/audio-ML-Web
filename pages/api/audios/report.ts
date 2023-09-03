import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAO } from "../../../src/dao/audios/audioDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'GET'){
        const { id } = req.query

        console.log(id, "query param")

        const audioInstance = new AudioDAO()

        const audioDetails = await audioInstance.AudiosReportByUser(id)
        
        return res.send(audioDetails)
        
    }
}