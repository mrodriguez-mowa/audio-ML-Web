import mongoose from "mongoose";
import { connectMongoDB } from "../connection/mongoConnection";
import { Audio, ClassificationDetail, Conversation } from "../models";

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
              }
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

        try {
          const result = await Audio.findByIdAndUpdate(new ObjectId(res[0]._id), {
            $push: {
              sentTo: userId
            }
          });
        
          if (!result) {
            // Handle the case where no document was found for the given audioId
            console.error('Audio not found.');
          } else {
            console.log('Update successful.');
          }
        } catch (error) {
          // Handle any errors that occurred during the update
          console.error('Error updating audio.');
        }

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

  public async UpdateSpeakerLabel({agentSpeaker, clientSpeaker}:any){
    try {
      await connectMongoDB()
      const classificationAgent = agentSpeaker.map((el:any)=>{
        return {
          classifiedBy: el.userID,
          newLabel: 1
        }
      })

      const classificationClient = clientSpeaker.map((el:any)=>{
        return {
          classifiedBy: el.userID,
          newLabel: 2
        }
      })

      const classifications = classificationAgent.concat(classificationClient)

      await ClassificationDetail.insertMany(classifications)
      console.log("Classification inserted")

    } catch (error) {
      console.error(error)
      throw new Error("Couldn't update conversations")
    }
  }


}