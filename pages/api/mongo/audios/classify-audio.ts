import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAOMongo } from "../../../../src/mongo/dao/audioDAO";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'POST'){
        const {textSpeaker, userID}  = req.body

        // console.log(req.body)

        // SEPARAR POR SPEAKER LABEL
        const agentSpeaker = textSpeaker.filter((el:any) => el.speakerLabel == 1).map((el:any) => {return {
            conversationId: el.conversationId,
            userID
        }})
        const clientSpeaker = textSpeaker.filter((el:any) => el.speakerLabel == 2).map((el:any) => {return {
            conversationId: el.conversationId,
            userID
        }})

        const audioDAO = new AudioDAOMongo()

        await audioDAO.UpdateSpeakerLabel({agentSpeaker, clientSpeaker})

        return res.send(res.statusCode)
    }
}