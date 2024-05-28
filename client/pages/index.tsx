import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/navBar";
import Registrar from "@/pages/registrarLaudo";
import Listar from "@/pages/listar";
import Update from "@/pages/update";
import ProtectedRoute from "@/components/protectRoute";
import Login from "@/pages/login";
import RegistrarPaciente from './registrarPaciente';
import RegistrarLaudo from '@/pages/registrarLaudo';
import ListarLaudos from '@/pages/listarLaudos';


export default function Home() {
    return (
        <Router>
            <header>
                <NavBar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                {<h1>Bom-Vindo(a)!</h1>}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/registrarPaciente"
                        element={
                            <ProtectedRoute>
                                <RegistrarPaciente />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/registrarLaudo"
                        element={
                            <ProtectedRoute>
                                <RegistrarLaudo />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/listar"
                        element={
                            <ProtectedRoute>
                                <Listar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/listarlaudos"
                        element={
                            <ProtectedRoute>
                                <ListarLaudos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/atualizar/:itemId"
                        element={
                            <ProtectedRoute>
                                <Update />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}
