import {
    IUser,
    encryptPassword,
    comparePassword,
} from "../../entities/User/user.model";

import connectDb from "../../database/connection";

export class UserDAO {
    public async CreateUser({
        username,
        password,
        name,
        lastName,
    }: IUser): Promise<{
        created: boolean,
        message: string
    }> {
        const connection = await connectDb();
 
        try {
            await connection.connect();

            const { valid, message } = await this.ValidateUser(username);

            if (valid) {

                const secretPassword = await encryptPassword(password);

                await connection.query(
                    "INSERT INTO users(username, password, name, last_name) VALUES ($1, $2, $3, $4)",
                    [username, secretPassword, name, lastName]
                );

                return {
                    created: true,
                    message: "¡Usuario creado exitosamente!"
                };
            } else {
                return {
                    created: false,
                    message
                }
            }


        } catch (error) {
            console.error(error);
        } finally {
            await connection.end();
        }

        return { created: false, message: "Ha ocurrido algo inesperado" };


    }

    public async LoginUser({
        username,
        password,
    }: {
        username: string;
        password: string;
    }): Promise<Boolean> {
        let success = false;
        const connection = await connectDb();

        try {
            await connection.connect();

            const res = await connection.query(
                "SELECT username, password FROM users WHERE username = $1",
                [username]
            );

            if (res.rowCount > 0) {
                success = true;

                const hash = res.rows[0].password;

                const validPassword = await comparePassword({ password, hash });

                if (!validPassword) success = false;
            }
        } catch (error) {
            console.error(error);
        } finally {
            await connection.end();
        }

        return success;
    }

    public async ValidateUser(username: string): Promise<{
        valid: boolean,
        message: string
    }> {
        const connection = await connectDb();

        try {
            await connection.connect();

            const res = await connection.query(
                "SELECT user_id FROM users WHERE username ilike $1",
                ['%' + username + '%']
            );

            if (res.rowCount > 0) {
                return {
                    valid: false,
                    message: "Intente con otro nombre de usuario"
                }
            } else {
                return {
                    valid: true,
                    message: "Usuario válido"
                }
            }


        } catch (error) {
            console.error(error);
        } finally {
            await connection.end();
        }

        return { valid: false, message: "Ha ocurrido algo inesperado" };

    }
}
