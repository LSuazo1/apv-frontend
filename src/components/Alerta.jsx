import React from 'react'

function Alerta({alerta}) {
  
  return (
    <div className={`${alerta.error? 'from-red-400 to-red-600': 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase font-bold text-white text-sn mb-2`}>
      <h1>{alerta.msg}</h1>
    </div>
  )
}

export default Alerta
