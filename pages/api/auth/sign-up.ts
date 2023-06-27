import type { NextApiRequest, NextApiResponse } from "next";
import { ICreateUser } from "../../../src/interfaces/createUser";
import { UserDAO } from "../../../src/dao/users/userDAO";

// CREAR USUARIO PARA APLICACIÓN
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // VALIDAR MÉTODO POST
    if (req.method == "POST") {
        const { username, password, name, lastName }: ICreateUser = req.body;

        console.log(username, password, name, lastName)

        const userInstance = new UserDAO();

        const created = await userInstance.CreateUser({
            username,
            password,
            name,
            lastName,
        });

        if (created) {
            res.send({
                status: res.status,
                message: "¡Usuario creado!",
            });
        } else {
            res.send({
                status: res.status,
                message: "Ocurrió un error inesperado",
            });
        }
    }
}
