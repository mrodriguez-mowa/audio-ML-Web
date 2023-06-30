import connectDb from "../../database/connection";

export class AudioDAO {

    public async GetAudio() {
        const connection = await connectDb()

        try {

            await connection.connect()

            let res

            /*
            if (1 == 111110) {
                res = await connection.query(`select a.audio_code, a.audio_name, c.message, c.conversation_id from audios a  
                join conversations c on c.audio_code  = a.audio_code where a.audio_code = $1 order by conversation_id asc`, [id])

            } else {*/

                const randomId = this.GetRandomAudioId()
                res = await connection.query(`select a.audio_code, a.audio_name, c.message, c.conversation_id from audios a  
                join conversations c on c.audio_code  = a.audio_code where a.audio_code = $1 order by conversation_id asc`, [randomId])
            /*}*/

            return res.rows

        } catch (error) {
            console.error(error)
        } finally {
            await connection.end()
        }
    }

    public async GetRandomAudioId(): Promise<string> {

        const connection = await connectDb()

        let randomId 

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
}