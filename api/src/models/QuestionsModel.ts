import { Schema, model } from "mongoose";
import { IQuestion } from "../GlobalTypes";



const QuestionSchema = new Schema<IQuestion>({
    tittle:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ['radio', 'checkbox', 'select' , 'text'],
        required: true
    },
    isMandatory:{
        type: Boolean,
        required: true
    },
    QstId:{
        type: Schema.Types.ObjectId,
        ref:"questions",
        required: true
    },
    Answer:{
        type: String,
        required: true
    }
});

export const QuestionModel = model ("question", QuestionSchema);