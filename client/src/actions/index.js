import axios from 'axios';

export function getPerritos(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs",{

        });
        return dispatch({
        type: 'GET_PERRITOS',
        payload: json.data,
        })
    }
}

export function getNamePerritos(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: 'GET_NAME_PERRITOS',
                payload: json.data,
            })
        }catch(error){
            console.log(error)
        }
    }
}



export function getTemperament(){
    return async function(dispatch){
        var info = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: 'GET_TEMPERAMENT',
            payload: info.data,
        })
}
}

export function filterPerritosByTemperament(payload){
    return{
        type: 'FILTER_PERRITOS_BY_TEMPERAMENT',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function postPerrito(payload){
    return async function(dispatch) {
        const response = await axios.post("http://localhost:3001/dogs",payload)
        return response;
    }
}

export function getDetails(id){
    return async function(dispatch) {
        try{
            var json = await axios.get(`http://localhost:3001/dogs/${id.id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data,
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function cleanDetail(){
    return{
        type: 'CLEAN_DETAIL'
    }
}

