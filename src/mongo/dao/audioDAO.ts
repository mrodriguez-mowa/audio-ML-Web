import mongoose from "mongoose";
import { connectMongoDB } from "../connection/mongoConnection";
import { Audio } from "../models";

interface IGetAudio {
  audioId: any
  userId: any
}

export class AudioDAOMongo {
  public async GetAudio({userId, audioId}:IGetAudio) {
    try {
      await connectMongoDB()
      const ObjectId = mongoose.Types.ObjectId

      if (audioId == undefined || audioId.trim().length == 0) {
        console.log("Null ID for this audio, getting a new one")
        const res = await Audio.aggregate([
          {
            $match: {
              sentTo: {
                $nin: [userId]
              },
              _id: new ObjectId("64f1fe3d46a7eaaf0dc997e8")
            }
          },
          {
            $sample: {
              size: 1
            }
          },
          {
            $lookup: {
              from: "conversations",
              localField: "_id",
              foreignField: "audioId",
              as: "audioConversation"
            }
          }
        ])

        return res

      } else {
        console.log("Valid Audio ID re importing data")
        // const audioConversations = await Audio.findById(id)
        

        const res = await Audio.aggregate([
          {
            $match: {
              _id: new ObjectId(audioId)
            }
          },
          {
            $lookup: {
              from: "conversations",
              localField: "_id",
              foreignField: "audioId",
              as: "audioConversation"
            }
          }
        ])

        return res;
      }

    } catch (error) {
      console.error(error)
      throw new Error("Couldn't get audio to show")
    }
  }


  public async GetRandomAudioId(): Promise<Number> {
    return 1
  }
}