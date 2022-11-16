import React from 'react';

export default function Paginado({perritosPerPage, allDogs, paginado}){
    const pageNumbers = []

    for(let i=1;i<=Math.ceil(allDogs/perritosPerPage);i++){
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className='paginado'>
            { pageNumbers &&
            pageNumbers.map(number =>(
                <li className='number' key={number}>
                <a onClick={()=>paginado(number)}>{number}</a>
                </li>
            ))}
                </ul>
            </nav>
    )
}