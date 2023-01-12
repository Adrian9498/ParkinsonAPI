import {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";

export const Paciente = sequelize.define('paciente',{
    id_paciente:{
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
    edad:{
        type: DataTypes.INTEGER,
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
    direccion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    peso:{
        type: DataTypes.REAL,
        allowNull: true 
    },
    estatura:{
        type: DataTypes.REAL,
        allowNull: true 
    }

},{timestamps: false});