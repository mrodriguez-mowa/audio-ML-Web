import { connectMongoDB } from "../connection/mongoConnection";
import { User } from "../models";
import { comparePassword, encryptPassword } from "../../entities/User/user.model"


interface IUserMongo {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

export class UserDAOMongo {
    
    // TODO: Generate an interface for this
    public async LoginUser({username, password}:{username: string, password: string}):Promise<any> {
        
        try {
            await connectMongoDB()

            const foundClient = await User.findOne({
                username
            })

            const isValid = await comparePassword({password, hash: foundClient.password})

            return {
                isLogged: isValid,
                userId: foundClient._id.toString(),
                userName: foundClient.username,
                isAdmin: foundClient.isAdmin
            }

        } catch (error) {
            console.log(error)
        }

    }

    public async RegisterUser({
        username, password, firstName, lastName
    }:IUserMongo): Promise<any>  {
        try {
            await connectMongoDB()

            const hashedPassword = await encryptPassword(password)

            const newUser = new User({
                username,
                password: hashedPassword,
                firstName,
                lastName
            })

            await newUser.save()

            console.log("User created OK")
            return {
                created: true,
                message: "¡Usuario creado exitosamente!"
            }
        } catch (error) {
            console.log(error)
            return {
                created: false,
                message: "No se pudo crear el usuario"
            }
        }
    }

}