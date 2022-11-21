
const initialState = {
    dogs : [],
    allDogs : [],
    created: [],
    temperament: [],
    allDogsTemp: [],
    detail: [],
    
}
function rootReducer(state = initialState, action,){
    switch(action.type){
       //1
        case 'GET_PERRITOS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                created: action.payload,
            }
        
        //1.5
        case 'GET_NAME_PERRITOS':
            return{
                ...state,
                dogs: action.payload,
            };
        
        //2    
        case 'GET_TEMPERAMENT':
                return{
                    ...state,
                    temperament:  action.payload,// => temperamentosFiltered
                    allDogsTemp: action.payload
                }
        //3
        case 'FILTER_PERRITOS_BY_TEMPERAMENT':
            const stateAllDogs = state.allDogs;
      const filterDogs = action.payload === "all" ? stateAllDogs : stateAllDogs.filter((dog) => dog.temperament? dog.temperament.includes(action.payload) : dog.temperaments?.map((e) =>e.name)) ;
      // const filterDogsDb = action.payload === "all" ? stateAllDogs : stateAllDogs.filter((dog) => dog.temperaments?.includes(action.payload)) ;
         console.log(filterDogs, 'ASFJHAVKLUQA')
         console.log(stateAllDogs, 'PROBANDO 123')
         const probando = state.detail;
                console.log(probando)
        // console.log(stateAllDogs, 'PROBANDO 321|')
        
            return{
                ...state,
                dogs:  filterDogs, //filterDogsDb,  //temperamentFiltered 
                
            }
        //4
        case 'FILTER_CREATED':
            const allDogsDb = state.allDogs ;
            const createdFilter = action.payload === 'created' ? allDogsDb.filter(e => e.createdInDb) : allDogsDb.filter(e => !e.createdInDb)
            console.log(createdFilter,'MUESTRA LOS CREADOS?')
            return{
                ...state,
                dogs:  createdFilter,
                 
            }
        //5 
        case 'ORDER_BY_NAME':
            const ordenPerritosName = state.dogs
            let sortedArr = action.payload === 'asc' ? ordenPerritosName.sort(function (a, b) {
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            ordenPerritosName.sort(function (a, b) {
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
                allDogs: sortedArr,
            }

            //5
            case 'ORDER_BY_WEIGHT':
                const ordenPerritosWeigth =
                action.payload === "desc"
                  ? state.dogs.sort((a, b) => {
                      return b.weightMax - a.weightMax;
                    })
                  : state.dogs.sort((a, b) => {
                      return a.weightMax - b.weightMax;
                    });
              return {
                ...state,
                dogs: ordenPerritosWeigth,
              };
                

                
            //6
            case 'POST_PERRITO':
                return{
                    ...state,
                }

            //7
            case 'GET_DETAILS':
                
                
                
                return{
                    ...state,
                    detail: action.payload,
                  
                }




            default:
                return state;
    }

}

export default rootReducer;