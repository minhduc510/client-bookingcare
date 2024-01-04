import axios from 'axios'

const axiosInstance = axios.create({
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

export { axiosInstance }
