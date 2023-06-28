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
        
        const userInstance = new UserDAO();


        const {created, message} = await userInstance.CreateUser({
            username,
            password,
            name,
            lastName,
        })
        

        console.log({
            created,
            message
        })

        return res.send({
            created,
            message
        })

    }

    
}
