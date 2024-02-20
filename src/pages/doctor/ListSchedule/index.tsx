/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import {
  Box,
  Chip,
  Stack,
  Button,
  Avatar,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  Typography,
  FormControl
} from '@mui/material'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'

import swal from '@/utils/swal'
import colorCode from '@/configs/color'
import Loading from '@/components/Loading'
import { apiHasToken, linkApi } from '@/api'
import { BookingPatientProps } from '@/interface'

const ListSchedule = () => {
  const [checkAll, setCheckAll] = useState(false)
  const [status, setStatus] = useState<string>('tatca')
  const [dataBooking, setDataBooking] = useState<
    BookingPatientProps[]
  >([])
  const [listChecked, setListChecked] = useState<number[]>(
    []
  )

  const handleCheckAll = () => {
    const status = !checkAll
    if (status) {
      setListChecked(
        data.data.map(
          (item: BookingPatientProps) => item.id
        )
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

  const handleAcceptBooking = () => {
    swal
      .confirm(
        `Bạn có chắc chắn muốn xác nhận ${
          listChecked.length > 1 ? 'những' : ''
        } lịch khám này?`
      )
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error, message } =
            await apiHasToken.acceptBooking(listChecked)
          if (!error) {
            swal
              .success('Xác nhận lịch hẹn thành công')
              .then(() => {
                setListChecked([])
                setCheckAll(false)
                setStatus('tatca')
              })
          } else {
            swal.error(message)
          }
        }
      })
  }

  const handleDenyBooking = () => {
    swal
      .confirm(
        `Bạn có chắc chắn muốn từ chối ${
          listChecked.length > 1 ? 'những' : ''
        } lịch khám này?`
      )
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error, message } =
            await apiHasToken.denyBooking(listChecked)
          if (!error) {
            swal
              .success('Từ chối lịch hẹn thành công')
              .then(() => {
                setListChecked([])
                setCheckAll(false)
                setStatus('tatca')
              })
          } else {
            swal.error(message)
          }
        }
      })
  }

  const { data, isLoading, mutate } = useSWR(
    status !== 'tatca'
      ? linkApi.getDoctorBooking + `?status=${status}`
      : linkApi.getDoctorBooking,
    apiHasToken.getDoctorBooking(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    mutate()
    if (data) {
      setDataBooking(data.data)
    }
  }, [
    isLoading,
    JSON.stringify(data?.data),
    status,
    JSON.stringify(listChecked)
  ])

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          fontSize: '1.2rem'
        }}
      >
        Danh sách lịch khám bệnh
      </Typography>
      <Stack alignItems="flex-end" marginTop={2}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Trạng thái
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={({ target }) =>
                setStatus(target.value)
              }
              sx={{
                '&.MuiOutlinedInput-root': {
                  letterSpacing: '0.8em'
                }
              }}
            >
              <MenuItem value={'tatca'}>
                <Typography>Tất cả</Typography>
              </MenuItem>
              <MenuItem value={'1'}>
                <Typography>Đã chấp nhận</Typography>
              </MenuItem>
              <MenuItem value={'0'}>
                <Typography>Đang đợi</Typography>
              </MenuItem>
              <MenuItem value={'-1'}>
                <Typography>Từ chối </Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      {isLoading ? (
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
                  <TableCell>Tên bệnh nhân</TableCell>
                  <TableCell>Giới tính</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Thời gian đặt</TableCell>
                  <TableCell>Lý do khám</TableCell>
                  <TableCell align="right">
                    Trạng thái
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataBooking?.length ? (
                  dataBooking.map(
                    (item: BookingPatientProps) => (
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
                            direction="row"
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
                                alt={item.patient.fullName}
                                src={item.patient.avatar}
                              />
                            </Box>
                            <Typography>
                              {item.patient.fullName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {item.patient.gender
                            ? 'Nam'
                            : 'Nữ'}
                        </TableCell>
                        <TableCell>
                          {item.patient.phone}
                        </TableCell>
                        <TableCell>
                          {item.patient.email}
                        </TableCell>
                        <TableCell>
                          {item.patient.address}
                        </TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell align="right">
                          {handleTagStatus(item.status)}
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            marginTop={3}
            spacing={1}
          >
            <Button
              variant="contained"
              disabled={!listChecked.length}
              color="error"
              sx={{ color: '#fff' }}
              onClick={handleDenyBooking}
            >
              Từ chối khám
            </Button>
            <Button
              variant="contained"
              disabled={!listChecked.length}
              color="success"
              sx={{ color: '#fff' }}
              onClick={handleAcceptBooking}
            >
              Xác nhận khám
            </Button>
          </Stack>
        </>
      )}
    </>
  )
}

export default ListSchedule
