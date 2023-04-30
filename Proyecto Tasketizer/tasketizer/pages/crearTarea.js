import React from 'react'
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
export default function crearTarea() {

  //definiciones iniciales
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  useEffect(() => {
    buscarEstados();
    buscarPrioridades();
    buscarTemas();//al iniciar buscas todo esto

  }, []);

  const router = useRouter();

  const [estados, setEstados] = useState([]);//para poner opciones en los select
  const [temas, setTemas] = useState([]);
  const [prioridades, setPrioridades] = useState([]);




  //funciones

  const buscarEstados = async () => {
    var id = getCookie("id");//coges los estados del usuario por id
    let response = await fetch('http://localhost:3000/api/estados/obtenerEstadosPorUsuario?id=' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setEstados(response)
    console.log(response)
  }

  const buscarPrioridades = async () => {
    var id = getCookie("id");//coges las prioridades del usuario por id
    let response = await fetch('http://localhost:3000/api/prioridades/obtenerPrioridadesPorUsuario?id=' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setPrioridades(response)
    console.log(response)
  }


  const buscarTemas = async () => {
    var id = getCookie("id");//coges los temas del usuario por id
    let response = await fetch('http://localhost:3000/api/temas/obtenerTemasPorUsuario?id=' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setTemas(response)
    console.log(response)
  }


  const onSubmit = async (data) => {

    const titulo = data.titulo
    const descripcion = data.descripcion
    const fechaLimite = data.fecha
    const estado = data.estado
    const tema = data.tema
    const prioridad = data.prioridad//coges datos del form
    var idUsuario = getCookie("id");
    console.log(fechaLimite)

    try {
      let response = await fetch('http://localhost:3000/api/tareas/crearTarea', {
        method: 'POST',
        body: JSON.stringify({ titulo, descripcion, fechaLimite, estado, tema, prioridad, idUsuario }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();

      if (response != null) {//creas la tarea y navegas
        router.push("/vistaTareas/" + idUsuario);
      }

    } catch (errorMessage) {
      console.log(errorMessage);
    }


  }



  return (
    <div>
      <div className='exterior bg-naranja-claro p-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='container mx-auto bg-white rounded-lg'>
          <h1 className='text-center text-5xl font-bold'>Crear tarea</h1>


          <div className='contenedor-columnas flex md:flex-row flex-col mt-4' >

            {/*col izq*/}
            <div className='columna-izquierda p-7  md:w-1/2 w-full  flex flex-col'>


              {/**entrada */}
              <div className='titulo-entrada'>
                <h1 className='titulo-azul'>Título</h1>
                <input class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="titulo"
                  {...register("titulo", {
                    required: true,
                    minLength: 5
                  })} />

                {errors.titulo?.type === "required" && (
                  <p className="alerta">El título es obligatorio</p>
                )}
                {errors.titulo?.type === "minLength" && (
                  <p className="alerta">
                    El título debe tener al menos 5 caracteres
                  </p>
                )}
              </div>



              {/**entrada */}
              <div className='descripcion-entrada mt-5 '>
                <h1 className='titulo-azul'>Descripción</h1>

                <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="descripcion"
                  {...register("descripcion", {
                    required: true,
                    minLength: 5
                  })} />
                {errors.descripcion?.type === "required" && (
                  <p className="alerta">La descripción es obligatorio</p>
                )}
                {errors.descripcion?.type === "minLength" && (
                  <p className="alerta">
                    La descripción debe tener al menos 5 caracteres
                  </p>
                )}


              </div>
            </div>




            {/**col derecha */}
            <div className='columna-derecha p-7 md:w-1/2 w-full'>



              {/**entrada */}
              <div className='fecha-entrada'>
                <h1 className='titulo-azul'>Fecha límite</h1>
                <input class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="fecha"
                  {...register("fecha", {
                    required: true
                  })} />
                {errors.fecha?.type === "required" && (
                  <p className="alerta">La fecha límite es obligatorio</p>
                )}

              </div>




              {/**entrada */}
              <div className='tema-entrada mt-5'>
                <h1 className='titulo-azul'>Tema</h1>
                <select {...register("tema", { required: true })} name="tema" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {temas.map((tema) => {
                    return (<option key={tema._id} value={tema._id}>
                      {tema.nombre}
                    </option>)
                  })}
                  <option selected disabled value="">Seleccionar tema</option>
                </select>
                {errors.tema?.type === "required" && (
                  <p className="alerta">Selecciona un tema</p>
                )}
              </div>




              {/**entrada */}
              <div className='estado-entrada mt-5'>
                <h1 className='titulo-azul'>Estado</h1>
                <select {...register("estado", { required: true })} name="estado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {estados.map((estado) => {
                    return (<option key={estado._id} value={estado._id}>
                      {estado.nombre}
                    </option>)

                  })}
                  <option selected disabled value="">Seleccionar estado</option>
                </select>
                {errors.estado?.type === "required" && (
                  <p className="alerta">Selecciona un estado</p>
                )}

              </div>





              {/**entrada */}
              <div className='prioridad-entrada mt-5'>
                <h1 className='titulo-azul'>Prioridad</h1>
                <select {...register("prioridad", { required: true })} name="prioridad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {prioridades.map((prioridad) => {
                    return (<option key={prioridad._id} value={prioridad._id}>
                      {prioridad.nombre}
                    </option>)

                  })}
                  <option selected disabled value="">Seleccionar prioridad</option>
                </select>
                {errors.prioridad?.type === "required" && (
                  <p className="alerta">Selecciona una prioridad</p>
                )}
              </div>
            </div>
          </div>

          <div className='div-boton flex justify-center items-center p-3'>
            <button className='boton-enlace'>Crear tarea</button>
          </div>
        </form>
      </div>


    </div>
  )
}



