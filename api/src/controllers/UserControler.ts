import { Request, Response } from "express";
import { UserModel } from "../models/UsersModels";
import jwt from 'jsonwebtoken';


export const registerUsers = async (req:Request, res:Response): Promise <any>=>{
    try{
        //primero validar que los datos que necesitamos existen
        const name = req.body.name
        const email = req.body.email
        const lastNames = req.body.lastNames
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
        
        const user = await UserModel.create({
            name,
            lastNames,
            email,
            password,
            rol
        })
        const token = jwt.sign(JSON.stringify(user), 'pocoyo');
        
        return res.status(200).json({
            msg:"usuario registrado con exito", token
            
        })
    }catch (error){
        console.log(error)
        return res.status(500).json({
            msg:"hubo un error al crear el usuario"
        })
    }
}

export const singin = async (req:Request, res:Response): Promise<any>=>{
    try {
        const user = await UserModel.findOne({email:req.body.email, password:req.body.password})
        
       if(!user){
        res.status(400).json({
            msg: 'No hay concidencias en el sistema'
        })
        return; 
       }
       const token = jwt.sign(JSON.stringify(user),"pocoyo");
       res.status(200).json({msg: 'Sesion iniciada con exito', token, user})
       return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hubo un error al iniciar sesion"
        })
    }

}


