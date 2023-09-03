import { now } from "moment";
import mongoose, { Schema } from "mongoose";

export const Audio = mongoose.models.Audio ?? mongoose.model("Audio", new Schema({
    audioName: String,
    length: Number,
    status: {
        type: Number,
        default: 0
    },
    sentTo: {
        type: [String] // USER ID
    },
    classifiedAt: {
        type: Date,
        default: new Date()
    }
}))

export const ClassificationDetail = mongoose.models.ClassificationDetail ?? mongoose.model("ClassificationDetail", new Schema({
    classifiedBy: String,
    newLabel: String,
    classifiedAt: {
        type: Date,
        default: new Date()
    }
}))

export const Conversation = mongoose.models.Conversation ?? mongoose.model("Conversation", new Schema({
    audioId: String,
    originalSpeaker: String,
    message: String,
    labeledTranscriptions: {
        type: [ClassificationDetail.schema]
    }
}))

export const User = mongoose.models.User ?? mongoose.model("User", new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    dailyGoal: {
        type: Number,
        default: 100
    }
}))
