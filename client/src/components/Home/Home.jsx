import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPerritos,getDogsDb, getTemperament,filterPerritosByTemperament,filterCreated,orderByName } from '../../actions';
import { Link } from 'react-router-dom';
import  Card  from '../Card/Card'
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";
// import './SearchBar.css';

export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs);
    const allDogsDb = useSelector((state) => state.dogs);
    const allTemperament = useSelector((state) => state.temperament);

   const [orden, setOrden] = useState(''); 
   const [currentPage,setCurrentPage] =useState(1);
   const [perritosPerPage,setPerritosPerPage] =useState(8);
   const indexOfLastPerrito= currentPage * perritosPerPage; 
   const indexOfPrimerPerrito= indexOfLastPerrito - perritosPerPage;
   const currentPerritos = allDogs.slice(indexOfPrimerPerrito,indexOfLastPerrito) //con slice corto el array para obtener una porcion por parametro 
   const currentPerritosDb = allDogsDb.slice(indexOfPrimerPerrito,indexOfLastPerrito)

  
  

  useEffect(() => {
      dispatch(getPerritos());
      dispatch(getDogsDb());
      dispatch(getTemperament());
  }, [dispatch])


  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber);
   };
   
    function handleClick(e) {
        e.preventDefault();
        dispatch(getPerritos());
    };
    
    function handleFilterTemperament(e){
        // dispatch(filterPerritosByTemperament(e.target.value));
        e.preventDefault();
        if(e.target.value === 'all'){
        dispatch(getPerritos());
        }else{
            dispatch(filterPerritosByTemperament(e.target.value));
            setCurrentPage(1);
        }
        
    };
   
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value)); 
    };

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.targuet.value}`);
    };

    return (
        <div>
            <Link to='/dogs'>Crear Perro</Link>
            <h1>Pero que grande estan los Peshooos cheeeeee</h1>

            <button onClick={(e) => { handleClick(e) }}>
                Volver a cargar los perros </button>


            <div>
                <select onChange={(e) => handleOrderByName(e)}>
                <option defaultValue='all'>Orden Alfabetico</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
               
                <select onChange={(e) =>handleFilterTemperament(e)} >
                  <option value='all'>Temperamentos</option> 
                { allTemperament.map((e,i)=>{
                    return (
                        <option key={i}>{e}</option>
                        )}
                        )
                    }   
            </select>
    
                <select onChange={(e) =>handleFilterCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
    <Paginado
        perritosPerPage={perritosPerPage}
        allDogs={allDogs.length}
        allDogsDb={allDogsDb.length}
        paginado={paginado}
        />

        <SearchBar/>

{currentPerritos?.map((e) => {
         return (
    <fragment className='cartas'>
        <Link to={"/home/" + e.id}>
    <Card name={e.name} image={e.image.url} temperament={e.temperament} weight={e.weight.metric} id={e.id} />
        </Link>
    </fragment>

                        )
                    })
                }

{/* {currentPerritosDb?.map(e => {
         return (
    <fragment className='cartas'>
        <Link to={"/home/" + e.id}>
    <Card name={e.name} image={e.image.url} temperament={e.temperament} weight={e.weight.metric} id={e.id} />
        </Link>
    </fragment>

                        )
                    })
                } */}
                
            </div>
        </div>
    )

}