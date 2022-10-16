import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({ msg: 'el Password debe ser minimo de 6 caracteres', error: true })
            return;
        }

        if (password !== confirmarPassword | [password, setPassword].includes('')) {
            setAlerta({ msg: 'Verfique su contrasenia', error: true })
            return;
        }
        try {
            const url = `/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password });
            setPasswordModificado(true);
            setAlerta({ msg: data.msg })
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }

    }

    const params = useParams();
    const { token } = params
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/olvide-password/${token}`)
                setAlerta({ msg: 'Coloca tu Nuevo Password', error: false })
                setTokenValido(true);
            } catch (error) {
                setAlerta({ msg: 'Hubo un error con el enlace', error: true })
            }
        }
        comprobarToken();
    }, [])




    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Reestablece tu password y no Pierdas acceso a {""}
                    <span className="text-black">tus Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">

                {msg &&
                    <Alerta
                        alerta={alerta}
                    />
                }
                {tokenValido && (
                    <>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="my-5">
                                <label
                                    className="uppercase text-gray-600 block text-xl font-bold"
                                >
                                    Password
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nuevo password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-5">
                                <label
                                    className="uppercase text-gray-600 block text-xl font-bold"
                                >
                                    Confirmar Password
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nuevo password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={confirmarPassword}
                                    onChange={(e) => setConfirmarPassword(e.target.value)}
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
                    </>
                )}
                {passwordModificado &&
                    <Link to="/ "
                        className="block text-center text-gray-500 hover:cursor-pointer hover:text-indigo-800">
                        Inicia Sesion</Link>

                }

            </div>
        </>
    )
}

export default NuevoPassword