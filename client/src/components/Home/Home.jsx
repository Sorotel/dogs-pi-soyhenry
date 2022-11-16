import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPerritos, getTemperament,filterPerritosByTemperament } from '../../actions';
import { Link } from 'react-router-dom';
import  Card  from '../Card/Card'
import Paginado from '../Paginado/Paginado';

export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs);
    const allTemperament = useSelector((state) => state.allDogsTemp);
   const [currentPage,setCurrentPage] =useState(1);
   const [perritosPerPage,setPerritosPerPage] =useState(8);
   const indexOfLastPerrito= currentPage * perritosPerPage; 
   const indexOfPrimerPerrito= indexOfLastPerrito - perritosPerPage;
   const currentPerritos = allDogs.slice(indexOfPrimerPerrito,indexOfLastPerrito) //con slice corto el array para obtener una porcion por parametro
  console.log(allDogs,'ACA TRAEME PERRITOS')
  console.log(allTemperament,'ACA TRAEME TEMPERAMENTOS')
   const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber);
   }
   
    useEffect(() => {
        dispatch(getPerritos());
        dispatch(getTemperament());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPerritos());
    }
    
    function handleFilterTemperament(e){
        dispatch(filterPerritosByTemperament(e.targuet.value))
        setCurrentPage(1)
    }
   

    return (
        <div>
            <Link to='/dog'>Crear Perro</Link>
            <h1>Pero que grande estan los Peshooos cheeeeee</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar los perros </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
               
                <select onChange={e =>handleFilterTemperament(e)} >
                  <option value='all'>Temperamentos</option> 
                { allTemperament.map((e,i)=>{
                 return (
                    <option key={i}> {e.name} </option>
                 )}
                  )
              }   
            </select>
                     


                <select>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
    <Paginado
        perritosPerPage={perritosPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
    />
{currentPerritos?.map(e => {
         return (
    <fragment className='cartas'>
        <Link to={"/home/" + e.id}>
    <Card name={e.name} image={e.image.url} temperament={e.temperament} weight={e.weight.metric} weight_max={e.weight_max} />
        </Link>
    </fragment>

                        )
                    })
                }
            </div>
        </div>
    )

}