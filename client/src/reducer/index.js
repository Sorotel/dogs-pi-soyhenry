
const initialState = {
    dogs : [],
    temperament: [],
    allDogsTemp: [],
    
}
function rootReducer(state = initialState, action){
    switch(action.type){
       //1
        case 'GET_PERRITOS':
            return{
                ...state,
                dogs: action.payload,
                allDogsTemp: action.payload,
            }
        
        //1.25
        case 'GET_NAME_PERRITOS':
            return{
                ...state,
                dogs: action.payload,
            };
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
                   // allDogsTemp: action.payload
                }
        //3
        case 'FILTER_PERRITOS_BY_TEMPERAMENT':
            console.log(state.allDogsTemp, 'ASFJHAVKLUQA')
            const allTemperament = state.allDogsTemp.map(e => ({
                id:e.id,
                name: e.name,
                weight: e.weight.metric,
                height: e.height.metric,
                life: e.life_span,
                image: e.image.url,
                temperament: e.temperament,
            }))
            const tempsFiltered = allTemperament.filter(e => e.temperament.includes(action.payload))
            return {
                ...state,
                dogs: tempsFiltered
            }
            // const allDogsT = state.dogs
            //  const temperamentFiltered = action.payload === 'All' ? allDogsT : allTemperament.filter(e => e.temperament === action.payload)
            // // let arr = [];
            // // allTemperament.map(e =>{
            // //     if(e.temperament !== undefined){
            // //         if(e.temperament.includes(action.payload)) {
            // //             arr.push(e)
            // //         }
            // //     }
            // // })
            // return{
            //     ...state,
            //     allDogsTemp: temperamentFiltered //arr

            // }
        //4
        case 'FILTER_CREATED':
            const allDogs = state.dogs
            const createdFilter = action.payload === 'created' ? allDogs.filter(e => e.createdInDb) : allDogs.filter(e => !e.createdInDb)
            return{
                ...state,
                dogs:  createdFilter
            }
        //5 
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ? state.dogs.sort(function (a, b) {
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function (a, b) {
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            }) 
            return{
                ...state,
                dogs: sortedArr,
            }

            //6
            case 'POST_PERRITO':
                return{
                    ...state,
                }



            default:
                return state;
    }

}

export default rootReducer;