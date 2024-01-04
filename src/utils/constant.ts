import {
  FaUser,
  FaInfo,
  IoMdHome,
  FaUserDoctor,
  IoSettingsSharp,
  TfiLayoutSliderAlt
} from '@/icons'

const MENU_ADMIN = {
  controls: [
    {
      link: '/admin',
      name: 'Dashboard',
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
      link: '/admin/sliders',
      name: 'Slider',
      icon: TfiLayoutSliderAlt,
      sizeIcon: 20
    }
  ],
  personal: [
    {
      link: '/info',
      name: 'Thông tin cá nhân',
      icon: FaInfo,
      sizeIcon: 16
    },
    {
      link: '/settings',
      name: 'Cài đặt',
      icon: IoSettingsSharp,
      sizeIcon: 16
    }
  ]
}

export default MENU_ADMIN
