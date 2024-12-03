import { Request, Response } from "express";
import { QuestionsModel } from "../models/QuestionsModel";
import mongoose from "mongoose";

export const createQuestion = async (req: Request, res: Response): Promise<any> => {
    try {
        const tittle = req.body.tittle
        const type = req.body.type
        const isMandatory = req.body.isMandatory
        const QstId = req.body.QstId
        const Answer = req.body.Answer

        if (!tittle || !type || isMandatory === undefined || !QstId || !Answer) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        const validTypes = ['radio', 'checkbox', 'select', 'text'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                msg: `El tipo de pregunta no es válido. Tipos permitidos: ${validTypes.join(", ")}`,
            });
        }

        
        if (!mongoose.Types.ObjectId.isValid(QstId)) {
            return res.status(400).json({ msg: "QstId no es un ObjectId válido" });
        }

        
        const newQuestion = await QuestionsModel.create({
            tittle,
            type,
            isMandatory,
            QstId,
            Answer,
        });

        return res.status(200).json({
            msg: "Pregunta creada exitosamente",
            question: newQuestion,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Hubo un error al crear la pregunta",
        });
    }
};
