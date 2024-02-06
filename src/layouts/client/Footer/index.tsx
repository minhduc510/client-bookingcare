import {
  Box,
  Grid,
  Stack,
  Container,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'

import {
  MdPhone,
  GoCheckbox,
  MdOutlineEmail,
  IoLocationOutline
} from '@/icons'

import Image from '@/components/Image'
import colorCode from '@/configs/color'
import TiktokLogo from '@/assets/svg/tiktok.svg?react'
import YoutubeLogo from '@/assets/svg/youtube.svg?react'
import BookingCareLogo from '@/assets/svg/logo.svg?react'
import FacebookLogo from '@/assets/svg/facebook.svg?react'
import BernardImage from '@/assets/images/logo-bernard.png'
import DoctorCheck2Image from '@/assets/images/doctor-check-2.png'
import HelloDoctorImage from '@/assets/images/hellodoctorlogo.png'
import BoCongThuongLogo from '@/assets/svg/bo-cong-thuong.svg?react'

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          bgcolor: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? 'primary.main'
                : `${colorCode.grey200}`
            }`
        }}
      >
        <Container>
          <Box
            sx={{
              paddingY: 3,
              borderBottom: `1px solid ${colorCode.grey400}`
            }}
          >
            <Grid container spacing={2} columnSpacing={5}>
              <Grid
                item
                xs={12}
                sm={12}
                md={5}
                order={{ xs: 2, sm: 1, md: 0 }}
                sx={{
                  textAlign: {
                    sm: 'center',
                    md: 'initial'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: '600',
                    color: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? `${colorCode.cyan300}`
                          : `${colorCode.grey900}`
                      }`
                  }}
                >
                  Công ty Cổ phần Công nghệ BookingCare
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ marginTop: 0.5 }}
                  justifyContent={{
                    sm: 'center',
                    md: 'initial'
                  }}
                >
                  <Box>
                    <IoLocationOutline size={20} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.92rem',
                      color: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? `${colorCode.grey400}`
                            : `${colorCode.grey900}`
                        }`
                    }}
                  >
                    Lô B4/D21, Khu đô thị mới Cầu Giấy,
                    Phường Dịch Vọng Hậu, Quận Cầu Giấy,
                    Thành phố Hà Nội, Việt Nam
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent={{
                    sm: 'center',
                    md: 'initial'
                  }}
                  sx={{ marginTop: 0.5 }}
                >
                  <Box>
                    <GoCheckbox size={18} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.92rem',
                      color: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? `${colorCode.grey400}`
                            : `${colorCode.grey900}`
                        }`
                    }}
                  >
                    ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp
                    ngày 16/03/2015
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent={{
                    sm: 'center',
                    md: 'initial'
                  }}
                  sx={{ marginTop: 0.5 }}
                >
                  <MdPhone size={18} />
                  <Typography
                    sx={{
                      fontSize: '0.92rem',
                      color: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? `${colorCode.grey400}`
                            : `${colorCode.grey900}`
                        }`
                    }}
                  >
                    024-7301-2468 (7h - 18h)
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent={{
                    sm: 'center',
                    md: 'initial'
                  }}
                  sx={{ marginTop: 0.5 }}
                >
                  <MdOutlineEmail size={18} />
                  <Typography
                    sx={{
                      fontSize: '0.92rem',
                      color: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? `${colorCode.grey400}`
                            : `${colorCode.grey900}`
                        }`
                    }}
                  >
                    support@bookingcare.vn (7h - 18h)
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontWeight: '600',
                    marginTop: 1.5,
                    color: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? `${colorCode.cyan300}`
                          : `${colorCode.grey900}`
                      }`
                  }}
                >
                  Văn phòng tại TP Hồ Chí Minh
                </Typography>
                <Stack
                  direction="row"
                  alignItems="start"
                  spacing={1}
                  justifyContent={{
                    sm: 'center',
                    md: 'initial'
                  }}
                  sx={{ marginTop: 0.5 }}
                >
                  <IoLocationOutline size={18} />
                  <Typography
                    sx={{
                      fontSize: '0.92rem',
                      color: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? `${colorCode.grey400}`
                            : `${colorCode.grey900}`
                        }`
                    }}
                  >
                    Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent={{
                    sm: 'center',
                    md: 'initial'
                  }}
                  sx={{ marginTop: 2 }}
                >
                  <Link to="http://online.gov.vn/Home/WebDetails/68563">
                    <BoCongThuongLogo />
                  </Link>
                  <Link to="http://online.gov.vn/Home/AppDetails/1101">
                    <BoCongThuongLogo />
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={5} md={3}>
                <Box sx={{ width: '160px' }}>
                  <BookingCareLogo />
                </Box>
                <ul>
                  <li>
                    <Link to={'/'}>
                      <Typography
                        sx={{
                          color: (theme) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`
                        }}
                      >
                        Tuyển dụng
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <Typography
                        sx={{
                          color: (theme) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`,
                          marginTop: 1
                        }}
                      >
                        Chính sách bảo mật
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <Typography
                        sx={{
                          color: (theme) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`,
                          marginTop: 1
                        }}
                      >
                        Quy chế hoạt động
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <Typography
                        sx={{
                          color: (theme) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`,
                          marginTop: 1
                        }}
                      >
                        Liên hệ hợp tác
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <Typography
                        sx={{
                          color: (theme) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`,
                          marginTop: 1
                        }}
                      >
                        Điều khoản sử dụng
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <Typography
                        sx={{
                          color: (theme) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`,
                          marginTop: 1
                        }}
                      >
                        Câu hỏi thường gặp
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={7} md={4}>
                <Typography
                  sx={{
                    fontWeight: '600',
                    color: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? `${colorCode.cyan300}`
                          : `${colorCode.grey900}`
                      }`
                  }}
                >
                  Đối tác bảo trợ nội dung
                </Typography>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                  <Link to={'https://hellodoctors.vn/'}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Box
                        sx={{
                          width: '80px',
                          height: '50px',
                          position: 'relative'
                        }}
                      >
                        <Image
                          src={HelloDoctorImage}
                          alt=""
                          fill
                          objectFit="contain"
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: '600',
                            fontSize: '0.92rem',
                            color: (theme) =>
                              `${
                                theme.palette.mode ===
                                'dark'
                                  ? `${colorCode.grey400}`
                                  : `${colorCode.grey900}`
                              }`
                          }}
                        >
                          Hello Doctor
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.92rem',
                            color: (theme) =>
                              `${
                                theme.palette.mode ===
                                'dark'
                                  ? `${colorCode.grey400}`
                                  : `${colorCode.grey900}`
                              }`
                          }}
                        >
                          Bảo trợ chuyên mục nội dung "sức
                          khỏe tinh thần"
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                  <Link to={'https://bernard.vn/'}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Box
                        sx={{
                          width: '80px',
                          height: '50px',
                          position: 'relative'
                        }}
                      >
                        <Image
                          src={BernardImage}
                          alt=""
                          fill
                          objectFit="contain"
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: '600',
                            fontSize: '0.92rem',
                            color: (theme) =>
                              `${
                                theme.palette.mode ===
                                'dark'
                                  ? `${colorCode.grey400}`
                                  : `${colorCode.grey900}`
                              }`
                          }}
                        >
                          Hệ thống y khoa chuyên sâu quốc tế
                          Bernard
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.92rem',
                            color: (theme) =>
                              `${
                                theme.palette.mode ===
                                'dark'
                                  ? `${colorCode.grey400}`
                                  : `${colorCode.grey900}`
                              }`
                          }}
                        >
                          Bảo trợ chuyên mục nội dung "y
                          khoa chuyên sâu"
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                  <Link to={'https://www.doctorcheck.vn/'}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Box
                        sx={{
                          width: '80px',
                          height: '50px',
                          position: 'relative'
                        }}
                      >
                        <Image
                          src={DoctorCheck2Image}
                          alt=""
                          fill
                          objectFit="contain"
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: '600',
                            fontSize: '0.92rem',
                            color: (theme) =>
                              `${
                                theme.palette.mode ===
                                'dark'
                                  ? `${colorCode.grey400}`
                                  : `${colorCode.grey900}`
                              }`
                          }}
                        >
                          Doctor Check - Tầm Soát Bệnh Để
                          Sống Thọ Hơn
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.92rem',
                            color: (theme) =>
                              `${
                                theme.palette.mode ===
                                'dark'
                                  ? `${colorCode.grey400}`
                                  : `${colorCode.grey900}`
                              }`
                          }}
                        >
                          Bảo trợ chuyên mục nội dung "sức
                          khỏe tổng quát"
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Stack
            direction={{ sx: 'column', ms: 'row' }}
            spacing={1}
            sx={{ paddingY: 2 }}
          >
            <Typography>
              Tải ứng dụng BookingCare cho điện thoại hoặc
              máy tính bảng:
            </Typography>
            <Typography
              sx={{
                color: (theme) =>
                  `${
                    theme.palette.mode === 'dark'
                      ? `${colorCode.cyan300}`
                      : 'primary.main'
                  }`
              }}
            >
              Android - iPhone/iPad - Khác
            </Typography>
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? 'primary.dark'
                : `${colorCode.cyan300}`
            }`
        }}
      >
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ paddingY: 2 }}
          >
            <Typography sx={{ color: '#fff' }}>
              © 2024 BookingCare.
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Box>
                <Link
                  to={
                    'https://www.tiktok.com/@songkhoesuotdoi'
                  }
                >
                  <TiktokLogo />
                </Link>
              </Box>
              <Box>
                <Link
                  to={
                    'https://www.facebook.com/bookingcare'
                  }
                >
                  <FacebookLogo />
                </Link>
              </Box>
              <Box>
                <Link
                  to={
                    'https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ'
                  }
                >
                  <YoutubeLogo />
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
