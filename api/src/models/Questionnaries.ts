import { Schema, model } from "mongoose";
import { IQuestionnaries } from "../GlobalTypes";



const questionnairesSchema = new Schema<IQuestionnaries>({
    tittle:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required:true
    } 
});

export const QuestionnairesModel = model ("users", questionnairesSchema );