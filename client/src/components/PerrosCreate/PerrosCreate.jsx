import React, {useState, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {getPerritos,postPerrito, getTemperament, filterPerritosByTemperament} from '../../actions';
import { useDispatch,useSelector } from 'react-redux'

export default function PerritoCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperament);
    

    const [input, setInput] = useState({
        name: "",
        weight_min: "",
        weight_max: "",
        height_min: "",
        height_max: "",
        life_min: "",
        life_max: "",
        image: "",
        temperament: [],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelectionChange(e){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPerrito(input));
        alert("PERRITO CREADO CON EXITO.")
        setInput({
            name: "",
            weight_min: "",
            weight_max: "",
            height_min: "",
            height_max: "",
            life_min: "",
            life_max: "",
            image: "",
            temperament: [],
        })
        history.push('/home');
    }

    useEffect(() =>{
        dispatch(getTemperament());
    },[]);

    function handleFilterTemperament(e){
        // dispatch(filterPerritosByTemperament(e.target.value));
        e.preventDefault();
        if(e.target.value === 'all'){
        dispatch(getPerritos());
        }else{
            dispatch(filterPerritosByTemperament(e.target.value));
            
        }}
        

    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Cree su Perrito "Dr. Frenkestein"</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label>Nombre: </label>
                        <input 
                        type='text'
                        value= {input.name}
                        name="name" 
                        placeholder='Nombre de la Raza'
                        onChange={(e)=>handleChange(e)}
                        /> 
                    </div>
                    <div>
                        <label>Peso Minimo: </label>
                        <input 
                        type='text'
                        value= {input.weight_min}
                        name="weight_min"
                        placeholder='KG'
                        onChange={(e)=>handleChange(e)} 
                        />
                    </div>
                    <div>
                        <label>Peso Maximo: </label>
                        <input 
                        type='text'
                        value= {input.weight_max}
                        name="weight_max"
                        placeholder='KG'
                        onChange={(e)=>handleChange(e)} 
                        />
                    </div>
                    <div>
                        <label>Altura Minima: </label>
                        <input 
                        type='text'
                        value= {input.height_min}
                        name="height_min"
                        placeholder='CM'
                        onChange={(e)=>handleChange(e)} 
                        />
                    </div>
                    <div>
                        <label>Altura Maxima: </label>
                        <input 
                        type='text'
                        value= {input.height_max}
                        name="height_max"
                        placeholder='CM'
                        onChange={(e)=>handleChange(e)} 
                        />
                    </div>
                    <div>
                        <label>Edad minima: </label>
                        <input 
                        type='text'
                        value= {input.life_min}
                        name="life_min"
                        placeholder='Estimativo minimo de vida'
                        onChange={(e)=>handleChange(e)} 
                        />
                    </div>
                    <div>
                        <label>Edad Maxima: </label>
                        <input 
                        type='text'
                        value= {input.life_max}
                        name="life_max"
                        placeholder='Estimativo maximo de vida'
                        onChange={(e)=>handleChange(e)} 
                        />
                    </div>
                    <div>
                        <label>Imagen: </label>
                        <input 
                        type='text'
                        value= {input.image}
                        name="image"
                        placeholder='URL de la imagen...'
                        onChange={(e)=>handleChange(e)} 
                        /> 
                    </div>

                    <div>
                        <label>Temperamentos: </label>
                        <select onChange={(e) =>handleSelectionChange(e)} >

                  <option value='all'>Temperamentos</option> 
                { temperaments.map((e,i)=>{
                    return (
                        <option key={i}>{e}</option>
                        )}
                        )
                    }   
            </select>
            <ul><li>{input.temperament.map(el=> el+ " ,")}</li></ul>
                    </div>

                    <button type='submit'>Crear Personaje</button>
                
                </form>
        </div>
    )

}