import axios from 'axios'
import localStorage from '@/utils/localStorage'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosInstance2 = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    return error.response
  }
)

axiosInstance2.interceptors.request.use(
  function (config) {
    const { token } = localStorage.getAuth()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosInstance2.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    return error.response
  }
)

export { axiosInstance, axiosInstance2 }
