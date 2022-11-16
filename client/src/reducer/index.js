
const initialState = {
    dogs : [],
    temperament: [],
    allDogsTemp: []
}
function rootReducer(state = initialState, action){
    switch(action.type){
       //1
        case 'GET_PERRITOS':
            return{
                ...state,
                dogs: action.payload
            }
        //2    
            case 'GET_TEMPERAMENT':
                return{
                    ...state,
                    temperament:  action.payload,// => temperamentosFiltered
                    allDogsTemp: action.payload
                }
        //3
        case 'FILTER_PERRITOS_BY_TEMPERAMENT':
            const allTemperament = state.allDogsTemp
            // const temperamentFiltered = action.payload === 'All' ? allTemperament : allTemperament.filter(e => e.status === action.payload)
            let arr = [];
            allTemperament.map(e =>{
                if(e.temperament !== undefined){
                    if(e.temperament.includes(action.payload)) {
                        arr.push(e)
                    }
                }
            })
            return{
                ...state,
                allDogsTemp: arr //temperamentFiltered

            }



            default:
                return state;
    }

}

export default rootReducer;