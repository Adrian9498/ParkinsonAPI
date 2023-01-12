import {Paciente} from "../models/Paciente.js";
import {Doctor} from "../models/Doctor.js";

export const getPacientes = async (req,res) => {
    try{
        const {id} = req.params;
        const response = await Paciente.findAll({where:{id_doctor:id}});
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({"error": err.message});
    }
}

export const createPaciente = async (req, res) => {
    try{
        const {nombre,apellidos,edad,correo,telefono,direccion,peso,estatura,id_doctor} = req.body;

        const createPaciente = await Paciente.create({
            nombre,
            apellidos,
            edad,
            correo,
            telefono,
            direccion,
            peso,
            estatura,
            id_doctor
        }); 

        res.status(200).json(createPaciente);
    }catch(err){
        res.status(500).json({"error": err.message});
    }
}

export const updatePaciente = async (req, res) => {
    try {
        const {id} = req.params;
        //const {nombre,apellidos,edad,correo,telefono,direccion,peso,estatura,id_doctor} = req.body;

        const paciente = await Paciente.findByPk(id);

        paciente.set(req.body);

        await paciente.save();

        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({"error": error.message});
    }
}

export const deletePaciente = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Paciente.destroy({
            where: {id_paciente: id}
        })

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({"error": error.message});
    }
    
}