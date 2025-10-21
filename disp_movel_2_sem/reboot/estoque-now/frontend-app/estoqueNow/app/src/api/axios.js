import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://10.90.129.19:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
})

export default apiClient