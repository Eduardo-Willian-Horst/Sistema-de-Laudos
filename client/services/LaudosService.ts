import axios from 'axios'
const baseUrl = 'http://localhost:3001/laudo'

class LaudosService {

    async getLaudos(token: string | null) {
        return await axios.get(`${baseUrl}/listar`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }

    getLaudo(id: any, token: any) {
        return axios.get(`${baseUrl}/buscar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addLaudo(data: any, token: any) {
        return axios.post(`${baseUrl}/criar`, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => response.status)
          .catch(error => {
              console.error('Error fetching data:', error);
              throw error;
          });
    }

    deleteLaudo(id: any, token: any) {
        return axios.delete(`${baseUrl}/remover/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover laudo', error)
            })
    }

}

export default new LaudosService()