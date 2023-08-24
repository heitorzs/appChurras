import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:5000/churrascos/'
})

export default http