import usePacientes from '../hooks/usePacientes';
import Paciente from './Paciente';

const ListadoPacientes = () => {

  const {pacientes}=usePacientes();
  const arregloPacientes=pacientes.pacientes;
  return (
    <>
      {arregloPacientes.length?
      (
        <>
         <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
        
        <p className="text-xl mt-5 mb-10 text-center">
            Administra tus  {''}

            <span className="text-indigo-600 text-bold">Pacientes y Citas</span>
        </p>

          {arregloPacientes.map(paciente=>(
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ):(
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
        
          <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregar pacientes {''}

              <span className="text-indigo-600 text-bold">y aparareceran en este lugar</span>
          </p>
        
        </>
      )}
    </>
  )
}

export default ListadoPacientes