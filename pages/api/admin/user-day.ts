import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAO } from "../../../src/dao/audios/audioDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'POST'){
        const data = req.body
        const { date } = data

        console.log(date)

        const audioInstance = new AudioDAO()

        const values = await audioInstance.GetReportByDate(date)

        return res.send(values)
    }
}