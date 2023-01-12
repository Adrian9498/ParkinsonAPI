import app from './app.js';
import {sequelize} from './database/database.js';
import { Doctor } from './models/Doctor.js';
import { Paciente } from './models/Paciente.js';
async function main(){
    try{
        
        await sequelize.sync({force:false});
        await sequelize.authenticate();
        console.log("Conexion a la base correcta");
        app.listen(3000);
        console.log('Servidor ON');
        
    }catch(e){
        console.log(e);
    }
    
}

main();