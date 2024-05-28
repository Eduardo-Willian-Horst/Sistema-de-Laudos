import axios from 'axios'
const baseUrl = 'http://localhost:3001/usuarios'

class UsuarioService {

    async getUsuarios(token: string | null, page: number) {
        return await axios.get(`${baseUrl}/listar?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }

    getUsuario(id: any, token: any) {
        return axios.get(`${baseUrl}/buscar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addUsuario(data: any, token: any) {
        return axios.post(`${baseUrl}/registrar`, data, {
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteUsuario(id: any, token: any) {
        return axios.delete(`${baseUrl}/remover/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover usuario', error)
            })
    }

    updateUsuario(id: any, data: any, token: any) {
        return axios.put(`${baseUrl}/atualizar/${id}`, data, {
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new UsuarioService()