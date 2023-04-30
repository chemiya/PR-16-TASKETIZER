import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link'
const TareaId = ({ task }) => {



    //definiciones iniciales
    const [nombreTema, setNombreTema] = useState();
    const [nombreEstado, setNombreEstado] = useState();
    const [nombrePrioridad, setNombrePrioridad] = useState();
    useEffect(() => {
        buscarNombres();//al iniciar, buscas el nombre del tema, estado y prioridad que corresponda con id de eso en la tarea

    }, []);



    //funciones

    const buscarNombres = async () => {
        console.log(task.tema)//el id del tema de la tarea corresponde con el nombre del tema

        let response = await fetch('http://localhost:3000/api/temas/' + task.tema, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setNombreTema(response.nombre)



        //lo mismo para su estado
        response = await fetch('http://localhost:3000/api/estados/' + task.estado, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setNombreEstado(response.nombre)


        //lo mismo para su prioridad
        response = await fetch('http://localhost:3000/api/prioridades/' + task.prioridad, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log(response)
        setNombrePrioridad(response.nombre)
    }

    return (<div>
        <div className='exterior bg-naranja-claro p-16'>
            <div className='container mx-auto bg-white rounded-lg'>
                <h1 className='text-center text-5xl font-bold'>Detalles de la tarea</h1>

                <div className='contenedor-columnas flex md:flex-row flex-col mt-4'>



                    {/**col izq */}
                    <div className='columna-izquierda p-7  md:w-1/2 w-full  flex flex-col'>
                        <div className='titulo-entrada'>
                            <h1 className='titulo-azul'>Título</h1>
                            <p className='text-2xl'>{task.titulo}</p>
                        </div>

                        <div className='descripcion-entrada mt-5 '>
                            <h1 className='titulo-azul'>Descripción</h1>

                            <p className='text-2xl'>{task.descripcion}</p>

                        </div>
                    </div>



                    {/**col der*/}
                    <div className='columna-derecha p-7 md:w-1/2 w-full'>
                        <div className='fecha-entrada'>
                            <h1 className='titulo-azul'>Fecha límite</h1>
                            <p className='text-2xl'>{task.fechaLimite}</p>
                        </div>

                        <div className='tema-entrada mt-5'>
                            <h1 className='titulo-azul'>Tema</h1>
                            <p className='text-2xl'>{nombreTema}</p>
                        </div>

                        <div className='estado-entrada mt-5'>
                            <h1 className='titulo-azul'>Estado</h1>
                            <p className='text-2xl'>{nombreEstado}</p>
                        </div>


                        <div className='prioridad-entrada mt-5'>
                            <h1 className='titulo-azul'>Prioridad</h1>
                            <p className='text-2xl'>{nombrePrioridad}</p>
                        </div>
                    </div>
                </div>


                {/**boton */}
                <div className='boton-editar p-3 flex justify-center'>
                    <Link className='boton-enlace' href={`/editarTarea/${task._id}`}>Editar tarea</Link>
                </div>

            </div>
        </div>
    </div>)
}

export async function getServerSideProps({ query: { id } }) {//coges el id de la ruta del enlace y buscas esa tarea
    const res = await fetch(`http://localhost:3000/api/tareas/${id}`);



    const task = await res.json();
    console.log(task)
    return {
        props: {
            task,//se la pasas al frontend
        },
    };



}
export default TareaId
