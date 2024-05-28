import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PacienteService from "@/services/PacienteService";
import AuthContext from "@/components/authContext";

const ListarPacientes = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [pacientes, setPacientes] = useState<any>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        PacienteService.getPacientes(token).then((data) => {
            setPacientes(data);
        }).catch((error) => {
            console.error('Erro ao listar pacientes:', error);
            setError(error);
        });
    }, [token]);

    const handleRemove = async (id: any) => {
        PacienteService.deletePaciente(id, token).then(() => {
            setPacientes(pacientes.filter((paciente: { id: any }) => paciente.id !== id));
        }).catch((error) => {
            console.error('Erro ao deletar paciente:', error);
            setError(error);
        });
    };

    if (error) {
        return <div>Erro</div>; 
    }

    if (!pacientes) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Lista de Pacientes</h3>
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th>Sexo</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {pacientes.map((paciente: any) => (
                    <tr key={paciente.id}>
                        <td>{paciente.nome}</td>
                        <td>{paciente.dataDeNascimento}</td>
                        <td>{paciente.sexo}</td>
                        <td>
                            <Button onClick={() => navigate(`/atualizar/${paciente.id}`)}>
                                <FaEdit />
                            </Button>
                            <Button onClick={() => handleRemove(paciente.id)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListarPacientes;
