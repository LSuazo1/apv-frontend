import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta,setAlerta] = useState({});


  const handleSubmit = async(e) => {
    e.preventDefault();
    // validando el email
    if (email==='' || email.length<6) {
      setAlerta({msg:'El email es obligatoriao',error:true});
      return;
    }

    try {
      const {data}=await clienteAxios.post('/olvide-password',{email});
      setAlerta({ msg: data.msg, error:false})
   
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error:true})
    }



  }

  const { msg } = alerta;
  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu cuenta y no Pierdas {""}
          <span className="text-black">tusPacientes</span></h1>
      </div>
      <div>

      {msg &&
          <Alerta
            alerta={alerta}
          />
        }


        <form className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white "
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar"
            className="bg-indigo-700 w-full py-3 px-10
                        rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer
                         hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/ "
            className="block text-center text-gray-500 hover:cursor-pointer hover:text-indigo-800">
            Ya tienes una cuenta?,Inicia Sesion</Link>
          <Link to="/registrar "
            className="block text-center text-gray-500 hover:cursor-pointer hover:text-indigo-800">
            No tienes una cuenta Registrate?Registrate</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword