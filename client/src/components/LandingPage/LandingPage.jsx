import React from 'react';
import { Link } from 'react-router-dom';
import  './landing.css';

export default function LandingPage(){
    return(
        

        <div className='landing'>
            <h1 className='tituloLanding'> Bienvenidos vamos a ver diferentes razas de perros </h1>
            <Link to = '/home'>
            <button className='bottonLanding'>Ingresar</button>
            </Link>
            </div>
       
    )
}