const axios = require('axios');
const { Dog, Temperament } = require('../db');

//              --> Obtener Temperamentos <--
const tempGet = async (req, res) => {
    const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
   let tempMap = tempApi.data.map(e=> e.temperament).toString();
   tempMap = await tempMap.split(',');
   const tempAll = await tempMap.map(e=>{
    if(e[0] ==' '){
        return e.split('')
    }
    return e;
   });
   const tempArreglo = await tempAll.map(e=>{
    if(Array.isArray(e)){
        e.shift();
        return e.join('');
    }
    return e;
   })
await tempArreglo.forEach(e => {
    if(e != ''){
        Temperament.findOrCreate({
            where :{name: e},
        })
    }
    
});
const tempFinal = await Temperament.findAll()
const tempSuperFinal = tempFinal.map(e=>e.name) 
res.status(200).send(tempSuperFinal)

};


module.exports = {
       tempGet,
    };
