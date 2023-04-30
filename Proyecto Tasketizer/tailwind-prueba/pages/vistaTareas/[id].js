import React from 'react'
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import IconoTKZ from "./../imagenes/IconoTKZ.jpg"
export default function VistaTareas({ tareas = [] }) {


    //definiciones iniciales
    const [elementosFiltro, setElementosFiltro] = useState([]);//filas en las que se organizaran las tareas
    const [filtro, setFiltro] = useState();//nombre del filtro
    useEffect(() => {
        organizarTareas();//al iniciar llamo la funcion

    }, []);
    const [navbar, setNavbar] = useState(false);




    //funciones
    const organizarTareas = async () => {
        var username = getCookie("username");//cojo las cookies
        var id = getCookie("id");
        var filtro = getCookie("filtro");
        var ruta = "";
        console.log("filtro de las tareas:")
        console.log(filtro)
        setFiltro(filtro)

        console.log("id:")
        console.log(id)

        if (filtro == "estado") {//dependiendo del filtro
            ruta = 'http://localhost:3000/api/estados/obtenerEstadosPorUsuario?id=' + id;
        } else if (filtro == "tema") {
            ruta = 'http://localhost:3000/api/temas/obtenerTemasPorUsuario?id=' + id;
        } else {
            ruta = 'http://localhost:3000/api/prioridades/obtenerPrioridadesPorUsuario?id=' + id;
        }


        try {
            let response = await fetch(ruta, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            console.log("filtro")
            console.log(response)
            setElementosFiltro(response)//guardo resultado peticion de los elementos que hay para el filtro
            //filtro estado: elementos pendiente, en ejecuccion
            console.log("mis tareas")
            console.log(tareas)
            console.log("id filtro:")
            console.log(response[0]._id)




        } catch (error) {
            console.log('An error occurred while deleting ', error);
        }




    }

    return (
        <div>

            {/**navbar */}
            <nav className="w-full bg-azul-oscuro shadow">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <a href="#">
                                <Image src={IconoTKZ} width={100} height={100} />
                            </a>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'
                                }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className=" transition duration-500 hover:scale-110">
                                    <Link legacyBehavior href="/crearTarea">
                                        <a className='boton-enlace '>Crear tarea</a>
                                    </Link>
                                </li>
                                <li className=" transition duration-500 hover:scale-110">
                                    <Link legacyBehavior href="/ajustes">
                                        <a className="boton-enlace">Ajustes</a>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>







            {/**tareas */}
            <div className='bg-naranja-claro p-3'>
                <div className='container mx-auto py-20'>
                    <div className='titulo'>
                        <h1 className='text-5xl font-bold'>Mis tareas agrupadas por {filtro}</h1>
                    </div>

                    <div className="flex flex-col mt-10">
                        {/**cada elemento del filtro: en ejecuccion, pendiente */}
                        {elementosFiltro.map((elemento, index) => {
                            return (

                                <div className='w-full columna bg-white rounded-lg p-8 mt-10' key={index}>
                                    <h1 className='titulo-azul'>{elemento.nombre}</h1>


                                    {/**si filtro de estado, aqui en esta fila buscas de las tareas las que 
                                 * tengan un determinado estado(el recorrido arriba): tareas con estado en ejecuccion
                                 */}

                                    <div className='contenedor-tareas flex md:flex-row flex-col flex-wrap'>
                                        {filtro == "estado" &&

                                            tareas.filter(tarea => tarea.estado == elemento._id).length == 0 ? (
                                            <div className='text-3xl font-bold'>No hay tareas</div>
                                        ) : (

                                            tareas.filter(tarea => tarea.estado == elemento._id).map((elemento, index) => (
                                                <div className='exterior-carta md:w-1/3 w-full p-3 '>
                                                    <div className='elemento  flex flex-col items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>
                                                        <h1 className='font-bold text-3xl text-center'>{elemento.titulo}</h1>
                                                        <Link className="boton-enlace" href={`/detallesTarea/${elemento._id}`}>Ver detalles</Link>


                                                    </div>
                                                </div>
                                            )))
                                        }



                                        {/**filtro de tema */}
                                        {filtro == "tema" &&

                                            tareas.filter(tarea => tarea.tema == elemento._id).length == 0 ? (
                                            <div className='text-3xl font-bold'>No hay tareas</div>
                                        ) : (

                                            tareas.filter(tarea => tarea.tema == elemento._id).map((elemento, index) => (
                                                <div className='exterior-carta md:w-1/3 w-full p-3 '>
                                                    <div className='elemento  flex flex-col items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>     <h1 className='font-bold text-3xl text-center'>{elemento.titulo}</h1>
                                                        <Link className="boton-enlace" href={`/detallesTarea/${elemento._id}`}>Ver detalles</Link>


                                                    </div>
                                                </div>
                                            )))
                                        }



                                        {/**filtro de prioridad */}
                                        {filtro == "prioridad" &&

                                            tareas.filter(tarea => tarea.prioridad == elemento._id).length == 0 ? (
                                            <div className='text-3xl font-bold'>No hay tareas</div>
                                        ) : (

                                            tareas.filter(tarea => tarea.prioridad == elemento._id).map((elemento, index) => (
                                                <div className='exterior-carta md:w-1/3 w-full p-3 '>
                                                    <div className='elemento  flex flex-col items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>     <h1 className='font-bold text-3xl text-center'>{elemento.titulo}</h1>
                                                        <Link className="boton-enlace" href={`/detallesTarea/${elemento._id}`}>Ver detalles</Link>


                                                    </div>
                                                </div>
                                            )))
                                        }

                                    </div>
                                </div>


                            )
                        })}

                    </div>

                </div>
            </div>




        </div>
    )
}

export async function getServerSideProps({ query: { id } }) {
    console.log("ENTRA")//con el id de la ruta del navegador hago peticion para coger tareas 
    const resTareas = await fetch(`http://localhost:3000/api/tareas/obtenerTareasPorUsuario?id=${id}`);
    const tareas = await resTareas.json();


    console.log("mis tareas")
    console.log(tareas)//sale en backend


    return {
        props: {//se lo paso en props al front
            tareas,
        },
    };
}
