export type Mode = 'dark' | 'light' | 'system'
export type Role = 'Client' | 'Doctor' | 'Admin'

export interface LoginProps {
  email: string
  password: string
}

export interface UserProps {
  id?: string
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  phone?: string
  avatar?: string
  address?: string
  gender?: number
  status?: number
  roles?: Role[]
}

export interface ParamsSearchUserProps {
  page: number
  keyword?: string
  status?: number
}

export interface ISliceProps {
  id: number
  image: string
  title: string
  order: number
}
