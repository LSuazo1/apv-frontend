import { Link } from 'react-router-dom'

function AdminNav() {
    return (
        <>
            <nav>
                <Link
                    to="/admin/perfil"
                    className="font-bold uppercase text-gray-500 p-5"
                >Perfil</Link>
                <Link
                    to="/admin/cambiar-password"
                    className="font-bold uppercase text-gray-500"
                >Cambiar Password</Link>
            </nav>

        </>
    )
}

export default AdminNav
