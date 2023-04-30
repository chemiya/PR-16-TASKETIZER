import React from 'react'
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
export default function editarTarea({ task }) {



  //definiciones iniciales
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      titulo: task.titulo,
      descripcion: task.descripcion,
      fecha: task.fechaLimite,
      //rellenas los campos del formulario con la tarea que te llega
    }
  });


  useEffect(() => {
    buscarEstados();
    buscarPrioridades();//rellenas selects
    buscarTemas();

  }, []);

  const router = useRouter();
  const [styleBoton, setStyleBoton] = useState("boton-enlace-disabled");//boton con estilo desactivado
  const [estados, setEstados] = useState([]);//para los select
  const [temas, setTemas] = useState([]);
  const [prioridades, setPrioridades] = useState([]);



  //funciones

  const buscarEstados = async () => {
    var id = getCookie("id");//buscar los estados para el select
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




    setValue("estado", task.estado)//el select lo inicio con el estado cargado


  }

  const buscarPrioridades = async () => {//Buscar prioridades
    var id = getCookie("id");
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


    setValue("prioridad", task.prioridad)//el select lo inicio la prioridad cargada
  }


  const buscarTemas = async () => {//buscar temas
    var id = getCookie("id");
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


    setValue("tema", task.tema)//el select lo inicio con el tema cargado
  }


  const onSubmit = async (data) => {
    if (styleBoton != "boton-enlace-disabled") {//si el boton esta activado



      const titulo = data.titulo
      const descripcion = data.descripcion//coges los datos
      const fechaLimite = data.fecha
      const estado = data.estado
      const tema = data.tema
      const prioridad = data.prioridad
      var idUsuario = getCookie("id");

      try {//editas la tarea
        let response = await fetch('http://localhost:3000/api/tareas/editarTarea/' + task._id, {
          method: 'POST',
          body: JSON.stringify({ titulo, descripcion, fechaLimite, estado, tema, prioridad }),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        });
        response = await response.json();

        if (response != null) {
          router.push("/vistaTareas/" + idUsuario);
        }

      } catch (errorMessage) {
        console.log(errorMessage);
      }

    } else {
      console.log("no hay cambio")
    }
  }

  const handleChangePrioridad = (e) => {
    setStyleBoton("boton-enlace");//cuando haya cualquier cambio, se cambia el estilo del boton
  }

  const handleChangeTema = (e) => {
    setStyleBoton("boton-enlace");
  }

  const handleChangeEstado = (e) => {
    setStyleBoton("boton-enlace");
  }

  const handleChangeFecha = (e) => {
    setStyleBoton("boton-enlace");
  }

  const handleChangeTitulo = (e) => {
    setStyleBoton("boton-enlace");
  }

  const handleChangeDescripcion = (e) => {
    setStyleBoton("boton-enlace");
  }



  return (
    <div>
      <div className='exterior bg-naranja-claro p-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='container mx-auto bg-white rounded-lg'>
          <h1 className='text-center text-5xl font-bold'>Editar tarea</h1>


          {/**contenedor con las columnas */}
          <div className='contenedor-columnas flex md:flex-row flex-col mt-4' >


            {/**col izq */}
            <div className='columna-izquierda p-7  md:w-1/2 w-full  flex flex-col'>

              {/**entrada */}
              <div className='titulo-entrada'>
                <h1 className='titulo-azul'>Título</h1>
                <input class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="titulo"
                  {...register("titulo", {
                    required: true,
                    minLength: 5, onChange: (e) => { handleChangeTitulo(e) }
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
                    minLength: 5, onChange: (e) => { handleChangeDescripcion(e) }
                  })} />
                {errors.descripcion?.type === "required" && (
                  <p className="alerta">La descripción es obligatoria</p>
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
                    required: true, onChange: (e) => { handleChangeFecha(e) }
                  })} />
                {errors.fecha?.type === "required" && (
                  <p className="alerta">La fecha límite es obligatoria</p>
                )}

              </div>



              {/**entrada */}
              <div className='tema-entrada mt-5'>
                <h1 className='titulo-azul'>Tema</h1>
                <select {...register("tema", { required: true, onChange: (e) => { handleChangeTema(e) } })} name="tema" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <select {...register("estado", { required: true, onChange: (e) => { handleChangeEstado(e) } })} name="estado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <select {...register("prioridad", { required: true, onChange: (e) => { handleChangePrioridad(e) } })} name="prioridad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {prioridades.map((prioridad) => {
                    return (<option key={prioridad._id} value={prioridad._id}>
                      {prioridad.nombre}
                    </option>)

                  })}
                  <option selected disabled value="">Seleccionar prioridad</option>
                </select>
                {errors.prioridad?.type === "required" && (
                  <p className="alerta">Selecciona un Prioridad</p>
                )}
              </div>
            </div>
          </div>

          <div className='div-boton flex justify-center items-center p-3'>
            <button className={styleBoton}>Editar tarea</button>
          </div>
        </form>
      </div>


    </div>
  )
}


export async function getServerSideProps({ query: { id } }) {//coges el parametro de la ruta y mandas peticion
  const res = await fetch(`http://localhost:3000/api/tareas/${id}`);



  const task = await res.json();
  console.log(task.fechaLimite)









  return {
    props: {
      task,

    },
  };



}



