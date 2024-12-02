import { Request, Response } from "express";
import { AnswerModel } from "../models/AnswerModel" 
import { QuestionnairesModel } from "../models/Questionnaries"
import { QuestionsModel } from "../models/QuestionsModel"


export const createAnswer = async (req: Request, res: Response): Promise<any> => {
    try {
        const qstId = req.body.qstId
        const questionId = req.body.questionId
        const Answer = req.body.Answer


        if (!qstId || !questionId || !Answer) {
            return res.status(400).json({
                msg: "Todos los campos son obligatorios"
            });
        }


        const questionnaire = await QuestionnairesModel.findById(qstId);
        if (!questionnaire) {
            return res.status(404).json({
                msg: "Cuestionario no encontrado"
            });
        }


        const question = await QuestionsModel.findById(questionId);
        if (!question) {
            return res.status(404).json({
                msg: "Pregunta no encontrada"
            });
        }


        const newAnswer = new AnswerModel({
            qstId,
            questionId,
            Answer
        });


        await newAnswer.save();

        res.status(201).json({
            msg: "Respuesta creada exitosamente",
            answer: newAnswer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al crear la respuesta"
        });
    }
};


export const getAnswersByQuestionnaire = async (req: Request, res: Response): Promise<any> => {
    try {
        const { qstId } = req.params;


        const answers = await AnswerModel.find({ qstId });

        if (answers.length === 0) {
            return res.status(404).json({
                msg: "No se encontraron respuestas para este cuestionario"
            });
        }

        res.status(200).json({
            answers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al obtener las respuestas"
        });
    }
};

export const getAnswerById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const answer = await AnswerModel.findById(id);

        if (!answer) {
            return res.status(404).json({
                msg: "Respuesta no encontrada"
            });
        }

        res.status(200).json({
            answer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al obtener la respuesta"
        });
    }
};

export const updateAnswer = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { Answer } = req.body;


        if (!Answer) {
            return res.status(400).json({
                msg: "El campo 'Answer' es obligatorio"
            });
        }


        const updatedAnswer = await AnswerModel.findByIdAndUpdate(
            id,
            { Answer },
            { new: true }
        );

        if (!updatedAnswer) {
            return res.status(404).json({
                msg: "Respuesta no encontrada"
            });
        }

        res.status(200).json({
            msg: "Respuesta actualizada exitosamente",
            answer: updatedAnswer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al actualizar la respuesta"
        });
    }
};


export const deleteAnswer = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const deletedAnswer = await AnswerModel.findByIdAndDelete(id);

        if (!deletedAnswer) {
            return res.status(404).json({
                msg: "Respuesta no encontrada"
            });
        }

        res.status(200).json({
            msg: "Respuesta eliminada exitosamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al eliminar la respuesta"
        });
    }
}