import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPerritos, getTemperament,filterPerritosByTemperament,filterCreated,orderByName,orderByWeight } from '../../actions';
import { Link } from 'react-router-dom';
import  Card  from '../Card/Card'
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";
import './home.css';


export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs);
    
    const allTemperament = useSelector((state) => state.temperament);

   const [orden, setOrden] = useState(''); 
   const [currentPage,setCurrentPage] =useState(1);
   const [perritosPerPage,setPerritosPerPage] =useState(8);
   const indexOfLastPerrito= currentPage * perritosPerPage; 
   const indexOfPrimerPerrito= indexOfLastPerrito - perritosPerPage;
   const currentPerritos = allDogs.slice(indexOfPrimerPerrito,indexOfLastPerrito) //con slice corto el array para obtener una porcion por parametro 


  
  

  useEffect(() => {
      dispatch(getPerritos());
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
        e.preventDefault();
        if(e.target.value === 'all'){
        dispatch(getPerritos());
        }else{
            dispatch(filterPerritosByTemperament(e.target.value));
            setCurrentPage(1);
        }
        
    };
   
    function handleFilterCreated(e){
        e.preventDefault();
        if(e.target.value === 'all'){
            dispatch(getPerritos());
            }else{
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1)
            }; 
    };

    function handleOrderByName(e){
        
        if(e.target.value === 'all'){
            dispatch(getPerritos());
            }else{
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
            };
    };

    function handleOrderByWeight(e){
         if(e.target.value === 'all'){
            dispatch(getPerritos());
        }else{
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
            };
    };
    
    return (
        <div className='estructura'>
            <div className='introduccion'>
                            <img className='lhome' src={'https://www.perrospedia.com/wp-content/uploads/2013/05/perro-hueso.gif'} alt='logopagina'/>

            <h1 className='titulo'>Sabueso perdio su hueso</h1>
            
            <SearchBar/>


            <button className='create' onClick={(e) => { handleClick(e) }}>
                Volver a cargar los perros </button>

            <Link className='create' to='/create'>Crea tu raza de perro</Link>
            </div>

            <div className='contenidoselects'>
                <select className='listaselect' onChange={(e) => handleOrderByName(e)}>
                <option defaultValue='all'>Orden Alfabetico</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>

                <select className='listaselect' onChange={e=>handleOrderByWeight(e)}>
                <option value="all">Orden Por Peso</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
               
                <select className='listaselect' onChange={(e) =>handleFilterTemperament(e)} >
                  <option defaultValue='All'>Temperamentos</option> 
                { allTemperament.map((e,i)=>{
                    return (
                        <option key={i}>{e}</option>
                        )}
                        )
                    }   
            </select>
    
                <select className='listaselect' onChange={(e) =>handleFilterCreated(e)}>
                    <option defaultValue='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
    <Paginado
        allDogs={allDogs.length}
        perritosPerPage={perritosPerPage}
        paginado={paginado}
        />


    <div className='cartas'>

{currentPerritos?.map((e,i) => {
    return (
        <div key={i} >
        <Link className="cartaLink" to={"/dogs/" + e.id}
        >
    <Card className="cartaDetalle"
    name={e.name}
    image={e.image}
    />
        </Link>
    </div>

)
})
}
</div>


                
            </div>
        </div>
    )

}