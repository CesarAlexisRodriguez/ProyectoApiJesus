import { Schema } from "mongoose";

export interface IUser {
    name:string;
    email:string;
    lastNames:string;
    password:string;
    rol: "administrador" | "client";
}

export interface IQuestion{
    tittle: String;
    type: 'radio' | 'checkbox' | 'select' | 'text',
    isMandatory:boolean
    QstId: Schema.Types.ObjectId | string;
    Answer:String;
}

export interface IQuestionnaries{
    tittle: String;
    description: String;
    userId: Schema.Types.ObjectId | string;
    
}

export interface IOpcions{
    title: String;
    questionId: Schema.Types.ObjectId | string;
    
}

export interface IAnswer{
    qstId: Schema.Types.ObjectId | String;
    questionId: Schema.Types.ObjectId | string;
    Answer: String;
}
