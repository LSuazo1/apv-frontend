import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios'
const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const enviarFormulario = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'los campos no pueden estar vacios', error: true });
      return;
    }

    if (password != repetirPassword) {
      setAlerta({ msg: 'Los password no son iguales', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'el password es muy corto', error: true });
      return;
    }

    //Crear el usuario en la Api
    try {
     await clienteAxios.post('/',{
          nombre,email,password
      });
      
      setAlerta({ msg: 'Creado Correctamente,revisa tu email', error:false})
      
    } catch (error) {
      console.log(error.response);
        setAlerta({ msg: error.response.data.msg, error:true})
    }
    
    setAlerta({});
  }

  

  
  const { msg } = alerta;
  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra {""}
          <span className="text-black">tus Pacientes</span></h1>
      </div>

      <div>
        {msg &&
          <Alerta
            alerta={alerta}
          />
        }



        <form className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white "
          onSubmit={enviarFormulario}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
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
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="Paswoord"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir Password
            </label>
            <input
              type="Paswoord"
              placeholder="Repite tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>


          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10
                        rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer
                         hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/ "
            className="block text-center text-gray-500 hover:cursor-pointer hover:text-indigo-800">
            Ya tienes una cuenta?Inicia Sesion</Link>
          <Link to="/olvide-password "
            className="block text-center text-gray-500 hover:cursor-pointer hover:text-indigo-800">
            Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar
