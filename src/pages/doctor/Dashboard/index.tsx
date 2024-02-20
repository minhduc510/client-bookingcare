/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import useSWR from 'swr'
import 'react-markdown-editor-lite/lib/index.css'
import { ReactElement, useEffect, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Stack,
  Typography
} from '@mui/material'
import Loading from '@/components/Loading'
import { apiNoToken, linkApi } from '@/api'
import { PositionProps } from '@/interface'
import { useAppSelector } from '@/redux/hooks'
import formatCurrency from '@/utils/formatCurrency'
import { stateUserSlice } from '@/redux/slices/user'

const Dashboard = () => {
  const [StatusElement, setStatusElement] =
    useState<ReactElement>()
  const { id } = useAppSelector(stateUserSlice)

  const { data, isLoading } = useSWR(
    linkApi.getDetailDoctor(Number(id)),
    apiNoToken.getDetailDoctor(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (data) {
      switch (data.user.status) {
        case 0:
          setStatusElement(
            <Alert severity="warning">
              Tài khoản của bạn chưa được duyệt.
            </Alert>
          )
          break
        case 1:
          setStatusElement(
            <Alert severity="success">
              Tài khoản của bạn đã được duyệt.
            </Alert>
          )
          break
        default:
        // code block
      }
    }
  }, [isLoading, JSON.stringify(data?.user)])

  return (
    <>
      {isLoading ? (
        <Loading open={isLoading} />
      ) : (
        <>
          <Box>
            <Avatar
              alt="Đức"
              src={data?.user.avatar}
              sx={{
                marginTop: 1,
                width: {
                  xs: 140,
                  sm: 165
                },
                height: {
                  xs: 140,
                  sm: 165
                },
                mx: 'auto',
                boxShadow: (theme) =>
                  `${
                    theme.palette.mode === 'dark'
                      ? theme.boxShadowDark
                      : theme.boxShadowLight
                  }`
              }}
            />
            <Typography
              sx={{
                textAlign: 'center',
                marginTop: 1,
                fontWeight: 600
              }}
            >
              {data?.user.fullName}
            </Typography>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={{
                xs: 1,
                sm: 5
              }}
              marginTop={2}
            >
              <Box>
                <Typography>
                  Giới tính :{' '}
                  {data?.user.gender ? 'Nữ' : 'Nam'}
                </Typography>
                <Typography>
                  Email: {data?.user.email}
                </Typography>
                <Typography>
                  Số điện thoại: {data?.user.phone}
                </Typography>
                <Typography>
                  Địa chỉ: {data?.user.address}
                </Typography>
                <Typography>
                  Quyền: {data?.user.roles.join(', ')}
                </Typography>
                <Typography>
                  Chức danh:{' '}
                  {data?.user.positions.length > 0
                    ? data?.user.positions
                        .map(
                          (item: PositionProps) => item.name
                        )
                        .join(', ')
                    : 'Chưa cập nhật ...'}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Chuyên khoa :{' '}
                  {data?.user.doctor_info?.specialist
                    ? data?.user.doctor_info.specialist.name
                    : 'Chưa cập nhật...'}
                </Typography>
                <Typography>
                  Tên phòng khám :{' '}
                  {data?.user.doctor_info?.nameClinic
                    ? data?.user.doctor_info.nameClinic
                    : 'Chưa cập nhật...'}
                </Typography>
                <Typography>
                  Đại chỉ phòng khám:{' '}
                  {data?.user.doctor_info?.addressClinic
                    ? data?.user.doctor_info.addressClinic
                    : 'Chưa cập nhật...'}
                </Typography>
                <Typography>
                  Giá khám:
                  {data?.user.doctor_info?.priceFrom &&
                  data?.user.doctor_info?.priceTo ? (
                    formatCurrency(
                      data?.user.doctor_info?.priceFrom
                    ) +
                    '-' +
                    formatCurrency(
                      data?.user.doctor_info?.priceTo
                    )
                  ) : (
                    <Typography
                      display={'inline-block'}
                      marginLeft={1}
                    >
                      Chưa cập nhật...
                    </Typography>
                  )}
                </Typography>
                <Box>{StatusElement}</Box>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ marginY: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>
              Miêu tả:
            </Typography>
            {data?.user?.doctor_info?.html ? (
              <Box>
                {data?.user?.doctor_info.description}
              </Box>
            ) : (
              <Typography>Chưa cập nhật...</Typography>
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>
              Thông tin thêm:
            </Typography>
            {data?.user?.doctor_info?.html ? (
              <Box
                dangerouslySetInnerHTML={{
                  __html: data?.user?.doctor_info.html
                }}
              ></Box>
            ) : (
              <Typography>Chưa cập nhật...</Typography>
            )}
          </Box>
        </>
      )}
    </>
  )
}

export default Dashboard
