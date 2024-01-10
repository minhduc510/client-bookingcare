import {
  Role,
  UserProps,
  LoginProps,
  ParamsSearchUserProps
} from '@/interface'
import { axiosInstance, axiosInstance2 } from './custom'

interface CreateUserProps extends UserProps {
  roles: Role[]
}

const linkApi = {
  getAllUserClients:
    import.meta.env.VITE_URL_SERVER + '/api/user/clients',
  getAllUserDoctors:
    import.meta.env.VITE_URL_SERVER + '/api/user/doctors',
  getUser: (userId: number) =>
    import.meta.env.VITE_URL_SERVER + '/api/user/' + userId,
  getAllSlide:
    import.meta.env.VITE_URL_SERVER + '/api/sliders'
}

const apiNoToken = {
  login: async (body: LoginProps) => {
    const response = await axiosInstance.post(
      '/api/auth/login',
      body
    )
    return response.data
  },
  sendMailGetPassWord: async (email: string) => {
    const response = await axiosInstance.get(
      `/api/auth/sendMail-getPassWord?email=${email}`
    )
    return response.data
  },
  checkTokenEmail: async (token: string) => {
    const response = await axiosInstance.get(
      `/api/auth/token-email?token=${token}`
    )
    return response.data
  },
  recoverPassWord: async (
    userId: number,
    password: string
  ) => {
    const response = await axiosInstance.post(
      `/api/auth/recover-password/${userId}`,
      { password }
    )
    return response.data
  }
}

const apiHasToken = {
  userCurrent: async (token: string) => {
    const response = await axiosInstance2.get(
      'api/user/current',
      {
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
      }
    )
    return response.data
  },
  getUser: () => {
    return async (url: string) => {
      const response = await axiosInstance2.get(url)
      return response.data
    }
  },
  createUser: async (body: CreateUserProps) => {
    const response = await axiosInstance2.post(
      'api/user',
      body
    )
    return response.data
  },
  updateUser: async (userId: number, body: UserProps) => {
    const response = await axiosInstance2.put(
      'api/user/' + userId,
      body
    )
    return response.data
  },
  deleteUser: async (id: number) => {
    const response = await axiosInstance2.delete(
      `api/user/${id}`
    )
    return response.data
  },
  getAllUser: () => {
    return async ([url, options]: [
      string,
      ParamsSearchUserProps
    ]) => {
      const response = await axiosInstance2.get(url, {
        params: options
      })
      return response.data
    }
  },
  getAllSlide: () => {
    return async (url: string) => {
      const response = await axiosInstance2.get(url)
      return response.data
    }
  },
  createSlide: async (body: FormData) => {
    const response = await axiosInstance2.post(
      'api/sliders',
      body,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  },
  updateSlide: async (slideId: number, body: FormData) => {
    const response = await axiosInstance2.put(
      'api/sliders/' + slideId,
      body,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  },
  deleteSlide: async (slideId: number) => {
    const response = await axiosInstance2.delete(
      'api/sliders/' + slideId
    )
    return response.data
  },
  orderSlide: async (orders: number[]) => {
    let stringOrders = ''
    orders.forEach((order, index) => {
      stringOrders += `order[]=${order}`
      if (index <= orders.length - 1) {
        stringOrders += '&'
      }
    })
    const response = await axiosInstance2.post(
      'api/sliders/change-order?' + stringOrders
    )
    return response.data
  }
}

export { apiNoToken, apiHasToken, linkApi }
