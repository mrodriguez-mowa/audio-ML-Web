import connectDb from "../../database/connection";

export class AudioDAO {

    public async GetAudio(id:any) {
        const connection = await connectDb()

        try {

            await connection.connect()

            let res

            const idx = id?.length 

            if (idx) {
                
                res = await connection.query(`select a.audio_code, a.audio_name, c.message, c.conversation_id from audios a  
                join conversations c on c.audio_code  = a.audio_code where a.audio_code = $1 order by conversation_id asc`, [id])

            } else {
                
                const randomId = await this.GetRandomAudioId()

                console.log("Random ID",randomId)
                res = await connection.query(`select a.audio_code, a.audio_name, c.message, c.conversation_id from audios a  
                join conversations c on c.audio_code  = a.audio_code where a.audio_code = $1 order by conversation_id asc`, [randomId])
                
                await this.UpdateDeliveredStatus(randomId)
            
            }

            return res.rows

        } catch (error) {
            console.error(error)
        } finally {
            await connection.end()
        }
    }

    public async GetRandomAudioId(): Promise<string> {

        const connection = await connectDb()

        let randomId = ""

        try {
            await connection.connect()

            const randomIdRes = await connection.query(`
                SELECT audio_code
                FROM audios
                
                ORDER BY RANDOM()
                LIMIT 1;
            `)
            

            randomId = randomIdRes.rows[0].audio_code

        } catch (error) {
            console.error(error)
        } finally {
            await connection.end()
        }

        return randomId
    }

    public async UpdateDeliveredStatus(audioId:string){
        const connection = await connectDb()
        try {
            await connection.connect()

            await connection.query("update audios set delivered = true where audio_code = $1", [audioId])
            console.log("UPDATED!")
        } catch (error) {
            console.log("Error updating delivered field", error)
        } finally {
            await connection.end()
        }
    }

    public async UpdateSpeakerLabel({ agentSpeaker, clientSpeaker, currentId, userId } : any ) {
        console.log(agentSpeaker, clientSpeaker, currentId, userId )
        const connection = await connectDb()
        try {
            await connection.connect()
            await connection.query(`
                UPDATE conversations
                SET labeled_speaker = CASE
                WHEN conversation_id = ANY (COALESCE($1::int[], ARRAY[]::int[])) THEN 'AGENTE'
                WHEN conversation_id = ANY (COALESCE($2::int[], ARRAY[]::int[])) THEN 'CLIENTE'
                ELSE labeled_speaker
                END
                WHERE conversation_id = ANY (COALESCE($1::int[], ARRAY[]::int[]))
                OR conversation_id = ANY (COALESCE($2::int[], ARRAY[]::int[]))
            `, [agentSpeaker, clientSpeaker]);

            await connection.query("update audios set classified_by = $1 where audio_code = $2", [userId, currentId])

            console.log("UPDATED AUDIO SPEAKERS!")
        } catch (error) {
            console.log("Error updating agent field", error)
        } finally {
            await connection.end()
        }
    }
}