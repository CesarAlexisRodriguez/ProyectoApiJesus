import { Schema, model } from "mongoose";
import { IOpcions } from "../GlobalTypes";



const OpcionsSchema = new Schema<IOpcions>({
    title:{
        type: String,
        required: true
    },
    questionId:{
        type: Schema.Types.ObjectId,
        ref: "questions",
        required:true
    }
});

export const OpcionsModel = model ("question", OpcionsSchema);