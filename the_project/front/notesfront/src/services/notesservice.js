import axios from 'axios';

//const baseUrl = '/api/notes'

//const baseUrl = 'http://localhost:3004/notes'

const baseUrl = 'http://localhost:3004/api/notes'

let token = null;

const setToken = newToken => {
  token = newToken
}

const makeHeader = () => {
        let header =  {headers: {Authorization: `bearer ${token}`}}
        return header;
}

const getAll = () => {
    const request = axios.get(baseUrl, makeHeader())
    return request.then(response => response.data)
}

const add = (newNote) => {
    const request = axios.post(baseUrl, newNote, makeHeader())
    return request.then(response => response.data)
}

const update = (id, updatedNote) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedNote, makeHeader())
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`, makeHeader())
}

export default {
    getAll: getAll,
    add: add,
    update: update,
    remove: remove,
    setToken: setToken
}