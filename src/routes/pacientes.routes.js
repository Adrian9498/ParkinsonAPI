import {Router} from 'express';


import {getPacientes,createPaciente,updatePaciente, deletePaciente} from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/', (req,res)=>{
    /*let session;
    session = req.session;
    if (session.userid) {
        res.sendFile('views/index.html',{root:__dirname});
    }*/

})

router.get('/api/pacientes/:id', getPacientes);

router.post('/api/createPaciente', createPaciente);

router.put('/api/updatePaciente/:id', updatePaciente);

router.delete('/api/deletePaciente/:id', deletePaciente);

export default router;