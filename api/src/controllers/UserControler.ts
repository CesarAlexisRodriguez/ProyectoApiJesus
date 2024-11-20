import { Request, Response } from "express";
import { UserModel } from "../models/UsersModels";


export const registerUsers = async (req:Request, res:Response): Promise <any>=>{
    try{
        //primero validar que los datos que necesitamos existen
        const name = req.body.name
        const email = req.body.email
        const lastNames = req.body.lastName
        const password = req.body.password
        const rol = req.body.rol
                //administradores NO PUEDEN CREAR CLIENTES
                if(req.user?.rol === "administrador" && rol  === "cliente" ){
                    return res.status(400).json({
                        msg:"No puedes crear un cliente"
                    })
                }

        if(!name || !email || !lastNames || !password || !rol){
            return res.status(400).json({
                msg:"Faltan datos para crear un usuario"
            })
        }
        //validamos que el usuario es administrador si el usuario crear es administrador
        if(rol === "administrator" && req.user?.rol != "administrador"){
            return res.status(400).json({
                msg:"no puedes crear un nuevo administrador si no eres administrador"
            })
        }

        await UserModel.create({
            name,
            lastNames,
            email,
            password,
            rol
        })
        return res.status(200).json({
            msg:"usuario registrado con exito"
        })
    }catch (error){
        console.log(error)
        return res.status(500).json({
            msg:"hubo un error al crear el usuario"
        })
    }
}