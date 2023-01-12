import  express  from "express";
import cors from "cors";
import  doctorRoutes  from "./routes/doctores.routes.js";
import  pacienteRoutes  from "./routes/pacientes.routes.js";
import cookieParser from "cookie-parser";
import  session  from "express-session";

const oneDay = 1000*60*60*24;

const app = express();

app.use(express.json());
/*app.use(session({
    secret:'secretkey',
    saveUninitialized:true,
    cookie: {maxAge:oneDay},
    resave: false
}));*/
//app.use(cookieParser());
app.use(cors());
app.use( doctorRoutes);
app.use( pacienteRoutes);

export default app;