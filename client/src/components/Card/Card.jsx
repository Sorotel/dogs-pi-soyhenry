import React from 'react';

export default function Card({name, image, temperament, weight}){
   
    return (
        <div>
            <img src={image} alt="img not found" width="200px" height="250px"/>
            <h3>{name}</h3>
            <h5>{weight} kg</h5>
            <h5>{temperament}</h5>
        </div>
    );
}