import type { NextApiRequest, NextApiResponse } from "next";
import { UserDAO } from "../../../src/dao/users/userDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    // VALIDAR FORMULARIO
    if (req.method == 'POST'){
        const { username , password } = req.body

        const authClass = new UserDAO()

        const {isLogged, userId, userName, isAdmin } = await authClass.LoginUser({
            username, password
        })

        if ({isLogged}){
            console.log(username, "Login OK")
        } else {
            console.warn(username, "Login FAIL")
        }

        return res.send({
            isLogged,
            userId,
            userName,
            isAdmin
        })
    }
}