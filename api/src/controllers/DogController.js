const axios = require('axios');
const { Dog, Temperament } = require('../db');


//               --> Importo la Informacion de la Api a la DB <-- 


const getApiInfo = async (req, res) => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');

    const infoApi = await apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            weightMin: e.weight.metric.split(' - ')[0] && e.weight.metric.split(' - ')[0],
            weightMax: e.weight.metric.split(' - ')[1] && e.weight.metric.split(' - ')[1],
            heightMin: e.height.metric.split(' - ')[0] && e.height.metric.split(' - ')[0],
            heightMax: e.height.metric.split(' - ')[1] && e.height.metric.split(' - ')[1],
            lifeMin: e.life_span.split(' - ')[0] && e.life_span.split(' - ')[0],
            lifeMax: e.life_span.split(' - ')[1] && e.life_span.split(' - ')[1],
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
            throught: { attributes: [], },
        }
    });
};
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
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


//               --> Crear Perro <--
const createDog = async (req, res) => {
    const {
        name,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        lifeMin,
        lifeMax,
        image,
        temperament,
        createdInDb,

    } = req.body;
    
    if (!name || !weightMin || !weightMax || !heightMin || !heightMax || !lifeMin || !lifeMax || !image) {
        return res.status(400).send("Bad Request");
      }
      if (temperament?.length === 0)
        return res.json({ error: "Temperaments is required" });

    const perrito = {
        name,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        lifeMin,
        lifeMax,
        image: image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrfzO18R6MVAALwOE1qJFv5GfXaTa2mLqlA&usqp=CAU' ,
        createdInDb,
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

const deleteDog = async(req, res)=>{
    try{
        let {id} = req.params;
        await Dog.destroy({
            where: {id}
        })
        res.status(201).send('Raza eliminada')
    }catch{
        res.status(400).send('El perro que buscas no existe en los regstros')
    }
    };

module.exports = {
    dogTotalf,
    dogParams,

    createDog,
    deleteDog,
};
