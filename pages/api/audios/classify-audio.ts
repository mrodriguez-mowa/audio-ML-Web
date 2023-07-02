import type { NextApiRequest, NextApiResponse } from "next";
import { AudioDAO } from "../../../src/dao/audios/audioDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'POST'){
        const {textSpeaker, userId, currentId}  = req.body

        // SEPARAR POR SPEAKER LABEL
        const agentSpeaker = textSpeaker.filter((el:any) => el.speakerLabel == 1).map((el:any) => el.conversationId)
        const clientSpeaker = textSpeaker.filter((el:any) => el.speakerLabel == 2).map((el:any) => el.conversationId)

        

        const audioInstance = new AudioDAO()

        await audioInstance.UpdateSpeakerLabel({agentSpeaker, clientSpeaker, currentId, userId})

    }
}