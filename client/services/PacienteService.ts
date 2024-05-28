import axios from 'axios'
const baseUrl = 'http://localhost:3001/paciente'

class PacienteService {

    async getPacientes(token: string | null) {
        return await axios.get(`${baseUrl}/listar`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }

    async getPacientesPage(token: string | null, page: number) {
        return await axios.get(`${baseUrl}/listar?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }

    getPaciente(id: any, token: any) {
        return axios.get(`${baseUrl}/buscar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addPaciente(data: any, token: any) {
        return axios.post(`${baseUrl}/registrar`, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => response.status)
          .catch(error => {
              console.error('Error fetching data:', error);
              throw error;
          });
    }
    

    deletePaciente(id: any, token: any) {
        return axios.delete(`${baseUrl}/remover/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover usuario', error)
            })
    }

    updatePaciente(id: any, data: any, token: any) {
        return axios.put(`${baseUrl}/atualizar/${id}`, data, {
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new PacienteService()