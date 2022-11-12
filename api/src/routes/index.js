const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temperament} = require ('../db');


const router = Router();

const {dogTotalf,dogParams,createDog,} = require('../controllers/DogController');
const {tempGet} = require('../controllers/TemperamentController');
const axios = require('axios');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', dogTotalf);
router.get('/dogs/:id', dogParams);
router.get('/temperaments', tempGet);
router.post('/dogs',createDog);


module.exports = router;
