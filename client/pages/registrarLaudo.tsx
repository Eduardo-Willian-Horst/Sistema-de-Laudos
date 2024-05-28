import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";
import AuthContext from "@/components/authContext";
import LaudosService from '@/services/laudosService';
import DoencasServices from '@/services/DoencasServices';
import PacienteService from '@/services/PacienteService';

const RegistrarLaudo = () => {
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        idPaciente: '',
        idDoenca: ''
    })
    const [doencas, setDoencas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDoencas();
    }, []);

    useEffect(() => {
        fetchPacientes();
    })

    const fetchPacientes = async () => {
        try {
            const pacientesData = await PacienteService.getPacientes(token);
            setPacientes(pacientesData);
        } catch (error) {
            console.log('Error fetching pacientes:', error);
        }
    }

    const fetchDoencas = async () => {
        try {
            const doencasData = await DoencasServices.getDoencas(token);
            setDoencas(doencasData);
        } catch (error) {
            console.error('Error fetching doencas:', error);
        }
    };

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        LaudosService.addLaudo(formData, token).then((response) => {
            console.log('Laudo adicionado:')
            setMessage('Laudo criado com sucesso!');
            setFormData({
                idPaciente: '',
                idDoenca: ''
            })
        }).catch((error: { data: any; }) => {
            setMessage('Erro ao criar laudo!');
            console.log('Erro ao adicionar o laudo:', error)
        })
    };

    return (
        <div className={"formulario"}>
            <h2>Criar laudo</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Paciente</Form.Label>
                    <Form.Select
                        id="idPaciente"
                        name="idPaciente"
                        value={formData.idPaciente}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Paciente</option>
                        {pacientes.map((paciente: any) => (
                            <option key={paciente.id} value={paciente.id}>{paciente.nome}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Doença</Form.Label>
                    <Form.Select
                        id="idDoenca"
                        name="idDoenca"
                        value={formData.idDoenca}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Doença</option>
                        {doencas.map((doenca: any) => (
                            <option key={doenca.id} value={doenca.id}>{doenca.descricao}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {message && <div className="alert alert-info">{message}</div>}
                <Button type="submit">Registrar</Button>
            </Form>
        </div>
    );
};

export default RegistrarLaudo;