import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2'
const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token');
                if (!token) return

                const config = {
                    headers: { token }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [auth, pacientes]);

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: { token }
        }
        console.log(
            paciente.id
        );
        if (paciente.id) {

            try {
                const { data } = await clienteAxios.put(`/pacientes/actualizar/${paciente.id}`, paciente, config)

                const pacientesActualizado = pacientes.map(pacientesState => pacientesState.id = data.id ? data : pacientesState)

                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error);
            }



        } else {
            try {

                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                const { createAt, updateAt, __v, ...pacienteAlmacenado } = data

                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error);
            }
        }



    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }


    const eliminarPaciente = (id) => {
        try {
            Swal.fire({
                title: 'Advertencia',
                text: 'Desea eliminar el paciente?',
                icon: 'warning',
                showDenyButton: true,
                denyButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar',
                confirmButtonColor: 'green'
            }).then(response => {
                if (response.isConfirmed) {
                    const token = localStorage.getItem('token')
                    const config = {
                        headers: { token }
                    }
                    const { data } = clienteAxios.delete(`/pacientes/eliminar/${id}`, config);
                    Swal.fire('Exito', 'El registro se elimino', 'success');
                } else if (response.isDenied) {
                    return;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPaciente,
                setEdicion,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )

}

export {
    PacientesProvider
}

export default PacientesContext;