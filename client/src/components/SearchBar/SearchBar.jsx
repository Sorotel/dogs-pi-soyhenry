import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePerritos } from "../../actions";

import './search.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePerritos(name));
        
    }

    return(
        <div className="principal">
            <input
            className="search"
            type = 'text'
            placeholder= "Buscar Raza..."
            onChange={(e) => handleInputChange(e)}
            value={name}
            /><button className="buttonSearch" type= 'submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}