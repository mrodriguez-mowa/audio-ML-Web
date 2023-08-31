import _mongoose, {connect, mongo} from "mongoose"

declare global {
    var mongoose: {
        promise: ReturnType<typeof connect> | null
        conn: typeof _mongoose | null
    }
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

export const connectMongoDB = async () => {

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }
    
        cached.promise = connect("mongodb://127.0.0.1:27017/nlp-audios", opts).then((mongoose)=> {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    /*
    try {
        const mongooseInstance =  await mongoose.connect("http://127.0.0.1:27017/nlp-audio")
        console.log("Successfully connected to MongoDB")
        return mongooseInstance
    } catch (error) {
        throw new Error("Couldn't connect to MongoDB")
    }
    */

    return cached.conn

}