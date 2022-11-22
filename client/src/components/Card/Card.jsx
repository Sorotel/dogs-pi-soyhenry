import React from 'react';
import'./card.css'

export default function Card({name, image, temperament, weightMin, weightMax, id,temperaments}){
   
    

    return (
        <div classname = 'emprolijado'>
            <img src={image} alt="img not found" width="200px" height="250px"/>
            <h3>{name}</h3>
            <h5>{weightMin} - {weightMax} KG</h5>
            <h5>{temperament}{temperaments}</h5>
            
        </div>
    );
}


