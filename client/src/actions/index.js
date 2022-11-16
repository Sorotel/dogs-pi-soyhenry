import axios from 'axios';

export function getPerritos(){
    return async function(dispatch){
        var json = await axios.get("https://api.thedogapi.com/v1/breeds",{

        });
        return dispatch({
        type: 'GET_PERRITOS',
        payload: json.data,
        })
    }
}

export function getTemperament(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/temperaments")
        return dispatch({
            type: 'GET_TEMPERAMENT',
            payload: json.data,
        })
}
}

export function filterPerritosByTemperament(payload){
    return{
        type: 'FILTER_PERRITOS_BY_TEMPERAMENT',
        payload
    }
}