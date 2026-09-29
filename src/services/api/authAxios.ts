import axios from 'axios'

// const apiUrl = import.meta.env.VITE_CORE_URL ?? 'http://localhost:8080'
// Cuando CORE vuelva a estar disponible, se puede reactivar la URL anterior.
const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export const authAxios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
