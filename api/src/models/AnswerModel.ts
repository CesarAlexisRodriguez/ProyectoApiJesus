import { Schema, model } from "mongoose";
import { IAnswer } from "../GlobalTypes";



const AnswerSchema = new Schema<IAnswer>({
    qstId:{
        type: Schema.Types.ObjectId,
        ref: "questionnaires",
        required:true
    },
    questionId:{
        type: Schema.Types.ObjectId,
        ref: "questions",
        required:true
    },
    Answer:{
        type: String,
        required: true
    }
});

export const AnswerModel = model ("answer",  AnswerSchema);