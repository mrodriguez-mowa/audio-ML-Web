import bcrypt from 'bcrypt'

const saltRounds = 5

export interface IUser {
    username: string,
    password: string,
    name: string,
    lastName: string
}

export const encryptPassword =  async (password: string):Promise<String> => {

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword;
}

export const comparePassword = async ({password, hash}:{password:string, hash:string}):Promise<Boolean> => {
    let areSame = false
    bcrypt.compare(password, hash, function(err,result){
        areSame = result
    })
    
    return areSame
}