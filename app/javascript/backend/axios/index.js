import axios from 'axios'

const API_URL = 'http://ac7a2c89.ngrok.io'

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { plainAxiosInstance }
