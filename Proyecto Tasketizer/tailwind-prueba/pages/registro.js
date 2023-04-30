import React from 'react'
import Registro from "./imagenes/registro.png"
import Image from 'next/image'
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'

export default function registro() {

    //definiciones iniciales
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const router = useRouter();




    //funciones

    const onSubmit = async (data) => {

        const username = data.username//creo usuario con lo del form
        const password = data.password
        const email = data.email
        try {
            let response = await fetch('http://localhost:3000/api/usuarios/crearUsuario', {
                method: 'POST',
                body: JSON.stringify({ username, password, email }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();

            if (response != null) {
                router.push("/identificacion");//navego
            }

        } catch (errorMessage) {
            console.log(errorMessage);
        }
    };


    return (
        <div>
            <div className='bg-naranja-claro py-24'>
                <div className='container mx-auto flex justify-center items-center'>

                    {/**div blanco */}
                    <div className='bg-white rounded-lg w-4/5 py-12 flex flex-col justify-center items-center'>
                        <div className='titulo'>
                            <h1 className='text-4xl font-bold text-center'>Registrate en Tasketizer</h1>
                        </div>


                        <div className='contenido-formulario flex md:flex-row flex-col items-center justify-center w-full mt-5 '>


                            {/**col form */}
                            <div className='md:w-1/2 w-full'>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    {/**entrada */}
                                    <div className='entrada mt-3 w-full p-5'>
                                        <input name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="username"  {...register("username", {
                                            required: true,
                                            minLength: 5
                                        })} />
                                        {errors.username?.type === "required" && (
                                            <p className="alerta">El username es obligatorio</p>
                                        )}
                                        {errors.username?.type === "minLength" && (
                                            <p className="alerta">
                                                El username debe tener al menos 5 caracteres
                                            </p>
                                        )}
                                    </div>



                                    {/**entrada */}
                                    <div className='entrada mt-3 w-full p-5'>
                                        <input name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"
                                            placeholder="contraseña"
                                            {...register("password", {
                                                required: true,
                                                minLength: 5
                                            })} />
                                        {errors.password?.type === "required" && (
                                            <p className="alerta">La contraseña es obligatoria</p>
                                        )}
                                        {errors.password?.type === "minLength" && (
                                            <p className="alerta">
                                                La contaseña debe tener al menos 5 caracteres
                                            </p>
                                        )}
                                    </div>



                                    {/**entrada */}
                                    <div className='entrada mt-3 w-full p-5'>
                                        <input name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email"
                                            {...register("email", {
                                                required: "El email es obligatorio",
                                                pattern: {
                                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                    message: "El email no es válido"
                                                }
                                            })} />
                                        {errors.email && <p className="alerta">{errors.email.message}</p>}
                                    </div>


                                    <div className='boton  flex justify-center items-center'>
                                        <button className='boton-enlace' type="submit">Registrarse</button>
                                    </div>
                                </form>
                            </div>



                            {/**col imagen */}
                            <div className='w-1/2 md:mt-1 mt-5'>
                                <div className='imagen  flex justify-center items-center'>
                                    <Image

                                        objectFit="cover"
                                        width={200}
                                        height={200}
                                        src={Registro}
                                    />
                                </div>
                                <div className='identificarse mt-4 flex flex-col justify-center items-center'>
                                    <h1 className='font-bold text-2xl text-center'>¿Ya tienes cuenta?</h1>
                                    <Link className='font-bold text-2xl hover:underline hover:cursor-pointer text-center' href="/identificacion">Iniciar sesión</Link>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>




        </div>
    )
}
