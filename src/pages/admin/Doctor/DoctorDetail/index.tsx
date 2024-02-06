/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
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
import formatCurrency from '@/utils/formatCurrency'

const DoctorDetail = () => {
  const { id } = useParams()
  const [StatusElement, setStatusElement] =
    useState<ReactElement>()

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
        case -1:
          setStatusElement(
            <Alert severity="error">
              Người dùng này đã bị khóa.
            </Alert>
          )
          break
        case 0:
          setStatusElement(
            <Alert severity="warning">
              Người dùng này chưa được duyệt.
            </Alert>
          )
          break
        case 1:
          setStatusElement(
            <Alert severity="success">
              Người dùng này đã được duyệt.
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
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                xs: '1.1rem',
                sm: '1.3rem'
              }
            }}
          >
            Thông tin người dùng #{data?.user.id}
          </Typography>
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
                  {data?.user.positions
                    .map((item: PositionProps) => item.name)
                    .join(', ')}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Tên phòng khám :{' '}
                  {data?.user.doctor_info.nameClinic}
                </Typography>
                <Typography>
                  Đại chỉ phòng khám:
                  {data?.user.doctor_info.addressClinic}
                </Typography>
                <Typography>
                  Giá khám:{' '}
                  {formatCurrency(
                    data?.user.doctor_info.priceFrom
                  )}{' '}
                  -{' '}
                  {formatCurrency(
                    data?.user.doctor_info.priceTo
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
            <Box>{data?.user?.doctor_info.description}</Box>
          </Box>
          <Box sx={{ marginY: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>
              Thông tin thêm:
            </Typography>
            <Box
              dangerouslySetInnerHTML={{
                __html: data?.user?.doctor_info.html
              }}
            ></Box>
          </Box>
        </>
      )}
    </>
  )
}

export default DoctorDetail
