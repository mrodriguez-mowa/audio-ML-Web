import { IUser, encryptPassword, comparePassword } from "../../entities/User/user.model";
import poolConnection from "../../database/connection";

export class UserDAO {

    public async CreateUser({ username, password, name, lastName }: IUser): Promise<Boolean> {
        let isOK = false;

        try {
            const connection = await poolConnection()

            await connection.connect()

            try {
                const secretPassword = await encryptPassword(password);

                console.log(secretPassword)

                await connection.query("INSERT INTO users(username, password, name, last_name) VALUES ($1, $2, $3, $4)", [username, secretPassword, name, lastName])

                isOK = true
            } catch (e) {
                console.error(e)
            } finally {
                await connection.end()
            }
        } catch (error) {
            console.error(error)
        }

        return isOK;
    }

    public async loginUser({ username, password }: { username: string, password: string }): Promise<Boolean> {
        let success = false

        try {
            const connection = await poolConnection()

            await connection.connect()
            
            try {
                
                const res = await connection.query("SELECT username, password FROM users WHERE username = ?", [username])

                if (res.rowCount > 0) {
                    success = true
                    
                    const hash = res.rows[0].password

                    const validPassword = await comparePassword({password, hash})

                    if (!validPassword) success = false

                }

            } catch (error) {
                console.error(error)
            } finally {
                await connection.end()
            }
        } catch (error) {
            console.error(error)
        }

        return success
    }
}