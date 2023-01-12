import  Sequelize  from "sequelize";

//Inicio de la ORM
export const sequelize = new Sequelize(
    'railway',
    'postgres',
    'mqz98kCnl3qgzbUi8M3F',
    {
        host: 'containers-us-west-54.railway.app',
        port: 5793,
        dialect : 'postgres' 
    }
);