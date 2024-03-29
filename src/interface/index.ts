export type Gender = 0 | 1
export type Mode = 'dark' | 'light' | 'system'
export type Role = 'Client' | 'Doctor' | 'Admin'
export type SlideGeneral = 'Specialist' | 'Clinic'

export interface LoginProps {
  email: string
  password: string
  _type: Role
}

export interface RegisterProps {
  email: string
  password: string
  firstName: string
  lastName: string
  address: string
  phone: string
  gender: number
  _type: Role
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
  typeLogin?: number
  roles?: Role[]
  outstanding?: boolean
  positions?: PositionProps[]
  doctor_info?: InfoDoctorProps
}

export interface InfoDoctorProps {
  description: string
  markdown: string
  html: string
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

export interface PositionProps {
  id: number
  name: string
}

export interface DoctorOutstandingProps {
  id?: string
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  phone?: string
  avatar?: string
  address?: string
  specialist?: string
  positions?: string[]
}

export interface MarkdownProps {
  user_id?: number
  clinic_id?: number
  specialist_id?: number
  description?: string
  markdown?: string
  html?: string
}

export interface ScheduleBodyProps {
  day: number
  hours: { from: number; to: number } | null
}

export interface ScheduleDayProps {
  id: number
  user_id: number
  content: string
  timestamp: string
  hour: ScheduleHourProps[]
}

export interface ScheduleHourProps
  extends ScheduleDayProps {
  medicalexaminationday_id: number
}

export interface ScheduleDayBookProps {
  hour_id: number
  day_id: number
  content: string
}

export interface BookingBodyProps {
  doctor_id: number
  medicalexaminationday_id: number
  medicalexaminationhour_id: number
  reason: string
}

export interface SpecialistProps {
  id: number
  html?: string
  image: string
  name: string
  text: string
}

export interface InfoDoctorProps {
  fullName?: string
  avatar?: string
  nameClinic: string
  addressClinic: string
  specialist: string
  priceFrom: number
  priceTo: number
  description: string
  positions: string[]
}

export interface BookingClientProps {
  id: number
  reason: string
  status: -1 | 0 | 1
  time: string
  doctor: InfoDoctorProps
}

export interface BookingPatientProps {
  id: number
  reason: string
  status: -1 | 0 | 1
  time: string
  patient: {
    fullName: string
    avatar: string
    address: string
    phone: string
    email: string
    gender: boolean
  }
}

export interface IEditorProps {
  html: string
  text: string
}

export interface ISlideProps {
  id: number
  image: string
  order: number
  title: string
}

export interface ISpecialistProps extends IEditorProps {
  id: number
  name: string
  image: string
}

export interface DoctorProps {
  id: string
  fullName: string
  nameClinic: string
  addressClinic: string
  description: string
  address: string
  avatar: string
  html: string
  priceFrom: number
  priceTo: number
  positions: PositionProps[]
  schedule_day: ScheduleDayProps[]
}

export interface ListActiveProps {
  id: number
  checked: 0 | 1
}
