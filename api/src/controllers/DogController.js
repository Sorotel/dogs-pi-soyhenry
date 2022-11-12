const axios = require('axios');
const { Dog, Temperament } = require('../db');


//               --> Importo la Informacion de la Api a la DB <-- 
const getApiInfo = async (req, res) => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');

    const infoApi = await apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            weight_min: e.weight.metric.split(' - ')[0] && e.weight.metric.split(' - ')[0],
            weight_max: e.weight.metric.split(' - ')[1] && e.weight.metric.split(' - ')[1],
            height_min: e.height.metric.split(' - ')[0] && e.height.metric.split(' - ')[0],
            height_max: e.height.metric.split(' - ')[1] && e.height.metric.split(' - ')[1],
            life_min: e.life_span.split(' - ')[0] && e.life_span.split(' - ')[0],
            life_max: e.life_span.split(' - ')[1] && e.life_span.split(' - ')[1],
            image: e.image.url,
            temperament: e.temperament,
        }
    });
    return infoApi;
};

//               --> Guardo en BS de DT <--
const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught: {
                attributes: [],
            },
        }
    });
};
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(DbInfo);
    return infoTotal;
};
const dogTotalf = async (req, res) => {
    const { name } = req.query
    const dogsTotal = await getAllDogs();
    if (name) {
        let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogsName ? res.status(200).send(dogsName) : res.status(400).send('El perro que buscas no existe en los regstros');
    } else {
        res.status(200).send(dogsTotal)
    }
};

//               -->Obtener Perros por ID <--
const dogParams = async (req, res) => {
    const { id } = req.params
    const dogsId = await getAllDogs();
    const idFiltro = dogsId.filter(e => e.id == id)
    if (idFiltro.length > 0) {
        res.status(200).send(idFiltro)
    } else {
        res.status(400).send('El perro que buscas no existe en los regstros')
    }
};

/*
//              --> Obtener Temperamentos <--
const tempGet = async (req, res) => {
    const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = tempApi.data.map(e => e.temperament)
    const temp = temperaments.toString().split(",")
    temp.forEach(e => {
        let i = e.trim()
        Temperament.findOrCreate({
            where: { name: i }
        })
    });
    const allTemp = await TemperamentfindAll();
    res.send(allTemp)
};
// En la linea 65 se me esta devolviendo una cadena como objeto y divido un string como un array, mas adelante en la linea 67 elimino los espacios en blanco de ambos lado del string. 

*/

//               --> Crear Perro <--
const createDog = async (req, res) => {
    const {
        name,
        weight_min,
        weight_max,
        height_min,
        height_max,
        life_min,
        life_max,
        image,
        temperament,

    } = req.body
    const perrito = {
        name,
        weight_min,
        weight_max,
        height_min,
        height_max,
        life_min,
        life_max,
        image,
    }
    try {
        const dogCreated = await Dog.create(perrito);
        let tempDb = await Temperament.findAll({
            where: { name: temperament }
        })
        dogCreated.addTemperament(tempDb)
        res.status(200).send('Creación Exitosa')
    } catch (error) {
        console.log(error)
    }
};
module.exports = {
    dogTotalf,
    dogParams,

    createDog,
};
