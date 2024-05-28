import axios from 'axios'
const baseUrl = 'http://localhost:3001/doenca'

class DoencasService {

    async getDoencas(token: string | null) {
        return await axios.get(`${baseUrl}/listar`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }


    getDoenca(id: any, token: any) {
        return axios.get(`${baseUrl}/buscar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    
}

export default new DoencasService()