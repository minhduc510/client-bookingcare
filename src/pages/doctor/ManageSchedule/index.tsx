/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import useSWR from 'swr'
import moment, { Moment } from 'moment'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  TimePicker,
  renderTimeViewClock
} from '@mui/x-date-pickers'

import swal from '@/utils/swal'
import Loading from '@/components/Loading'
import handleTime from '@/utils/handleTime'
import { apiHasToken, linkApi } from '@/api'
import CollapsibleTable from './TableSchedule'
import { useAppSelector } from '@/redux/hooks'
import { stateUserSlice } from '@/redux/slices/user'
import {
  ScheduleBodyProps,
  ScheduleDayProps
} from '@/interface'

const ManageSchedule = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useAppSelector(stateUserSlice)
  const [listSchedule, setListSchedule] = useState<
    ScheduleDayProps[]
  >([])

  const [date, setDate] = useState<Moment | null>(
    moment(new Date())
  )
  const [hourFrom, setHourFrom] = useState<Moment | null>(
    null
  )
  const [hourTo, setHourTo] = useState<Moment | null>(null)
  const [disablePastHour, setDisablePastHour] =
    useState(true)
  const [errMinHour, setErrMinHour] = useState('')
  const [errMaxHour, setErrMaxHour] = useState('')
  const [
    activeListHourOutstanding,
    setActiveListHourOutstanding
  ] = useState<number[]>([])

  const onChangeDate = (newValue: Moment | null) => {
    if (
      handleTime.format(
        newValue as Moment,
        'DD/MM/YYYY'
      ) === handleTime.format(new Date(), 'DD/MM/YYYY')
    ) {
      setDisablePastHour(true)
    } else {
      setDisablePastHour(false)
    }
    setDate(newValue)
  }

  const onChangeMinHour = (newValue: Moment | null) => {
    setHourFrom(newValue)
  }

  const onChangeMaxHour = (newValue: Moment | null) => {
    setHourTo(newValue)
  }

  const { data, isLoading, mutate } = useSWR(
    id ? linkApi.getSchedule(Number(id)) : null,
    apiHasToken.getScheduleByUserId(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (data && !data.error) {
      setListSchedule(data.data)
    }
  }, [isLoading, JSON.stringify(data?.data)])

  const handleSave = async () => {
    if (date) {
      setLoading(true)
      const data: ScheduleBodyProps = {
        day: handleTime.getTimestampEndDay(date),
        hours: null
      }
      if (hourFrom && hourTo) {
        const dateStringHourFrom = handleTime.getTimestamp(
          `${handleTime.format(
            date,
            'DD/MM/YYYY'
          )} ${handleTime.format(hourFrom, 'HH:mm')}`,
          'DD/MM/YYYY HH:mm'
        )
        const dateStringHourTo = handleTime.getTimestamp(
          `${handleTime.format(
            date,
            'DD/MM/YYYY'
          )} ${handleTime.format(hourTo, 'HH:mm')}`,
          'DD/MM/YYYY HH:mm'
        )
        data.hours = {
          from: dateStringHourFrom,
          to: dateStringHourTo
        }
      }
      const { error, message } =
        await apiHasToken.createSchedule(Number(id), data)
      if (!error) {
        swal.success('Lưu thành công').then(() => {
          setDate(null)
          setHourFrom(null)
          setHourTo(null)
          setActiveListHourOutstanding([])
          mutate()
        })
      } else {
        swal.error(message)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    if (date) {
      if (hourFrom) {
        if (
          handleTime.getTimestamp(
            `${handleTime.format(
              date,
              'DD/MM/YYYY'
            )} ${handleTime.format(hourFrom, 'HH:mm')}`,
            'DD/MM/YYYY HH:mm'
          ) < handleTime.getTimestamp(new Date())
        ) {
          setErrMinHour(
            'Không được chọn thời gian trong quá khứ'
          )
        } else {
          setErrMinHour('')
        }
        setHourFrom(hourFrom)
      }
      if (hourTo) {
        if (
          handleTime.getTimestamp(
            `${handleTime.format(
              date,
              'DD/MM/YYYY'
            )} ${handleTime.format(hourTo, 'HH:mm')}`,
            'DD/MM/YYYY HH:mm'
          ) < handleTime.getTimestamp(new Date())
        ) {
          setErrMaxHour(
            'Không được chọn thời gian trong quá khứ'
          )
        } else {
          setErrMaxHour('')
        }
        setHourTo(hourTo)
      }
      if (hourFrom && hourTo) {
        if (
          handleTime.getTimestamp(hourFrom) >
          handleTime.getTimestamp(hourTo)
        ) {
          setErrMaxHour('Thời gian đến không hợp lệ')
        } else {
          setErrMaxHour('')
        }
      }
    }
  }, [hourTo, hourFrom, date])

  return (
    <>
      {loading && <Loading open={loading} />}
      <Typography
        variant="h6"
        sx={{
          fontSize: '1.3rem'
        }}
      >
        Quản lý kế hoạch khám bệnh
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          marginY: 0
        }}
      >
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6">
                Chọn ngày/tháng/năm:
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
              >
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    minDate={moment(new Date())}
                    format="DD/MM/YYYY"
                    label="Chọn ngày/tháng/năm"
                    value={date}
                    onChange={onChangeDate}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <Typography variant="h6">
                Chọn khung giờ:
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
              >
                <DemoContainer
                  components={['TimePicker', 'TimePicker']}
                >
                  <TimePicker
                    label="Từ"
                    value={hourFrom}
                    onChange={onChangeMinHour}
                    disablePast={disablePastHour}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock
                    }}
                    slotProps={{
                      textField: {
                        error: !!errMinHour,
                        helperText: errMinHour
                          ? errMinHour
                          : ''
                      }
                    }}
                  />
                  <TimePicker
                    label="Đến"
                    value={hourTo}
                    disablePast={disablePastHour}
                    onChange={onChangeMaxHour}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock
                    }}
                    slotProps={{
                      textField: {
                        error: !!errMaxHour,
                        helperText: errMaxHour
                          ? errMaxHour
                          : ''
                      }
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <CollapsibleTable
            data={listSchedule}
            mutate={mutate}
          />
        </Grid>
      </Grid>
      <Stack alignItems="center">
        <Button
          onClick={handleSave}
          disabled={
            !(
              date &&
              ((hourFrom && hourTo) ||
                activeListHourOutstanding.length)
            )
          }
          variant="contained"
          sx={{
            marginY: 2,
            marginX: 'auto',
            width: {
              xs: '100%',
              md: '150px'
            }
          }}
        >
          Lưu
        </Button>
      </Stack>
    </>
  )
}

export default ManageSchedule
