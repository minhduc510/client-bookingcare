import { LoginProps } from '@/interface'
import { axiosInstance } from './custom'

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

export { apiNoToken }
