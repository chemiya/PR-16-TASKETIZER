import React from 'react'
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import { setCookie } from 'cookies-next';
export default function identificacion() {

  //definiciones iniciales
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [incorrecto, setIncorrecto] = useState(false);//ara usuario y contraseña incorrecto





  //funciones

  const onSubmit = async (data) => {
    const username = data.username//cojo datos del form
    const password = data.password
    try {
      let response = await fetch('http://localhost:3000/api/usuarios/identificarUsuario', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();//peticion api
      console.log(response)

      if (response != "no") {//si me responde con el usuario

        setCookie('username', response.username);
        setCookie('id', response._id);
        setCookie('filtro', response.filtro);//guardo cookies y navego
        console.log(response._id)
        router.push("/vistaTareas/" + response._id);
      } else {
        setIncorrecto(true)//pongo mensaje
      }

    } catch (errorMessage) {
      console.log(errorMessage);
    }


  };



  return (
    <div>

      <div className='bg-naranja-claro py-24'>
        <div className='container mx-auto flex justify-center items-center'>


          {/**formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-lg md:w-2/5 w-4/5 py-12 flex flex-col justify-center items-center'>
            <div className='titulo'>
              <h1 className='text-4xl font-bold text-center'>Inicia sesión en Tasketizer</h1>
            </div>


            {/**entrada */}
            <div className='entrada mt-10 w-full p-5'>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                placeholder="username"
                {...register("username", {
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
            <div className='entrada mt-5 w-full p-5'>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                placeholder="contraseña"
                {...register("password", {
                  required: true,
                  minLength: 5
                })}
              />
              {errors.password?.type === "required" && (
                <p className="alerta">La contraseña es obligatoria</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="alerta">
                  La contaseña debe tener al menos 5 caracteres
                </p>
              )}

            </div>




            {/**registro */}
            <div className='sin-registro flex flex-col justify-center items-center mt-5'>
              <p className='text-center text-2xl font-bold'>¿No tienes cuenta?</p>
              <Link className='text-center text-2xl font-bold hover:underline hover:cursor-pointer' href="/registro">Registrarse</Link>
            </div>



            {/**boton */}
            <div className='boton mt-10'>
              <button className='boton-enlace' type="submit">Iniciar sesión</button>
            </div>



            {/**aviso */}
            {incorrecto && <div className='mt-5'><p className='alerta text-center'>Usuario y contraseña incorrectos</p></div>}

          </form>

        </div>
      </div>





    </div>
  )
}
