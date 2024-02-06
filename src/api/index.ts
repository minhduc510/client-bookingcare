import {
  LoginProps,
  MarkdownProps,
  RegisterProps,
  ScheduleBodyProps,
  ParamsSearchUserProps,
  BookingBodyProps
} from '@/interface'
import { axiosInstance, axiosInstance2 } from './custom'

const linkApi = {
  getAllUserClients:
    import.meta.env.VITE_URL_SERVER + '/api/user/clients',
  getAllUserDoctors:
    import.meta.env.VITE_URL_SERVER + '/api/user/doctors',
  getUser: (userId: number) =>
    import.meta.env.VITE_URL_SERVER + '/api/user/' + userId,
  getAllSlide:
    import.meta.env.VITE_URL_SERVER + '/api/sliders',
  getAllPosition:
    import.meta.env.VITE_URL_SERVER + '/api/positions',
  getOutstandingDoctor:
    import.meta.env.VITE_URL_SERVER +
    '/api/user/outstanding-doctor',
  getDetailDoctor: (doctorId: number) =>
    `${
      import.meta.env.VITE_URL_SERVER
    }/api/user/doctors/${doctorId}`,
  getSchedule: (doctorId: number) =>
    `${
      import.meta.env.VITE_URL_SERVER
    }/api/schedules/day/${doctorId}`,
  getClientBooking: `${
    import.meta.env.VITE_URL_SERVER
  }/api/bookings/client`,
  getDoctorBooking: `${
    import.meta.env.VITE_URL_SERVER
  }/api/bookings/doctor`
}

const apiNoToken = {
  login: async (body: LoginProps) => {
    const response = await axiosInstance.post(
      '/api/auth/login',
      body
    )
    return response.data
  },
  register: async (body: RegisterProps) => {
    const response = await axiosInstance.post(
      '/api/auth/register',
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
  },
  getOutstandingDoctor: () => {
    return async (url: string) => {
      const response = await axiosInstance.get(url)
      return response.data
    }
  },
  getDetailDoctor: () => {
    return async (url: string) => {
      const response = await axiosInstance.get(url)
      return response.data
    }
  },
  getAllSpecialist: async () => {
    const response = await axiosInstance.get(
      'api/specialists'
    )
    return response.data
  },
  getSpecialist: async (id: number) => {
    const response = await axiosInstance.get(
      'api/specialists/' + id
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
  createUser: async (body: FormData) => {
    const response = await axiosInstance2.post(
      'api/user',
      body,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  },
  updateUser: async (userId: number, body: FormData) => {
    const response = await axiosInstance2.put(
      'api/user/' + userId,
      body,
      { headers: { 'Content-Type': 'multipart/form-data' } }
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
  setOutstandingDoctor: async (doctors: number[]) => {
    const response = await axiosInstance2.post(
      'api/user/outstanding-doctor',
      { doctors }
    )
    return response.data
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
  },
  getAllPosition: () => {
    return async (url: string) => {
      const response = await axiosInstance2.get(url)
      return response.data
    }
  },
  createPosition: async (body: { name: string }) => {
    const response = await axiosInstance2.post(
      'api/positions',
      body
    )
    return response.data
  },
  updatePosition: async (
    positionId: number,
    body: { name: string }
  ) => {
    const response = await axiosInstance2.put(
      'api/positions/' + positionId,
      body
    )
    return response.data
  },
  deletePosition: async (positionId: number) => {
    const response = await axiosInstance2.delete(
      'api/positions/' + positionId
    )
    return response.data
  },
  updateOrCreateMarkdown: async (body: MarkdownProps) => {
    const response = await axiosInstance2.post(
      'api/markdown',
      body
    )
    return response.data
  },
  createSchedule: async (
    userId: number,
    body: ScheduleBodyProps
  ) => {
    const response = await axiosInstance2.post(
      'api/schedules/day/' + userId,
      body
    )
    return response.data
  },
  getScheduleByUserId: () => {
    return async (url: string) => {
      const response = await axiosInstance2.get(url)
      return response.data
    }
  },
  removeHour: async (id: number) => {
    const response = await axiosInstance2.delete(
      'api/schedules/hour/' + id
    )
    return response.data
  },
  createBooking: async (body: BookingBodyProps) => {
    const response = await axiosInstance2.post(
      'api/bookings',
      body
    )
    return response.data
  },
  getClientBooking: () => {
    return async (url: string) => {
      const response = await axiosInstance2.get(url)
      return response.data
    }
  },
  getDoctorBooking: () => {
    return async (url: string) => {
      const response = await axiosInstance2.get(url)
      return response.data
    }
  },
  removeClientBooking: async (body: number[]) => {
    let params = '?'
    body.forEach((item, index) => {
      params += `listIdBooking[]=${item}`
      if (index < body.length - 1) {
        params += '&'
      }
    })
    const response = await axiosInstance2.delete(
      'api/bookings' + params
    )
    return response.data
  },
  acceptBooking: async (listIdBooking: number[]) => {
    const response = await axiosInstance2.post(
      'api/bookings/accept-booking',
      {
        listIdBooking
      }
    )
    return response.data
  },
  denyBooking: async (listIdBooking: number[]) => {
    const response = await axiosInstance2.post(
      'api/bookings/deny-booking',
      {
        listIdBooking
      }
    )
    return response.data
  },
  createSpecialist: async (body: FormData) => {
    const response = await axiosInstance2.post(
      'api/specialists',
      body,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  },
  updateSpecialist: async (id: number, body: FormData) => {
    const response = await axiosInstance2.put(
      'api/specialists/' + id,
      body,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  },
  deleteSpecialist: async (id: number) => {
    const response = await axiosInstance2.delete(
      'api/specialists/' + id
    )
    return response.data
  }
}

export { apiNoToken, apiHasToken, linkApi }
