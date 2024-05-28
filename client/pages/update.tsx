import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import PacienteService from '@/services/PacienteService';
import AuthContext from '@/components/authContext';

const Registrar = () => {
    const { itemId } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nome: '',
        dataDeNascimento: '',
        sexo: '',
    });

    useEffect(() => {
        PacienteService.getPaciente(itemId, token).then((data: any) => {
            // Format the date to 'yyyy-MM-dd'
            const formattedDate = new Date(data.dataDeNascimento).toISOString().split('T')[0];
            setItemData({ ...data, dataDeNascimento: formattedDate });
            setFormData({ ...data, dataDeNascimento: formattedDate });
        }).catch();
    }, [itemId, token]);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission

        PacienteService.updatePaciente(itemId, formData, token).then((data) => {
            console.log('Paciente atualizado:');
            if (data === 204) {
                navigate('/listar');
            }
            setFormData({
                nome: '',
                dataDeNascimento: '',
                sexo: '',
            });
        }).catch((error: { data: any; }) => {
            console.log('Erro ao atualizar o paciente:', error);
        });
    };

    if (!itemData) {
        return (
            <h4>Carregando</h4>
        );
    }

    return (
        <div className="formulario">
            <h2>Atualizar Paciente</h2>
            <Form onSubmit={handleSubmit} className="formulario">
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

                <Form.Group>
                    <Button type="submit">Registrar</Button>
                    <Button onClick={() => navigate('/')}>Voltar</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Registrar;
