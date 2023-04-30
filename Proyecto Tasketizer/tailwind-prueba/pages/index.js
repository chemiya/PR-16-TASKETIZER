import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] })
import ImagenBanner from "./imagenes/tareas.png"
import ImagenMujer from "./imagenes/mujer.jpg"
import ImagenHombre from "./imagenes/hombre.jpg"
import ImagenMujer1 from "./imagenes/mujer1.jpg"
import IconoTKZ from "./imagenes/IconoTKZ.jpg"
import IconoTarea from "./imagenes/iconotarea1.png"
import Tiempo from "./imagenes/tiempo.png"
import Ticks from "/pages/imagenes/ticks.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [navbar, setNavbar] = useState(false);//para el navbar responsive
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
                  <Link legacyBehavior href="/identificacion">
                    <a className='boton-enlace '>Iniciar sesión</a>
                  </Link>
                </li>
                <li className=" transition duration-500 hover:scale-110">
                  <Link legacyBehavior href="/registro">
                    <a className="boton-enlace">Registrarse</a>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>




      {/**banner principal */}
      <div className="hero bg-naranja-claro">
        <div className='container flex flex-col justify-center items-center mx-auto md:flex-row md:pt-28 md:pb-28 pt-10 pb-10'>
          <div className='md:w-1/2 '>
            <h1 className='md:text-6xl text-3xl md:text-start text-center font-bold'>Tasketizer gestiona tus tareas de manera eficiente y aumenta tu productividad</h1>
          </div>

          <div className='md:w-1/2  p-4 flex flex-row justify-center'>
            <Image src={ImagenBanner} width={600} height={600} />
          </div>

        </div>

      </div>






      {/**primera seccion */}
      <div className='mejor-aplicacion mt-16'>
        <div className='container mx-auto'>
          <div className='titulo'>
            <h1 className='text-4xl text-center font-bold'>La mejor aplicación para gestionar tus tareas</h1>
          </div>



          {/**cartas */}
          <div className='flex flex-col md:flex-row mt-10 md:space-x-6 p-3'>

            <div className='flex flex-col items-center bg-naranja-claro md:w-1/3 pt-4 rounded-xl space-y-4 mt-4 h-80 justify-center'>

              <FontAwesomeIcon icon={faUser} className='text-6xl text-white' />
              <h1 className='text-4xl font-bold text-white text-center'>Altamente personalizable</h1>

              <p className='text-2xl text-center font-bold text-white'>Tasketizer  se puede adaptar
                a lo que necesites</p>
            </div>

            <div className='flex flex-col items-center bg-naranja-claro md:w-1/3 pt-4 rounded-xl space-y-4 mt-4 h-80 justify-center'>

              <FontAwesomeIcon icon={faPersonRunning} className='text-6xl text-white' />
              <h1 className='text-4xl font-bold text-white text-center'>Rápida de <br></br> utilizar</h1>

              <p className='text-2xl text-center font-bold text-white'>Tasketizer  ayuda gestionar
                rápidamente tus tareas</p>
            </div>

            <div className='flex flex-col items-center bg-naranja-claro md:w-1/3 pt-4 rounded-xl space-y-4 mt-4 h-80 justify-center'>

              <FontAwesomeIcon icon={faGraduationCap} className='text-6xl text-white' />
              <h1 className='text-4xl font-bold text-white text-center'>Fácil de <br></br> aprender</h1>

              <p className='text-2xl text-center font-bold text-white'>Tasketizer  se aprende a
                manejar rápidamente</p>
            </div>

          </div>
        </div>
      </div>





      {/**caracteristicas */}
      <div className='caracteristicas mt-48'>
        <div className='container mx-auto   '>

          <div className='flex md:flex-row flex-col p-5'>

            <div className='md:w-1/2 w-full h-full  flex flex-col justify-center items-center'>
              <h1 className='text-5xl font-bold'>Customiza a tu gusto los temas, las prioridades
                y los estados de tus tareas</h1>
              <p className='text-2xl font-bold mt-3'>Tasketizer se puede personalizar a tu gusto para que puedas organizarte como desees</p>
            </div>


            <div className='md:w-1/2 w-full h-full  flex justify-center items-center'>
              <Image

                objectFit="cover"
                width="600px"
                height="600px"
                src={IconoTarea}
              />
            </div>

          </div>

          <div className='flex md:flex-row flex-col mt-36 p-5'>

            <div className='md:w-1/2 w-full h-full  flex justify-center items-center'>
              <Image

                objectFit="cover"
                width={300}
                height={300}
                src={Tiempo}
              />
            </div>



            <div className='md:w-1/2 w-full h-full  flex flex-col justify-center items-center'>
              <h1 className='text-5xl font-bold text-end'>Agiliza tus tareas y organizalas adecuadamente con pocos clicks</h1>
              <p className='text-2xl font-bold mt-3 text-end'>Tasketizer es fácil de utilizar para que puedas mover tus tareas como quieras para que puedas realizarlas eficientemente</p>
            </div>

          </div>


        </div>

      </div>





      {/**registro */}
      <div className="bg-gradient-to-r from-gradientePrimero from-10% to-gradienteFinal to-90% py-10 mt-16">
        <div className='container mx-auto h-full flex md:flex-row flex-col justify-center items-center'>
          <div className='titulo md:w-1/2 w-full flex justify-center items-center h-full ps-10'>

            <h1 className='text-white font-bold text-5xl'>Empieza a gestionar tus tareas de una manera eficiente</h1>


          </div>
          <div className='boton md:w-1/2 w-full flex justify-center items-center h-full mt-5 md:mt-1'>
            <Link href="/registro" className='bg-azul-oscuro py-5 px-10 rounded-full text-white font-bold text-2xl'>Probar ahora</Link>
          </div>

        </div>

      </div>






      {/**numeros grandes */}
      <div className='opciones mt-16'>
        <div className='container mx-auto' >

          <div className="flex md:flex-row flex-col md:space-x-6 p-3">
            <div className='mt-2 p-7 border-solid border-2 border-naranja-claro rounded-lg md:w-1/3 w-full flex flex-col items-center justify-center'>
              <h1 className='text-center text-9xl font-bold'>11</h1>
              <p className='text-center text-5xl font-bold'>millones <br></br> de usuarios</p>
            </div>

            <div className='mt-2 p-7 border-solid border-2 border-naranja-claro rounded-lg md:w-1/3 w-full flex flex-col items-center justify-center'>
              <h1 className='text-center text-9xl font-bold'>41</h1>
              <p className='text-center text-5xl font-bold'>reconocimientos <br></br> internacionales</p>
            </div>

            <div className='mt-2 p-7 border-solid border-2 border-naranja-claro rounded-lg md:w-1/3 w-full flex flex-col items-center justify-center'>
              <h1 className='text-center text-9xl font-bold'>78</h1>
              <p className='text-center text-5xl font-bold'>millones <br></br> de tareas</p>
            </div>

          </div>

        </div>
      </div>








      {/**opiniones */}
      <div className='clientes mt-16'>
        <div className='container mx-auto'>
          <div className='titulo'>
            <h1 className='text-4xl text-center font-bold'>Con la confianza de miles de usuarios</h1>
          </div>


          {/**cartas opiniones */}
          <div className='flex flex-col md:flex-row mt-10 md:space-x-6 p-3'>

            <div className='flex flex-col items-center bg-naranja-claro md:w-1/3 pt-4 rounded-xl space-y-4 mt-4 h-80 justify-center'>
              <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }}>
                <Image

                  objectFit="cover"
                  width="100px"
                  height="100px"
                  src={ImagenMujer}
                />

              </div>

              <h1 className='text-4xl font-bold text-white'>Ana</h1>
              <h2 className='text-3xl font-bold text-white'>Francia</h2>
              <p className=' font-bold text-white'>Tasketizer ha ayudado a mi negocio a crecer</p>
            </div>

            <div className='flex flex-col items-center bg-naranja-claro md:w-1/3 pt-4 rounded-xl space-y-4 mt-4 h-80 justify-center'>
              <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }}>
                <Image

                  objectFit="cover"
                  width="100px"
                  height="100px"
                  src={ImagenMujer1}
                />

              </div>

              <h1 className='text-4xl font-bold text-white'>María</h1>
              <h2 className='text-3xl font-bold text-white'>España</h2>
              <p className=' font-bold text-white'>Con Tasketizer aprovecho
                mucho más mi tiempo</p>
            </div>

            <div className='flex flex-col items-center bg-naranja-claro md:w-1/3 pt-4 rounded-xl space-y-4 mt-4 h-80 justify-center'>
              <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }}>
                <Image

                  objectFit="cover"
                  width="100px"
                  height="100px"
                  src={ImagenHombre}
                />

              </div>

              <h1 className='text-4xl font-bold text-white'>Juliana</h1>
              <h2 className='text-3xl font-bold text-white'>Inglaterra</h2>
              <p className=' font-bold text-white'>Tasketizer ayuda a gestionar
                equipos rápidamente</p>
            </div>

          </div>
        </div>
      </div>




      {/**footer */}
      <div className='footer bg-azul-oscuro mt-16'>
        <div className='container mx-auto flex flex-col justify-center items-center p-10'>
          <h1 className='text-white font-bold text-3xl text-center'>Jose Maria Lozano Olmedo 2023&copy;</h1>
          <h1 className='text-white font-bold text-3xl text-center'>All rights reserved</h1>
        </div>
      </div>









    </div >
  )
}
