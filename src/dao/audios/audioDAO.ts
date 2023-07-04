import connectDb from "../../database/connection";

export class AudioDAO {

    public async GetAudio(id: any) {
        const connection = await connectDb()

        try {

            await connection.connect()

            let res

            if (id != "null") {
                console.log("valid audio id")
                res = await connection.query(`select a.audio_code, a.audio_name, c.message, c.conversation_id from audios a  
                join conversations c on c.audio_code  = a.audio_code where a.audio_code = $1 order by conversation_id asc`, [id])

            } else {
                console.log("null id")
                const randomId = await this.GetRandomAudioId()

                console.log("Random ID", randomId)
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

    public async UpdateDeliveredStatus(audioId: string) {
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

    public async UpdateSpeakerLabel({ agentSpeaker, clientSpeaker, currentId, userId }: any) {
        // console.log(agentSpeaker, clientSpeaker, currentId, userId )
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

            await connection.query("update audios set classified_by = $1, classified_at = CURRENT_TIMESTAMP where audio_code = $2", [userId, currentId])

            console.log("UPDATED AUDIO SPEAKERS!")
        } catch (error) {
            console.log("Error updating agent field", error)
        } finally {
            await connection.end()
        }
    }

    public async AudiosReportByUser(userId: any) {
        const connection = await connectDb()
        try {
            await connection.connect()

            const userData = await connection.query('select u.name, u.last_name, u.daily_goal from users u where u.user_id = $1', [userId])

            const audioReport = await connection.query(`
                select count(*) as classified_today, (select count(*) from audios where classified_by = $1 and status = 2 ) as classified_total,
                (select count(*) from audios where date_trunc('day', classified_at) between current_date - 4 and current_date and classified_by = $1 and status=2 ) as last_four_days 
                from audios where classified_by = $1 and date_trunc('day', classified_at) = current_date and status = 2 
            `, [userId])

            const values = {
                classified_today: audioReport.rows[0].classified_today,
                classified_total: audioReport.rows[0].classified_total,
                classified_four_days: audioReport.rows[0].last_four_days,
                daily_goal: userData.rows[0].daily_goal,
                name: userData.rows[0].name,
                lastname: userData.rows[0].last_name
            }

            return values


        } catch (error) {

        } finally {

        }

    }


    // ADMIN MODULE

    public async ClassifiedAudios() {

        const connection = await connectDb()

        try {
            await connection.connect()
            
            const res = await connection.query(`select count(labeled_speaker) as total, labeled_speaker as new_type from conversations where labeled_speaker is not null group by labeled_speaker`)

            return res.rows

        } catch (error) {
            console.error(error)
        } finally {
            await connection.end()
        }
    }

    public async ClassifiedByUser() {
        const connection = await connectDb()

        try {
            await connection.connect()
            const res = await connection.query(`select count(u.*) as total, CONCAT(u.name, ' ', u.last_name) as new_type 
            from audios a inner join users u on u.user_id  = a.classified_by
            group by u.name, u.last_name`)
            return res.rows

        } catch (error) {
            console.error(error)
        } finally {
            await connection.end()
        }
    }

    public async AverageByUser() {
        const connection = await connectDb()

        try {
            await connection.connect()

            const res = await connection.query(`SELECT AVG(count_respuestas)::integer AS total, CONCAT (name,' ' ,u.last_name) as new_type
            FROM (
              SELECT COUNT(*) AS count_respuestas,
                classified_by
              FROM audios a 
                where status = 2
              GROUP BY date_trunc('hour', classified_at), classified_by
            ) AS subquery inner join users u on u.user_id = classified_by  group by  u."name" , u.last_name `)
            
            return res.rows

        } catch (error) {
            console.error(error)
        } finally {
            await connection.end()
        }
    }

    public async GetReportByDate(date:any) {
        const connection = await connectDb()

        try {
            await connection.connect()
            const res = await connection.query(`select count(u.*) as total, CONCAT(u.name, ' ', u.last_name) as new_type 
            from audios a inner join users u on u.user_id  = a.classified_by 
            where date_trunc('day', classified_at) = $1 group by u.name, u.last_name `, [
                date
            ])

            return res.rows
        } catch (error) {
            console.error(error)
        } finally {
            await connection.end()
        }
    }

}