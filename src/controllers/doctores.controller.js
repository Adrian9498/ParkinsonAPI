import { Doctor} from "../models/Doctor.js";

export const getDoctor = async (req,res) => {
    try{
        const {correo,password} = req.body;
        const response = await Doctor.findAll({where:{correo,password}});
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({"error": err.message});
    }
}

export const createDoctor = async (req, res) => {
    try{
        const {nombre,apellidos,cedula,correo,telefono,password} = req.body;

        const createDoctor = await Doctor.create({
            nombre,
            apellidos,
            cedula,
            correo,
            telefono,
            password
        }); 

        res.status(200).json(createDoctor);
    }catch(err){
        res.status(500).json({"error": err.message});
    }
}