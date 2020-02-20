import axios from 'axios'

const API_URL = 'https://0.0.0.0:32616'

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { plainAxiosInstance }
