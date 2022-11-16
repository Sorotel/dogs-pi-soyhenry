
const initialState = {
    dogs : [],
    temperamentos: []
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
            case 'GET_TEMPERAMENTO':
                return{
                    ...state,
                    temperamentos:  action.payload // => temperamentosFiltered
                }
        //3
        case 'FILTER_BY_TEMPERAMENTO':
            const alldogs = state.dogs
            const dogsFiltered = action.payload === 'All' ? alldogs : alldogs.filter(e => e.status === action.payload)
            return{
                ...state,
                dogs: dogsFiltered

            }



            default:
                return state;
    }

}

export default rootReducer;