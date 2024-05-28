import React, { useContext } from 'react'
import AuthContext from "@/components/authContext"
import {Link, useNavigate} from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Link to={"/"} onClick={handleLogout} className="btn btn-outline-danger">
            Logout
        </Link>
    )
}

export default Logout