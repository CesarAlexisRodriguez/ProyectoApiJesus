import { Schema, model } from "mongoose";

interface IAnswer{
    qstId: Schema.Types.ObjectId | String;
    questionId: Schema.Types.ObjectId | string;
    Answer: String;
}

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