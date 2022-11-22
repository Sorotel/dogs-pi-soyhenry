import React from 'react';

import './paginado.css'


export default function Paginado({perritosPerPage, allDogs, paginado}){
    const pageNumbers = []

    for(let i=1;i<=Math.ceil(allDogs/perritosPerPage);i++){
        pageNumbers.push(i)
    }
    return(
        <nav className='paginado'>
            <ul className='lista'>
            { pageNumbers && pageNumbers.map(number =>(
                <li className='number' key={number}>
                <a onClick={()=>paginado(number)}>{number}</a>
                
                </li> 
            ))}
                </ul>
            </nav>
    )
}


