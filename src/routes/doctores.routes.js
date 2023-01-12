import {Router} from 'express';

import {getDoctor,createDoctor} from '../controllers/doctores.controller.js';

const router = Router();

router.post('/api/login', getDoctor);

router.post('/api/createDoctor', createDoctor);

//router.put('/projects/:id', updateProject);

//router.delete('/projects/:id', deleteProject);

export default router;