import {Link} from "react-router-dom";
import Logout from "@/components/logout";
import AuthContext from "@/components/authContext";
import {useContext, useEffect, useState} from "react";


export default function NavBar() {
    const { isAuthenticated } = useContext(AuthContext)
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); 

        return () => clearInterval(intervalId); 
    }, []); 

    const formatTime = (time: Date) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    return (
        isAuthenticated ?
        <nav className="nav navbar navbar-expand navbar-dark bg-dark">
            
            <div className="container-fluid">
                
                <div className="navbar-nav mr-auto  nav-underline">
                    <Link to="/" className="navbar-brand px-3">
                        <span className="navbar-brand mb-0 h1">{formatTime(currentTime)}</span>
                    </Link>
                    <li className="nav-item">
                        <Link to={"/registrarLaudo"} className="nav-link">
                            Criar Laudo
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/registrarPaciente"} className="nav-link">
                            Registrar Paciente
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/listar"} className="nav-link">
                            Gerênciar Pacientes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/listarlaudos"} className="nav-link">
                            Listar laudos
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav ml-auto px-3">
                    <li className="nav-item">
                        <Logout/>
                    </li>
                </div>
            </div>
        </nav> : null
    )
}