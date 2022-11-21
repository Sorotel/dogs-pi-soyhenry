const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temperament} = require ('../db');


const router = Router();

const {dogTotalf,dogParams,createDog,deleteDog,} = require('../controllers/DogController');
const {tempGet} = require('../controllers/TemperamentController');
const axios = require('axios');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', dogTotalf);
router.get('/dogs/:id', dogParams);
router.get('/temperament', tempGet);
router.post('/dogs',createDog);

router.delete('/id', deleteDog);


module.exports = router;
