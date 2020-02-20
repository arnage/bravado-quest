import axios from 'axios'

const API_URL = 'https://agile-hollows-96197.herokuapp.com'

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { plainAxiosInstance }
