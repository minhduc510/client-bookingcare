/* eslint-disable indent */
import {
  Box,
  Chip,
  Stack,
  Avatar,
  Button,
  Container,
  Checkbox,
  Typography
} from '@mui/material'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'

import swal from '@/utils/swal'
import colorCode from '@/configs/color'
import Loading from '@/components/Loading'
import { apiHasToken, linkApi } from '@/api'
import { BookingClientProps } from '@/interface'
import formatCurrency from '@/utils/formatCurrency'
import { stateLoginSlice } from '@/redux/slices/auth'
import { decreaseTotalBooking } from '@/redux/slices/totalBooking'
import {
  useAppSelector,
  useAppDispatch
} from '@/redux/hooks'

const Booking = () => {
  const dispatch = useAppDispatch()
  const { login } = useAppSelector(stateLoginSlice)
  const [checkAll, setCheckAll] = useState(false)
  const [listChecked, setListChecked] = useState<number[]>(
    []
  )

  const handleCheckAll = () => {
    const status = !checkAll
    if (status) {
      setListChecked(
        data.data.map((item: BookingClientProps) => item.id)
      )
    } else {
      setListChecked([])
    }
    setCheckAll(status)
  }

  const handleCheckBox = (id: number) => {
    const cloneArrChecked = [...listChecked]
    if (cloneArrChecked.includes(id)) {
      cloneArrChecked.splice(
        cloneArrChecked.findIndex((item) => item === id),
        1
      )
    } else {
      cloneArrChecked.push(id)
    }
    setCheckAll(
      cloneArrChecked.length === data.data.length
        ? true
        : false
    )
    setListChecked(cloneArrChecked)
  }

  const handleDeleteBooking = () => {
    swal
      .confirm('Bạn có chắc chắn muốn xóa?')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error, message } =
            await apiHasToken.removeClientBooking(
              listChecked
            )
          if (!error) {
            swal
              .success('Xóa lịch hẹn thành công')
              .then(() => {
                dispatch(
                  decreaseTotalBooking(listChecked.length)
                )
                setListChecked([])
                setCheckAll(false)
                mutate()
              })
          } else {
            swal.error(message)
          }
        }
      })
  }

  const { data, isLoading, mutate } = useSWR(
    login && linkApi.getClientBooking,
    apiHasToken.getClientBooking(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    mutate()
  }, [])

  const handleTagStatus = (type: -1 | 0 | 1) => {
    switch (type) {
      case -1:
        return <Chip label="Đã từ chối" color="error" />
      case 0:
        return (
          <Chip
            label="Đang đợi chấp nhận"
            color="warning"
          />
        )
      case 1:
        return <Chip label="Đã chấp nhận" color="success" />
    }
  }

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography
        sx={{ fontSize: '1.5rem', fontWeight: 600 }}
      >
        Lịch hẹn đã đặt
      </Typography>
      {login ? (
        isLoading ? (
          <Loading open={isLoading} />
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{ marginTop: 3 }}
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell width="1%">
                      <Checkbox
                        checked={checkAll}
                        onChange={handleCheckAll}
                      />
                    </TableCell>
                    <TableCell width="18%">
                      Bác sĩ
                    </TableCell>
                    <TableCell width="20%">
                      Tên phòng khám
                    </TableCell>
                    <TableCell width="25%">
                      Địa chỉ phòng khám
                    </TableCell>
                    <TableCell width="10%">
                      Lý do khám
                    </TableCell>
                    <TableCell width="10%">
                      Giá khám
                    </TableCell>
                    <TableCell width="15%">
                      Thời gian
                    </TableCell>
                    <TableCell width="1%" align="right">
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.data.length ? (
                    data.data.map(
                      (item: BookingClientProps) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            '&:last-child td, &:last-child th':
                              {
                                border: 0
                              }
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                          >
                            <Checkbox
                              checked={listChecked.includes(
                                item.id
                              )}
                              onChange={() =>
                                handleCheckBox(item.id)
                              }
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                          >
                            <Stack
                              direction="column"
                              alignItems="flex-start"
                              spacing={1}
                            >
                              <Box
                                sx={{
                                  border: `1px solid ${colorCode.grey300}`,
                                  borderRadius: '50%'
                                }}
                              >
                                <Avatar
                                  alt={item.doctor.fullName}
                                  src={item.doctor.avatar}
                                />
                              </Box>
                              <Typography>
                                {item.doctor.positions.join(
                                  ','
                                )}{' '}
                                {item.doctor.fullName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            {item.doctor.nameClinic}
                          </TableCell>
                          <TableCell>
                            {item.doctor.addressClinic}
                          </TableCell>
                          <TableCell>
                            {item.reason}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(
                              item.doctor.priceFrom
                            )}{' '}
                            -{' '}
                            {formatCurrency(
                              item.doctor.priceTo
                            )}
                          </TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell align="right">
                            {handleTagStatus(item.status)}
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography
                          fontStyle="italic"
                          fontWeight="600"
                        >
                          Chưa có lịch nào!
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack alignItems="flex-end" marginTop={3}>
              <Button
                disabled={!listChecked.length}
                variant="contained"
                sx={{
                  color: '#fff'
                }}
                onClick={handleDeleteBooking}
              >
                Xóa lịch khám
              </Button>
            </Stack>
          </>
        )
      ) : (
        <Typography fontWeight={600} fontStyle="italic">
          Vui lòng đăng nhập để xem lịch đã đặt!
        </Typography>
      )}
    </Container>
  )
}

export default Booking
