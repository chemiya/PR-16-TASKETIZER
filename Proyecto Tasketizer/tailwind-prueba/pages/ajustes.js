import React from 'react'
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
export default function ajustes() {


  //definiciones iniciales


  //cada uno de los formulario para crear tema, estado o prioridad
  const {
    register: registerTema,
    handleSubmit: handleSubmitTema,
    formState: { errors: errorsTema },
    resetField: resetFieldTema
  } = useForm();


  const {
    register: registerEstado,
    handleSubmit: handleSubmitEstado,
    formState: { errors: errorsEstado },
    resetField: resetFieldEstado
  } = useForm();


  const {
    register: registerPrioridad,
    handleSubmit: handleSubmitPrioridad,
    formState: { errors: errorsPrioridad },
    resetField: resetFieldPrioridad
  } = useForm();


  useEffect(() => {
    cargarDatos();//al iniciar cargas los datos

  }, []);



  const [filtro, setFiltro] = useState();
  const [estados, setEstados] = useState([]);
  const [temas, setTemas] = useState([]);//datos del usuario, temas del usuario, sus prioridades...
  const [prioridades, setPrioridades] = useState([]);


  const [showWarningTema, setShowWarningTema] = useState(false);//aviso cuando se crea estado, temas... nuevo
  const [showWarningEstado, setShowWarningEstado] = useState(false);
  const [showWarningPrioridad, setShowWarningPrioridad] = useState(false);
  const [showWarningFiltro, setShowWarningFiltro] = useState(false);


  //aviso borrar o editar
  const [showWarningEstadoEliminarGuardar, setShowWarningEstadoEliminarGuardar] = useState(false);
  const [showWarningTemaEliminarGuardar, setShowWarningTemaEliminarGuardar] = useState(false);
  const [showWarningPrioridadEliminarGuardar, setShowWarningPrioridadEliminarGuardar] = useState(false);
  const [styleBoton, setStyleBoton] = useState("boton-enlace-disabled");//boton para guardar estado, tema...
  const [styleBotonFiltro, setStyleBotonFiltro] = useState("boton-enlace-disabled");//boton del filtro




  //temporizadores para avisos cuando haga algo con exito
  const timerId = useRef(null);

  useEffect(() => {
    if (showWarningTema) {


      timerId.current = setTimeout(() => {
        setShowWarningTema(false);
      }, 5000);
    }

    return () => {

      clearTimeout(timerId.current);
    };
  }, [showWarningTema]);


  useEffect(() => {
    if (showWarningEstadoEliminarGuardar) {


      timerId.current = setTimeout(() => {
        setShowWarningEstadoEliminarGuardar(false);
      }, 5000);
    }

    return () => {

      clearTimeout(timerId.current);
    };
  }, [showWarningEstadoEliminarGuardar]);

  useEffect(() => {
    if (showWarningPrioridadEliminarGuardar) {


      timerId.current = setTimeout(() => {
        setShowWarningPrioridadEliminarGuardar(false);
      }, 5000);
    }

    return () => {

      clearTimeout(timerId.current);
    };
  }, [showWarningPrioridadEliminarGuardar]);

  useEffect(() => {
    if (showWarningTemaEliminarGuardar) {


      timerId.current = setTimeout(() => {
        setShowWarningTemaEliminarGuardar(false);
      }, 5000);
    }

    return () => {

      clearTimeout(timerId.current);
    };
  }, [showWarningTemaEliminarGuardar]);


  useEffect(() => {
    if (showWarningFiltro) {


      timerId.current = setTimeout(() => {
        setShowWarningFiltro(false);
      }, 5000);
    }

    return () => {

      clearTimeout(timerId.current);
    };
  }, [showWarningFiltro]);

  useEffect(() => {
    if (showWarningPrioridad) {


      timerId.current = setTimeout(() => {
        setShowWarningPrioridad(false);
      }, 5000);
    }

    return () => {

      clearTimeout(timerId.current);
    };
  }, [showWarningPrioridad]);

  useEffect(() => {
    if (showWarningEstado) {


      timerId.current = setTimeout(() => {
        setShowWarningEstado(false);
      }, 5000);
    }

    return () => {

      clearTimeout(timerId.current);
    };
  }, [showWarningEstado]);










  //funciones

  const cargarDatos = async () => {
    var filtro = getCookie("filtro");
    setFiltro(filtro)


    buscarPrioridades();//buscas los temas, estados... del usuario
    buscarTemas();
    buscarEstados();


  }

  const buscarTemas = async () => {
    var id = getCookie("id");//coges la cookies
    try {
      let response = await fetch('http://localhost:3000/api/temas/obtenerTemasPorUsuario?id=' + id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();

      var i;
      var arrayTemas = []//cada tema obtenido se procesa, añadiendo campo si se muestra input para editarlo
      for (i = 0; i < response.length; i++) {
        var temaCompleto = {
          nombre: response[i].nombre,
          _id: response[i]._id,
          mostrar: 0

        }
        arrayTemas.push(temaCompleto)
      }


      console.log(arrayTemas)
      setTemas(arrayTemas)





    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }

  }

  const buscarEstados = async () => {
    var id = getCookie("id");//buscar los estados del usuario

    try {
      let response = await fetch('http://localhost:3000/api/estados/obtenerEstadosPorUsuario?id=' + id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();



      var i;
      var arrayEstados = []//se procesan los estados, con campo para si imput para editar el titulo
      for (i = 0; i < response.length; i++) {
        var estadoCompleto = {
          nombre: response[i].nombre,
          _id: response[i]._id,
          mostrar: 0

        }
        arrayEstados.push(estadoCompleto)
      }


      console.log(arrayEstados)
      setEstados(arrayEstados)


    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }

  }



  const buscarPrioridades = async () => {
    var id = getCookie("id");//igual en prioridades que anteriores
    try {
      let response = await fetch('http://localhost:3000/api/prioridades/obtenerPrioridadesPorUsuario?id=' + id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();

      var i;
      var arrayPrioridades = []
      for (i = 0; i < response.length; i++) {
        var prioridadCompleto = {
          nombre: response[i].nombre,
          _id: response[i]._id,
          mostrar: 0

        }
        arrayPrioridades.push(prioridadCompleto)
      }


      console.log(arrayPrioridades)
      setPrioridades(arrayPrioridades)





    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }

  }






  const onSubmitCrearTema = async (data) => {
    console.log(data.tema)
    const nombre = data.tema
    var idUsuario = getCookie("id");//coges el form y el id

    try {
      let response = await fetch('http://localhost:3000/api/temas/crearTema', {
        method: 'POST',
        body: JSON.stringify({ nombre, idUsuario }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();//creas el tema
      console.log(response)

      if (response != null) {
        setShowWarningTema(true);//pones aviso, vacias input, y buscas lo nuevos temas
        resetFieldTema("tema")
        buscarTemas();
      }

    } catch (errorMessage) {
      console.log(errorMessage);
    }

  }


  const onSubmitCrearPrioridad = async (data) => {
    console.log(data.prioridad)
    const nombre = data.prioridad
    var idUsuario = getCookie("id");//obtienes form y el id

    try {
      let response = await fetch('http://localhost:3000/api/prioridades/crearPrioridad', {
        method: 'POST',
        body: JSON.stringify({ nombre, idUsuario }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();//creas la prioridad con peticion api
      console.log(response)

      if (response != null) {
        setShowWarningPrioridad(true);//aviso, vacias input y buscas nuevos
        resetFieldPrioridad("prioridad")
        buscarPrioridades();
      }

    } catch (errorMessage) {
      console.log(errorMessage);
    }

  }


  const handleBorrarEstado = async (id) => {
    try {//peticion api para borrarlo
      let response = await fetch('http://localhost:3000/api/estados/borrarEstado?id=' + id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      console.log(response)
      setShowWarningEstadoEliminarGuardar(true);//pones aviso
    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }
    setEstados(estados.filter(estado => estado._id != id))//filtras los estados que tienes, se podria buscar estados
  }

  const handleBorrarTema = async (id) => {
    try {//peticion para borrar
      let response = await fetch('http://localhost:3000/api/temas/borrarTema?id=' + id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      console.log(response)
      setShowWarningTemaEliminarGuardar(true);//pones aviso
    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }

    setTemas(temas.filter(tema => tema._id != id))//filtras temas sin la borrada, se podria buscar temas
  }

  const handleEditarEstado = async (id) => {

    console.log("manejar boton editar")
    var nuevos = estados.map(function (estado) {
      if (estado._id == id) {
        estado.mostrar = 1
      }

      return estado;//cambias en el array el campo para que ese estado aparezca un input con el titulo
    });

    console.log("nuevos estados:")
    console.log(nuevos)
    setEstados(nuevos)

  }


  const handleEditarPrioridad = async (id) => {

    console.log("manejar boton editar")
    var nuevos = prioridades.map(function (prioridad) {
      if (prioridad._id == id) {
        prioridad.mostrar = 1
      }

      return prioridad;//cambias en el array el campo para que esa prioridad aparezca un input con el titulo
    });

    console.log("nuevos prioridades:")
    console.log(nuevos)
    setPrioridades(nuevos)

  }



  const handleEditarTema = async (id) => {

    console.log("manejar boton editar")
    var nuevos = temas.map(function (tema) {
      if (tema._id == id) {
        tema.mostrar = 1
      }

      return tema;//lo mismo anteriores
    });

    console.log("nuevos tema:")
    console.log(nuevos)
    setTemas(nuevos)

  }

  const handleBorrarPrioridad = async (id) => {
    try {//lo mismo anteriores
      let response = await fetch('http://localhost:3000/api/prioridades/borrarPrioridad?id=' + id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      console.log(response)
      setShowWarningPrioridadEliminarGuardar(true);
    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }

    setPrioridades(prioridades.filter(prioridad => prioridad._id != id))
  }

  const handleEditarEstadoGuardar = async (id) => {
    console.log("manejar boton guardar")
    console.log("estados actuales")
    console.log(estados)
    if (styleBoton != "boton-enlace-disabled") {//si el boton esta activado
      var i;
      var estadoGuardar;
      for (i = 0; i < estados.length; i++) {
        if (estados[i]._id == id) {
          estadoGuardar = estados[i]//coges el estado a guardar
        }
      }

      var id = estadoGuardar._id
      var nombre = estadoGuardar.nombre
      try {//envias peticion para guardar
        let response = await fetch('http://localhost:3000/api/estados/actualizarEstado?id=' + id, {
          method: 'POST',
          body: JSON.stringify({
            nombre
          }),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        });
        response = await response.json();
        console.log(response)
        buscarEstados();//actualizas estados
        setShowWarningEstadoEliminarGuardar(true)//Pones aviso y cambias estilo del boton
        setStyleBoton("boton-enlace-disabled")
      } catch (errorMessage) {
        console.log(errorMessage);
      }

    }

  }


  const handleEditarTemaGuardar = async (id) => {
    if (styleBoton != "boton-enlace-disabled") {//con el boton activado
      console.log("manejar boton guardar")
      console.log("temas actuales")
      console.log(temas)

      var i;
      var temaGuardar;
      for (i = 0; i < temas.length; i++) {
        if (temas[i]._id == id) {
          temaGuardar = temas[i]//coges el tema cambiado
        }
      }

      var id = temaGuardar._id
      var nombre = temaGuardar.nombre
      try {//mandas peticion
        let response = await fetch('http://localhost:3000/api/temas/actualizarTema?id=' + id, {
          method: 'POST',
          body: JSON.stringify({
            nombre
          }),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        });
        response = await response.json();
        console.log(response)
        buscarTemas();
        setShowWarningTemaEliminarGuardar(true)//actualizas temas, pones aviso y cambias boton
        setStyleBoton("boton-enlace-disabled")
      } catch (errorMessage) {
        console.log(errorMessage);
      }


    } else {
      console.log("no cambios")
    }
  }


  const handleEditarPrioridadGuardar = async (id) => {
    console.log("manejar boton guardar")//igual que los anteriores
    console.log("prioridades actuales")
    console.log(prioridades)
    if (styleBoton != "boton-enlace-disabled") {
      var i;
      var prioridadGuardar;
      for (i = 0; i < prioridades.length; i++) {
        if (prioridades[i]._id == id) {
          prioridadGuardar = prioridades[i]
        }
      }

      var id = prioridadGuardar._id
      var nombre = prioridadGuardar.nombre
      try {
        let response = await fetch('http://localhost:3000/api/prioridades/actualizarPrioridad?id=' + id, {
          method: 'POST',
          body: JSON.stringify({
            nombre
          }),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        });
        response = await response.json();
        console.log(response)
        buscarPrioridades();
        setStyleBoton("boton-enlace-disabled")
        setShowWarningPrioridadEliminarGuardar(true)
      } catch (errorMessage) {
        console.log(errorMessage);
      }

    }

  }


  const onSubmitCrearEstado = async (data) => {
    console.log(data.estado)
    const nombre = data.estado
    var idUsuario = getCookie("id");//coges los datos del form y el id

    try {//peticion para que lo guarde
      let response = await fetch('http://localhost:3000/api/estados/crearEstado', {
        method: 'POST',
        body: JSON.stringify({ nombre, idUsuario }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      console.log(response)

      if (response != null) {
        setShowWarningEstado(true);//lo guardas, aviso y limpias
        resetFieldEstado("estado")
        buscarEstados();
      }

    } catch (errorMessage) {
      console.log(errorMessage);
    }

  }

  const handleChangeEstado = (e, id) => {
    console.log("manejar cambio input")
    setStyleBoton("boton-enlace")//activas el boton

    var nuevos = estados.map(function (estado) {
      if (estado._id == id) {
        estado.nombre = e.target.value//guardas nuevo nombre
      }

      return estado;
    });

    console.log("nuevos estados:")
    console.log(nuevos)
    setEstados(nuevos)


  }

  const handleChangeTema = (e, id) => {
    console.log("manejar cambio input")
    setStyleBoton("boton-enlace")//activas boton

    var nuevos = temas.map(function (tema) {
      if (tema._id == id) {
        tema.nombre = e.target.value//guardas nuevo  nombre
      }

      return tema;
    });

    console.log("nuevos temas:")
    console.log(nuevos)
    setTemas(nuevos)


  }


  const handleChangePrioridad = (e, id) => {
    console.log("manejar cambio input")//igual anteriores
    setStyleBoton("boton-enlace")

    var nuevos = prioridades.map(function (prioridad) {
      if (prioridad._id == id) {
        prioridad.nombre = e.target.value
      }

      return prioridad;
    });

    console.log("nuevos prioridades:")
    console.log(nuevos)
    setPrioridades(nuevos)


  }



  const selectCambio = (event) => {
    const value = event.target.value;
    setFiltro(value);//guardas el filtro nuevo
    setStyleBotonFiltro("boton-enlace")//activas boton
  };



  const actualizarFiltro = async () => {
    var id = getCookie("id");
    if (styleBotonFiltro != "boton-enlace-disabled") {//si el boton esta activado
      try {//mandas peticion
        let response = await fetch('http://localhost:3000/api/usuarios/actualizarFiltro?id=' + id, {
          method: 'POST',
          body: JSON.stringify({
            filtro: filtro
          }),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        });
        response = await response.json();
        console.log(response)
        setCookie('filtro', filtro);
        setShowWarningFiltro(true);//pones aviso y desactivas boton
        setStyleBotonFiltro("boton-enlace-disabled")
      } catch (errorMessage) {
        console.log(errorMessage);
      }
    }
  }

  return (
    <div>

      <div className='bg-naranja-claro p-5'>
        <div className='container mx-auto'>
          <h1 className='text-5xl font-bold text-center'>Ajustes</h1>


          {/**temas */}
          <div className='contenedor-temas bg-white rounded-lg p-4 mt-8'>
            <div className='titulos-arriba flex items-center'>
              <h1 className='titulo-azul'>Mis temas</h1>
              {showWarningTemaEliminarGuardar && <p className='exito-filtro'>Cambio realizado con exito</p>}
            </div>

            <div className='flex md:flex-row flex-col flex-wrap  '>


              {/**recorres temas */}
              {temas.map((elemento, index) => (
                <div className='exterior-carta mt-3 md:w-1/3 w-full  p-3'>

                  <div className=' elemento h-full flex flex-col  items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>


                    {elemento.mostrar == 1 ? (<input class=" shadow mb-3 mt-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="estadoNuevo" value={elemento.nombre} onChange={(e) => handleChangeTema(e, elemento._id)}></input>) : (<h1 className='font-bold text-3xl'>{elemento.nombre}</h1>)}


                    {elemento.mostrar == 1 ? (<div>
                      <button className={styleBoton} onClick={() => handleEditarTemaGuardar(elemento._id)}>Guardar</button>
                    </div>) : (<div className='flex flex-col'>
                      <button className='boton-enlace' onClick={() => handleEditarTema(elemento._id)}>Editar</button>
                      <button className='boton-rojo' onClick={() => handleBorrarTema(elemento._id)}>Eliminar</button>
                    </div>)}

                  </div>
                </div>
              ))}


              {/**carta para crear tema */}
              <form onSubmit={handleSubmitTema(onSubmitCrearTema)} className='mt-3 elemento md:w-1/3 w-full flex flex-col items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>
                <h1 className='font-bold text-3xl'>Crear tema</h1>
                <input class=" shadow mb-3 mt-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="tema"
                  {...registerTema("tema", {
                    required: true

                  })} />
                {errorsTema.tema?.type === "required" && (
                  <p className="alerta">Introduce un tema</p>
                )}
                {showWarningTema && <p className='exito'>Guardado con exito</p>}
                <button className='boton-enlace' type="submit" >Crear</button>


              </form>


            </div>
          </div>



          {/**estados */}
          <div className='contenedor-temas bg-white rounded-lg p-4 mt-8'>
            <div className='titulos-arriba flex items-center'>
              <h1 className='titulo-azul'>Mis estados</h1>
              {showWarningEstadoEliminarGuardar && <p className='exito-filtro'>Cambio realizado con exito</p>}
            </div>
            <div className='flex md:flex-row flex-col flex-wrap  '>


              {/**recorres estados */}
              {estados.map((elemento, index) => (
                <div className='exterior-carta mt-3 md:w-1/3 w-full  p-3'>

                  <div className=' elemento h-full flex flex-col  items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>


                    {elemento.mostrar == 1 ? (<input class=" shadow mb-3 mt-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="estadoNuevo" value={elemento.nombre} onChange={(e) => handleChangeEstado(e, elemento._id)}></input>) : (<h1 className='font-bold text-3xl'>{elemento.nombre}</h1>)}


                    {elemento.mostrar == 1 ? (<div>
                      <button className={styleBoton} onClick={() => handleEditarEstadoGuardar(elemento._id)}>Guardar</button>
                    </div>) : (<div className='flex flex-col'>
                      <button className='boton-enlace' onClick={() => handleEditarEstado(elemento._id)}>Editar</button>
                      <button className='boton-rojo' onClick={() => handleBorrarEstado(elemento._id)}>Eliminar</button>
                    </div>)}

                  </div>
                </div>
              ))}





              {/**carta para crear estado */}
              <form onSubmit={handleSubmitEstado(onSubmitCrearEstado)} className='mt-3 elemento md:w-1/3 w-full flex flex-col items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>
                <h1 className='font-bold text-3xl'>Crear estado</h1>
                <input class=" shadow mb-3 mt-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="estado"
                  {...registerEstado("estado", {
                    required: true

                  })} />
                {errorsEstado.estado?.type === "required" && (
                  <p className="alerta">Introduce un estado</p>
                )}
                {showWarningEstado && <p className='exito'>Guardado con exito</p>}
                <button className='boton-enlace'>Crear</button>


              </form>


            </div>
          </div>



          {/**prioridades */}
          <div className='contenedor-temas bg-white rounded-lg p-4 mt-8'>
            <div className='titulos-arriba flex items-center'>
              <h1 className='titulo-azul'>Mis prioridades</h1>
              {showWarningPrioridadEliminarGuardar && <p className='exito-filtro'>Cambio realizado con exito</p>}
            </div>
            <div className='flex md:flex-row flex-col flex-wrap  '>



              {/**recorres prioridades */}
              {prioridades.map((elemento, index) => (
                <div className='exterior-carta mt-3 md:w-1/3 w-full  p-3'>

                  <div className=' elemento h-full flex flex-col  items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>


                    {elemento.mostrar == 1 ? (<input class=" shadow mb-3 mt-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="estadoNuevo" value={elemento.nombre} onChange={(e) => handleChangePrioridad(e, elemento._id)}></input>) : (<h1 className='font-bold text-3xl'>{elemento.nombre}</h1>)}


                    {elemento.mostrar == 1 ? (<div>
                      <button className={styleBoton} onClick={() => handleEditarPrioridadGuardar(elemento._id)}>Guardar</button>
                    </div>) : (<div className='flex flex-col'>
                      <button className='boton-enlace' onClick={() => handleEditarPrioridad(elemento._id)}>Editar</button>
                      <button className='boton-rojo' onClick={() => handleBorrarPrioridad(elemento._id)}>Eliminar</button>
                    </div>)}

                  </div>
                </div>
              ))}



              {/**carta para crear prioridad */}
              <form onSubmit={handleSubmitPrioridad(onSubmitCrearPrioridad)} className='mt-3 elemento md:w-1/3 w-full flex flex-col items-center justify-center border border-4 rounded-lg border-naranja-claro p-3'>
                <h1 className='font-bold text-3xl'>Crear prioridad</h1>
                <input class=" shadow mb-3 mt-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="prioridad"
                  {...registerPrioridad("prioridad", {
                    required: true

                  })} />
                {errorsPrioridad.prioridad?.type === "required" && (
                  <p className="alerta">Introduce una prioridad</p>
                )}
                {showWarningPrioridad && <p className='exito'>Guardado con exito</p>}
                <button className='boton-enlace'>Crear</button>


              </form>


            </div>
          </div>




          {/**filtro */}
          <div className='contenedor-temas bg-white rounded-lg p-4 mt-8'>
            <h1 className='titulo-azul'>Filtro vista principal</h1>
            <div className='flex md:flex-row flex-col items-center w-full'>


              {/**texto izq */}
              <div className='texto md:w-1/2 w-full p-3'>
                <h1 className='font-bold text-2xl text-center'>En la vista principal las tareas se agrupan por:</h1>
              </div>


              {/**select */}
              <div className='select md:w-1/2 w-full p-3'>
                <select value={filtro} onChange={selectCambio} class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                  <option value="estado">Estado</option>
                  <option value="tema">Tema</option>
                  <option value="prioridad">Prioridad</option>

                </select>
              </div>


            </div>

            <div className='boton-div mt-5 flex flex-row justify-center items-center'>
              <button className={styleBotonFiltro} onClick={actualizarFiltro}>Actualizar filtro</button>
            </div>
            {showWarningFiltro && <p className='exito text-center mt-3'>Guardado con exito</p>}


          </div>






        </div>
      </div>


    </div>
  )
}
