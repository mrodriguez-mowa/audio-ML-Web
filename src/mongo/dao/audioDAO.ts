import mongoose from "mongoose";
import { connectMongoDB } from "../connection/mongoConnection";
import { Audio, ClassificationDetail, Conversation } from "../models";

const ObjectId = mongoose.Types.ObjectId;

interface IGetAudio {
  audioId: any;
  userId: any;
}

export class AudioDAOMongo {
  public async GetAudio({ userId, audioId }: IGetAudio) {
    console.log(audioId, userId);
    try {
      await connectMongoDB();
      const ObjectId = mongoose.Types.ObjectId;

      if (audioId == undefined || audioId.trim().length == 0) {
        console.log("Null ID for this audio, getting a new one");
        const res = await Audio.aggregate([
          {
            $match: {
              sentTo: {
                $nin: [new ObjectId(userId)],
              },
            },
          },
          {
            $sample: {
              size: 1,
            },
          },
          {
            $lookup: {
              from: "conversations",
              localField: "_id",
              foreignField: "audioId",
              as: "audioConversation",
            },
          },
        ]);

        try {
          const result = await Audio.findByIdAndUpdate(
            new ObjectId(res[0]._id),
            {
              $push: {
                sentTo: new ObjectId(userId),
              },
            }
          );

          if (!result) {
            // Handle the case where no document was found for the given audioId
            console.error("Audio not found.");
          } else {
            console.log("Update successful.");
          }
        } catch (error) {
          // Handle any errors that occurred during the update
          console.error("Error updating audio.");
        }

        return res;
      } else {
        console.log("Valid Audio ID re importing data");
        // const audioConversations = await Audio.findById(id)

        const res = await Audio.aggregate([
          {
            $match: {
              _id: new ObjectId(audioId),
            },
          },
          {
            $lookup: {
              from: "conversations",
              localField: "_id",
              foreignField: "audioId",
              as: "audioConversation",
            },
          },
        ]);

        return res;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Couldn't get audio to show");
    }
  }

  public async UpdateSpeakerLabel({ agentSpeaker, clientSpeaker }: any) {
    try {
      await connectMongoDB();
      console.log(agentSpeaker[0]);

      const classificationAgent = agentSpeaker.map((el: any) => {
        return {
          conversationId: new ObjectId(el.conversationId),
          classifiedBy: el.userID,
          newLabel: 1,
        };
      });

      console.log(classificationAgent);

      const classificationClient = clientSpeaker.map((el: any) => {
        return {
          conversationId: new ObjectId(el.conversationId),
          classifiedBy: el.userID,
          newLabel: 2,
        };
      });

      const classifications = classificationAgent.concat(classificationClient);

      await ClassificationDetail.insertMany(classifications);
      console.log("Classification inserted");
    } catch (error) {
      console.error(error);
      throw new Error("Couldn't update conversations");
    }
  }

  public async SetAudioAsVoiceMail(audioId: any) {
    try {
      await connectMongoDB();
      try {
        const result = await Audio.findOneAndUpdate(
          { _id: new ObjectId(audioId) },
          {
            status: 1, // States that this audio is from voice mail
          }
        );

        if (result) {
          console.log("Audio updated to voice mail");
        } else {
          console.log("Audio to update voice mail not found");
        }
      } catch (error) {
        console.log("Error updating audio to voice mail");
      }
    } catch (error) {
      console.log("Couldn't update voice mail");
      throw new Error("Couldn't update voice mail")
    }
  }

  public async SkipAudioForUser({ userId, audioId }: IGetAudio) {
    try {
      await connectMongoDB()
      console.log(`userId: ${userId}, audioId: ${audioId}`)
      try {
        const res = await Audio.findByIdAndUpdate(new ObjectId(audioId), {
          $pull: {
            sentTo: new ObjectId(userId)
          }
        })
        if (res) {
          console.log("Audio updated and userID removed")
        } else {
          console.log("Audio not found to remove userID")
        }
      } catch (error) {
        console.log("Couldn't remove userID from audio array")
      }


    } catch (error) {
      console.log("Error removing userID from audio")
      throw new Error("Error removing userID from audio")
    }
  }
}
