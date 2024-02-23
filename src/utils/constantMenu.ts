import {
  FaUser,
  FaInfo,
  IoMdHome,
  FaUserDoctor,
  GiDoctorFace,
  AiFillSchedule,
  AiOutlineSchedule,
  TfiLayoutSliderAlt,
  LiaHospitalAltSolid
} from '@/icons'

export const MENU_ADMIN = {
  controls: [
    {
      link: '/admin',
      name: 'Trang chủ',
      icon: IoMdHome,
      sizeIcon: 22
    },
    {
      link: '/admin/users',
      name: 'D.Sách Người dùng',
      icon: FaUser,
      sizeIcon: 20
    },
    {
      link: '/admin/doctors',
      name: 'D.Sách Bác sĩ',
      icon: FaUserDoctor,
      sizeIcon: 20
    },
    {
      link: '/admin/establish-doctors',
      name: 'Thiết lập Bác sĩ',
      icon: GiDoctorFace,
      sizeIcon: 20
    },
    {
      link: '/admin/sliders',
      name: 'Slider',
      icon: TfiLayoutSliderAlt,
      sizeIcon: 20
    },
    {
      link: '/admin/medical-schedule',
      name: 'Kế hoạch khám bệnh',
      icon: AiOutlineSchedule,
      sizeIcon: 22
    },
    {
      link: '/admin/specialist',
      name: 'Q.lý chuyên khoa',
      icon: LiaHospitalAltSolid,
      sizeIcon: 22
    }
  ],
  personal: [
    {
      link: '/admin/infomation',
      name: 'Thông tin cá nhân',
      icon: FaInfo,
      sizeIcon: 16
    }
  ]
}

export const MENU_DOCTOR = {
  controls: [
    {
      link: '/doctor',
      name: 'Trang chủ',
      icon: IoMdHome,
      sizeIcon: 22
    },
    {
      link: '/doctor/list-schedule',
      name: 'D.Sách lịch khám',
      icon: IoMdHome,
      sizeIcon: 22
    },
    {
      link: '/doctor/manage-schedule',
      name: 'Q.lý lịch khám',
      icon: FaUser,
      sizeIcon: 20
    },
    {
      link: '/doctor/infomation-detail',
      name: 'Thông tin chi tiết',
      icon: AiFillSchedule,
      sizeIcon: 20
    }
  ],
  personal: [
    {
      link: '/doctor/infomation',
      name: 'Thông tin cá nhân',
      icon: FaInfo,
      sizeIcon: 16
    }
  ]
}
