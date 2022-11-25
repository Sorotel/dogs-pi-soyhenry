import React from 'react';
import'./card.css'

export default function Card({name, image, temperament, weightMin, weightMax, id,temperaments}){
   
    var validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(image);
    

    return (
        <div className='cartuli'>
            <h3 className='information'>{name}</h3>
            <img className='imagen' src={validateUrl? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrfzO18R6MVAALwOE1qJFv5GfXaTa2mLqlA&usqp=CAU.jpg'} alt = "imagen" width="200px" height="250px"/>
            <div>
            <h5 className='descripcion' >{weightMin} - {weightMax} KG</h5>
            <h5 className='descripcion' >{temperament}{temperaments}</h5>
            </div>
            
            
        </div>
    );
}


