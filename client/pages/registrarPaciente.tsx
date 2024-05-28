import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import AuthContext from "@/components/authContext";
import PacienteService from '@/services/PacienteService';

const RegistrarPaciente = () => {
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        dataDeNascimento: '',
        sexo: '',
    })

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
    
        try {
            const response = await PacienteService.addPaciente(formData, token);
            console.log('Paciente adicionado:', response);
            setMessage('Paciente adicionado com sucesso!');
            setFormData({
                nome: '',
                dataDeNascimento: '',
                sexo: '',
            });
        } catch (error) {
            setMessage('Erro ao adicionar o paciente. Verifique se todos os campos estao preenchidos!');
            console.log('Erro ao adicionar o paciente:', error);
        }
    };

    return (
        <div className={"formulario"}>
            <h2>Adicionar paciente</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Data de nascimento</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="data"
                        id="dataDeNascimento"
                        name="dataDeNascimento"
                        value={formData.dataDeNascimento}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">

                    <Form.Label>Sexo</Form.Label>
                    <Form.Select
                        id="sexo"
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="O">Outro</option>
                    </Form.Select>

                </Form.Group>
                {message && <div className="alert alert-info">{message}</div>}
                <Form.Group>
                    <Button type="submit">Adicionar</Button>
                </Form.Group>

            </Form>
        </div>
    );
};

export default RegistrarPaciente;