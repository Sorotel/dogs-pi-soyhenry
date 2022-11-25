import React, {useState, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {getPerritos,postPerrito, getTemperament,} from '../../actions';
import { useDispatch,useSelector } from 'react-redux'
import './perrocreate.css'

function validate(input) {
    let errors ={};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    }else if(!input.weightMin){
        errors.weightMin = 'Se requiere un peso minimo';
}else if(!input.weightMax){
    errors.weightMax = 'Se requiere un peso maximo';
}else if(!input.heightMin){
    errors.heightMin = 'Se requiere una altura minimo';
}else if(!input.heightMax){
    errors.heightMax = 'Se requiere una altura maximo';
}else if(!input.lifeMin){
    errors.lifeMin = 'Se requiere un promedio minimo de vida';
}else if(!input.lifeMax){
    errors.lifeMax = 'Se requiere un promedio maximo de vida';
}else if(!input.image){
    errors.image = 'Se requiere un url para la imagen';
}else if(!input.temperament){
    errors.temperament = 'Se requiere al menos un Temperamento';
}
return errors;
};

// function validateData(input){
//     let error ={};
//     if(input.name !== /([A-Z])\w+/){
//         error.name = 'El nombre debe contener solo caracteres de la A a la Z'
//     } else 
// }



export default function PerritoCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperament = useSelector((state) => state.temperament);
    const [errors, setErrors] = useState({});
    

    const [input, setInput] = useState({
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        lifeMin: "",
        lifeMax: "",
        image: "",
        temperament: [],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelectionChange(e){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        const errorSubmit = validate(input)
        if(Object.values(errorSubmit).length !== 0 || !input.temperament.length){
            alert('Datos erroneos o faltantes')
        }else{
         dispatch(postPerrito(input));
        alert('¡Perrito creado con exito!')
        setInput({
                    name: "",
                    weightMin: "",
                    weightMax: "",
                    heightMin: "",
                    heightMax: "",
                    lifeMin: "",
                    lifeMax: "",
                    image: "",
                    temperament: [],
        })
        history.push('/home')
    }
    }


    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== el)
        })
    }

    useEffect(() =>{
        dispatch(getTemperament());
    },[]);

        

    return(
        <div className='createestructura'>
            <img className='logohome' src={'https://www.perrospedia.com/wp-content/uploads/2013/05/perro-hueso.gif'} alt='logopagina'/>
            <h1 className='titulocreation'>Cree su Raza de perro, "Dr. Frenkestein"</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label className='label'>Nombre: </label>
                        <input className='complete'
                        type='text'
                        value= {input.name}
                        name="name" 
                        placeholder='Nombre de la Raza'
                        onChange={(e)=>handleChange(e)}
                        /> 
                        {errors.name &&(
                            <p className='error' >{errors.name}</p>
                            )}
                    </div>
                    <div>
                        <label className='label'>Peso Minimo: </label>
                        <input className='complete'
                        type='text'
                        value= {input.weightMin}
                        name="weightMin"
                        placeholder='KG'
                        onChange={(e)=>handleChange(e)} 
                        />
                         {errors.weightMin &&(
                             <p className='error' >{errors.weightMin}</p>
                             )}
                    </div>
                    <div>
                        <label className='label'>Peso Maximo: </label>
                        <input className='complete'
                        type='text'
                        value= {input.weightMax}
                        name="weightMax"
                        placeholder='KG'
                        onChange={(e)=>handleChange(e)} 
                        />
                         {errors.weightMax &&(
                             <p className='error' >{errors.weightMax}</p>
                             )}
                    </div>
                    <div>
                        <label className='label'>Altura Minima: </label>
                        <input className='complete'
                        type='text'
                        value= {input.heightMin}
                        name="heightMin"
                        placeholder='CM'
                        onChange={(e)=>handleChange(e)} 
                        />
                         {errors.heightMin &&(
                             <p className='error' >{errors.heightMin}</p>
                             )}
                    </div>
                    <div>
                        <label className='label'>Altura Maxima: </label>
                        <input className='complete'
                        type='text'
                        value= {input.heightMax}
                        name="heightMax"
                        placeholder='CM'
                        onChange={(e)=>handleChange(e)} 
                        />
                         {errors.heightMax &&(
                             <p className='error' >{errors.heightMax}</p>
                             )}
                    </div>
                    <div>
                        <label className='label'>Edad minima: </label>
                        <input className='complete'
                        type='text'
                        value= {input.lifeMin}
                        name="lifeMin"
                        placeholder='Estimativo minimo de vida'
                        onChange={(e)=>handleChange(e)} 
                        />
                         {errors.lifeMin &&(
                             <p className='error' >{errors.lifeMin}</p>
                             )}
                    </div>
                    <div>
                        <label className='label'>Edad Maxima: </label>
                        <input className='complete'
                        type='text'
                        value= {input.lifeMax}
                        name="lifeMax"
                        placeholder='Estimativo maximo de vida'
                        onChange={(e)=>handleChange(e)} 
                        />
                         {errors.lifeMax &&(
                             <p className='error' >{errors.lifeMax}</p>
                             )}
                    </div>
                    <div>
                        <label className='label'>Imagen: </label>
                        <input className='complete'
                        type='text'
                        value= {input.image}
                        name="image"
                        placeholder='URL de la imagen...'
                        onChange={(e)=>handleChange(e)} 
                        /> 
                         {errors.image &&(
                             <p className='error' >{errors.image}</p>
                             )}
                    </div>

                    <div>
                        <label className='label'>Temperamentos: </label>
                        <select className='complete'
                        onChange={(e) =>handleSelectionChange(e)} >

                  {/* {errors.temperament &&(
                      <p className='error' >{errors.temperament}</p>
                              )} */}
                  <option 
                  value='all'>Temperamentos</option> 
                { temperament.map((e,i)=>{
                    return (
                        <option 
                        className='complete'
                        key={i}>{e}</option>
                        )}
                        )
                    }   
            </select>
            {/* <ul><li >{input.temperament.map(el=> el+ " ,")}</li></ul> */}

                {input.temperament.map((el,i)=>
                    <div className='divTemp' key={i}>
                        <p>{el}</p>
                        <button className='botonX' onClick={()=>handleDelete(el)}>x</button>
                    </div>
                        )}
                    </div>

                    <Link  to='/home'><button className='creation'>Volver</button></Link>
                   
                    <button className='creation' type='submit' onClick={(e)=>handleSubmit(e)}>Crear Perrito</button>
                
                </form>

        </div>
    )

}