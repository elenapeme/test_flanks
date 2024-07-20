import axios from 'axios'

const BASE_URL = "http://localhost:3000"

export const apiClient = axios.create({
    baseURL: BASE_URL, // Replace with your backend URL
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})