import axios from 'axios'
import {SERVER_URL} from '../services/serviceConstants'

const getAll = () => {
    const request = axios.get(`${SERVER_URL}/api/users`)

    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(`${SERVER_URL}/api/users`, newObject);
    return request.then((response) => response.data);
  };

const helpers = {getAll, create}

export default helpers
