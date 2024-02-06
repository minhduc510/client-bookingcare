import { useState } from 'react'
import { KeyedMutator } from 'swr'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import { Stack, Typography } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'

import {
  ScheduleDayProps,
  ScheduleHourProps
} from '@/interface'
import swal from '@/utils/swal'
import { apiHasToken } from '@/api'
import { RiDeleteBin7Line } from '@/icons'
import Loading from '@/components/Loading'

interface IProps {
  data: ScheduleDayProps[]
  mutate: KeyedMutator<unknown>
}

type HourType = 'AM' | 'PM'

export default function TableSchedule({
  data,
  mutate
}: IProps) {
  const [loading, setLoading] = useState(false)

  const handleTime = (
    listHour: ScheduleHourProps[],
    type: HourType = 'AM'
  ) => {
    if (type === 'AM') {
      const dataRes: ScheduleHourProps[] = []
      listHour.forEach((item) => {
        if (
          Number(item.content.split('-')[0].split(':')[0]) <
          12
        ) {
          return dataRes.push(item)
        }
      })
      return dataRes
    }
    if (type === 'PM') {
      const dataRes: ScheduleHourProps[] = []
      listHour.forEach((item) => {
        if (
          Number(item.content.split('-')[0].split(':')[0]) >
          12
        ) {
          return dataRes.push(item)
        }
      })
      return dataRes
    }
  }

  const handleRemoveHour = (id: number) => {
    swal
      .confirm('Bạn có chắc chắn muốn xóa')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          setLoading(true)
          const { error, message } =
            await apiHasToken.removeHour(id)
          if (!error) {
            swal.success(message).then(() => {
              mutate()
            })
          } else {
            swal.error(message)
          }
        }
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <Loading open={loading} />}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 358 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Ngày</TableCell>
              <TableCell align="center">Sáng</TableCell>
              <TableCell align="center">Chiều</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length ? (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.content}
                  </TableCell>
                  <TableCell align="center">
                    {handleTime(item.hour)?.length ? (
                      <Stack
                        direction="column"
                        alignItems="center"
                        flexWrap="wrap"
                        spacing={1}
                      >
                        {handleTime(item.hour)?.map(
                          (itemHour) => (
                            <Stack
                              direction="row"
                              alignItems="center"
                              key={itemHour?.id}
                              sx={{
                                bgcolor: 'primary.main',
                                width: '150px',
                                padding: 0.5,
                                borderRadius: 1,
                                color: '#fff'
                              }}
                            >
                              <Typography sx={{ flex: 1 }}>
                                {itemHour?.content}
                              </Typography>
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                  bgcolor: 'primary.dark',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  cursor: 'pointer'
                                }}
                                onClick={() =>
                                  handleRemoveHour(
                                    itemHour.id
                                  )
                                }
                              >
                                <RiDeleteBin7Line />
                              </Stack>
                            </Stack>
                          )
                        )}
                      </Stack>
                    ) : (
                      <Typography>
                        Không có lịch nào!
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {handleTime(item.hour, 'PM')?.length ? (
                      <Stack
                        direction="column"
                        alignItems="center"
                        flexWrap="wrap"
                        spacing={1}
                      >
                        {handleTime(item.hour, 'PM')?.map(
                          (itemHour) => (
                            <Stack
                              direction="row"
                              alignItems="center"
                              key={itemHour?.id}
                              sx={{
                                bgcolor: 'primary.main',
                                width: '150px',
                                padding: 0.5,
                                borderRadius: 1,
                                color: '#fff'
                              }}
                            >
                              <Typography sx={{ flex: 1 }}>
                                {itemHour?.content}
                              </Typography>
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                  bgcolor: 'primary.dark',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  cursor: 'pointer'
                                }}
                                onClick={() =>
                                  handleRemoveHour(
                                    itemHour.id
                                  )
                                }
                              >
                                <RiDeleteBin7Line />
                              </Stack>
                            </Stack>
                          )
                        )}
                      </Stack>
                    ) : (
                      <Typography>
                        Không có lịch nào!
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Không có dữ liệu!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
