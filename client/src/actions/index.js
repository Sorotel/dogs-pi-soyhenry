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

export function getTemperamentos(){
    return async function(dispatch){
        var json = await axios.get("https://localhost:3001/temperaments",{
          
        });
        return dispatch({
            type: 'GET_TEMPERAMENTOS',
            payload: json.data,
        })
}
}

export function filterPerritosByTemperamento(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENTO',
        payload
    }
}