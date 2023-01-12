import {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";
import { Paciente } from "./Paciente.js";

export const Doctor = sequelize.define('doctor',{
    id_doctor:{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: true
    },
    apellidos:{
        type: DataTypes.STRING,
        allowNull: true
    },
    cedula:{
        type: DataTypes.STRING,
        allowNull: true
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true
    }

},{timestamps: false});

Doctor.hasMany(Paciente,{
    foreignKey:'id_doctor',
    sourceKey:'id_doctor'
})

Paciente.belongsTo(Doctor,{
    foreignKey:'id_doctor',
    target:'id_doctor'
})