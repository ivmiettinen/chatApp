import axios from 'axios'
import {SERVER_URL} from '../services/serviceConstants'

const getAll = () => {
    const request = axios.get(`${SERVER_URL}/api/users`)
    return request.then((response) => response.data)
}

export default { getAll }
