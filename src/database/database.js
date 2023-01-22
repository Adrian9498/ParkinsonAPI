import  Sequelize  from "sequelize";

//Inicio de la ORM
export const sequelize = new Sequelize(
    'railway',
    'postgres',
    'WD5HsM0kK2TjH68XNDWl',
    {
        host: 'containers-us-west-54.railway.app',
        port: 5793,
        dialect : 'postgres' 
    }
);