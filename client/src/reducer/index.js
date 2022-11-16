
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
        //1.5
        case 'GET_PERRITOS_DB':
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
             const temperamentFiltered = action.payload === 'All' ? allTemperament : allTemperament.filter(e => e.status === action.payload)
            // let arr = [];
            // allTemperament.map(e =>{
            //     if(e.temperament !== undefined){
            //         if(e.temperament.includes(action.payload)) {
            //             arr.push(e)
            //         }
            //     }
            // })
            return{
                ...state,
                allDogsTemp: temperamentFiltered //arr

            }
        //4
        case 'FILTER_CREATED':
            const allDogs = state.dogs
            const createdFilter = action.payload === 'created' ? allDogs.filter(e => e.createdInDb) : allDogs.filter(e => !e.createdInDb)
            return{
                ...state,
                dogs:  createdFilter
            }
       



            default:
                return state;
    }

}

export default rootReducer;