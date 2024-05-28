import React, {useContext, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AuthContext from "@/components/authContext"
import axios from "axios"
import styles from "../styles/login.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const baseUrl = 'http://localhost:3001/login'
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const [error, setError] = useState(null);
    const { setIsAuthenticated, setToken } = useContext(AuthContext);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        try {
            const response = await axios.post(`${baseUrl}`, { username: formData.username, password: formData.password }); // Replace with your API endpoint
            const { token } = response.data

            localStorage.setItem('jwtToken', token)
            setIsAuthenticated(true)
            setToken(token)

            navigate('/')
        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.message || 'Login failed')
        }
    };


    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.name}>Sistema de gerência de laudos</h1>
            </div>
            <div className={styles.formulario}>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="usuário"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="senha"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        {error && <p className="error-message">{error}</p>}
                    </Row>
                    <Row>
                        <Col className={styles.buttons}>
                            <Button type="submit">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default Login;