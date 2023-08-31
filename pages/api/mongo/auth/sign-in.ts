import type { NextApiRequest, NextApiResponse } from "next";
import { UserDAOMongo } from "../../../../src/mongo/dao/userDAO";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method == "POST") {
        const { username, password } = req.body
        
        const UserMongoDAO = new UserDAOMongo()

        const validUser = await UserMongoDAO.LoginUser({username, password})

        console.log("login result", validUser)
        
        return res.send(validUser)
    }
}