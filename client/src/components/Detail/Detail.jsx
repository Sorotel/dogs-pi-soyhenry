import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../actions';
import { useEffect } from 'react';

export default function Detail(id){
    
    const dispatch = useDispatch();
    const myPerrito = useSelector((state)=> state.detail);

   // var validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(myPerrito[0].image);

console.log(myPerrito,'DONDE TAN LOS PESHOOOOOS')
    useEffect(()=> {
        dispatch(getDetails(id));
    },[dispatch]);


 return (
    <div>
        {
            myPerrito[0] && myPerrito[0].name ? 
            <div>
                <h1>{myPerrito[0].name}</h1>
                <img 
                // src={validateUrl? myPerrito[0].image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrfzO18R6MVAALwOE1qJFv5GfXaTa2mLqlA&usqp=CAU.jpg'}
                // alt = "imagenPerrito"
                src= {myPerrito[0].img? myPerrito[0].img : myPerrito[0].image} 
                alt ='img' width="500px" height="500px" />
                <h2>Temperamentos: { !myPerrito[0].createdInDb? myPerrito[0].temperament + ' ' : myPerrito[0].temperaments.map(el => el.name + (' '))}</h2>
                <h4> Peso: {myPerrito[0].weightMin} - {myPerrito[0].weightMax} KG </h4>
            </div>  : <p>Loading...</p>
        }
        <Link to = '/home'>
            <button>Volver</button>
        </Link>
    </div>
 )   

}