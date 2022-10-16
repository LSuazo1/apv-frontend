import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/confirmar/${id}`
        const { data } = await clienteAxios(url)

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg, error: false
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg, error: true
        })
      }
      setCargando(false)
    }
    confirmarCuenta();
  }, []);

  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y Comienza a administrar {""}
          <span className="text-black">tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">
        {!cargando &&
          <Alerta
            alerta={alerta}
          />}

        {cuentaConfirmada && (
          <Link to="/ "
            className="block text-center text-gray-500 hover:cursor-pointer hover:text-indigo-800">
            Iniciar Sesion</Link>
        )}
      </div>


    </>
  )
}

export default ConfirmarCuenta