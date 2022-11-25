import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../actions';
import { useEffect } from 'react';

import './detail.css'

export default function Detail(id){
    
    const dispatch = useDispatch();
    const myPerrito = useSelector((state)=> state.detail);

  var validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(myPerrito[0]?.image);


    useEffect(()=> {
        dispatch(getDetails(id));
    },[dispatch]);


 return (
    <div className='detalleestructura'>
        {
            myPerrito[0] && myPerrito[0].name ? 
            <div className='detalleinformacion'>
        <Link to = '/home'>
            <button className='botonvolver'>Volver</button>
        </Link>
                <img className='detalleimagen'
                src={validateUrl? myPerrito[0].image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrfzO18R6MVAALwOE1qJFv5GfXaTa2mLqlA&usqp=CAU.jpg'}
                alt = "imagenPerrito"
                // src= {myPerrito[0].img? myPerrito[0].img : myPerrito[0].image} 
                // alt ='img' width="500px" height="500px"
                />
                <h1 className='detallenombre'>{myPerrito[0].name}</h1>
                <h2 className='detalletemperamentos'>Temperamentos: { !myPerrito[0].createdInDb? myPerrito[0].temperament + ' ' : myPerrito[0].temperaments.map(el => el.name + (' '))}</h2>
                <h5 className='detalledescripcion'> Peso: {myPerrito[0].weightMin} - {myPerrito[0].weightMax} KG </h5>
                <h5 className='detalledescripcion'> Altura: {myPerrito[0].heightMin} - {myPerrito[0].heightMax} CM </h5>
                <h5 className='detalledescripcion'> Promedio de Vida: {myPerrito[0].lifeMin} - {myPerrito[0].lifeMax} </h5>
                
            </div>  : <p>Loading...</p>
        }
    </div>
 )   

}