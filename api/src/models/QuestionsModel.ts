import { Schema, model } from "mongoose";

interface IQuestion{
    tittle: String;
    type: 'radio' | 'checkbox' | 'select' | 'text',
    isMandatory:boolean
    QstId: Schema.Types.ObjectId | string;
    Answer:String;
}

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

export const AnswerModel = model ("answer", AnswerSchema);