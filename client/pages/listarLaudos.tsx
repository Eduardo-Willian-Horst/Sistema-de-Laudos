    import React, {useState, useEffect, useContext} from 'react'
    import Table from 'react-bootstrap/Table'
    import Button from 'react-bootstrap/Button'
    import {FaEdit, FaTrash} from 'react-icons/fa'
    import { useNavigate } from 'react-router-dom'
    import UsuarioService from "@/services/usuarioService";
    import PacienteService from '@/services/PacienteService'
    import AuthContext from "@/components/authContext";
    import PaginationU from "@/components/pagination";
    import LaudosService from '@/services/laudosService'
    import DoencasServices from '@/services/DoencasServices'

    const ListarLaudos = () => {
        const navigate = useNavigate();
        const { token } = useContext(AuthContext);
        const [laudos, setLaudos] = useState<any>(null);
        const [error, setError] = useState(null);
        const [pacientes, setPacientes] = useState<any>([]);
        const [doencas, setDoencas] = useState<any>([]);

        useEffect(() => {
            LaudosService.getLaudos(token).then((data) => {
                setLaudos(data);
            }).catch((error) => {
                console.error('Erro ao listar laudos:', error);
                setError(error);
            });
        
            PacienteService.getPacientes(token).then((data) => {
                setPacientes(data);
            }).catch((error) => {
                console.error('Erro ao listar pacientes:', error);
                setError(error);
            });

            DoencasServices.getDoencas(token).then((data) => {
                setDoencas(data);
            }).catch((error) => {
                console.error('Erro ao buscar doencas: ', error);
                setError(error);
            });

        }, [token]);



        useEffect(() => {
            LaudosService.getLaudos(token).then((data) => {
                setLaudos(data);
            }).catch((error) => {
                console.error('Erro ao listar laudos:', error);
                setError(error);
            });
        }, [token]);

        const handleRemove = async (id: any) => {
            LaudosService.deleteLaudo(id, token).then(() => {
                setLaudos(laudos.filter((laudo: { id: any }) => laudo.idLaudo !== id));
            }).catch((error) => {
                console.error('Erro ao deletar laudo:', error);
                setError(error);
            });
        };

        if (error) {
            return <div>Erro</div>; 
        }

        if (!laudos) {
            return <div>Loading...</div>;
        }

        const getPacienteNome = (id: any) => {
            const paciente = pacientes.find((p: { id: any }) => p.id === id);
            return paciente ? paciente.nome : 'Desconhecido';
        };

        const getDoencaDescricao = (id: any) => {
            const doenca = doencas.find((d: { id: any }) => d.id === id);
            return doenca ? doenca.descricao : 'Desconhecido';
        };

        return (
            <div>
                <h3>Lista de Pacientes</h3>
                <Table responsive="sm">
                    <thead>
                    <tr>
                        <th>Nome do Paciente</th>
                        <th>Doença</th>
                        <th>Deletar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {laudos.map((laudo: any) => (
                        <tr key={laudo.id}>
                            <td>{getPacienteNome(laudo.idPaciente)}</td>
                            <td>{getDoencaDescricao(laudo.idDoenca)}</td>
                            <td>
                                <Button onClick={() => handleRemove(laudo.idLaudo)}>
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

    export default ListarLaudos