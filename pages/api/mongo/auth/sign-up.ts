import type { NextApiRequest, NextApiResponse } from "next";
import { ICreateUser } from "../../../../src/interfaces/createUser";
import { UserDAOMongo } from "../../../../src/mongo/dao/userDAO";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        const { username, password, name, lastName }: ICreateUser = req.body;

        const UserMongoDAO = new UserDAOMongo()

        const {created, message} = await UserMongoDAO.RegisterUser({
            username,
            password,
            firstName: name,
            lastName
        })

        return res.send({
            created, message
        })
    }
}