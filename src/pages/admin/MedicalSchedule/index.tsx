/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import useSWR from 'swr'
import moment, { Moment } from 'moment'
import { useEffect, useState } from 'react'
import Select, {
  ActionMeta,
  SingleValue
} from 'react-select'
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
import {
  ScheduleBodyProps,
  ScheduleDayProps,
  UserProps
} from '@/interface'

type UserOptions = {
  value: string
  label: string
}

type SelectReact = (
  newValue: SingleValue<UserOptions>,
  actionMeta: ActionMeta<UserOptions>
) => void

const MedicalSchedule = () => {
  const [selectedOption, setSelectedOption] =
    useState<UserOptions>({
      value: '',
      label: ''
    })
  const [loading, setLoading] = useState(false)
  const [listSchedule, setListSchedule] = useState<
    ScheduleDayProps[]
  >([])
  const [userOptions, setUserOptions] =
    useState<UserOptions[]>()

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

  const { data, isLoading } = useSWR(
    [linkApi.getAllUserDoctors, []],
    apiHasToken.getAllUser(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  const {
    data: dataSchedule,
    isLoading: isLoadingSchedule,
    mutate
  } = useSWR(
    selectedOption.value
      ? linkApi.getSchedule(Number(selectedOption.value))
      : null,
    apiHasToken.getScheduleByUserId(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (dataSchedule && !dataSchedule.error) {
      setListSchedule(dataSchedule.data)
    }
  }, [
    isLoadingSchedule,
    JSON.stringify(dataSchedule?.data)
  ])

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
        await apiHasToken.createSchedule(
          Number(selectedOption.value),
          data
        )
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

  useEffect(() => {
    if (data) {
      setUserOptions(
        data.data?.users.map((item: UserProps) => ({
          value: item.id,
          label: item.fullName
        }))
      )
    }
  }, [isLoading])

  return (
    <>
      {loading && <Loading open={loading} />}
      <Typography
        variant="h6"
        sx={{
          fontSize: '1.3rem'
        }}
      >
        Quản lý kế hoạch khám bệnh của bác sĩ
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          marginY: {
            xs: 0,
            md: 3
          }
        }}
      >
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Box
              sx={{
                '.css-b62m3t-container': {
                  width: {
                    xs: '100%',
                    sm: '400px'
                  },
                  '.css-13cymwt-control': {
                    bgcolor: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? 'primary.main'
                          : '#fff'
                      }`
                  },
                  '.css-t3ipsp-control': {
                    bgcolor: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? 'primary.main'
                          : '#fff'
                      }`
                  },
                  '.css-1nmdiq5-menu': {
                    zIndex: 100,
                    bgcolor: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? 'primary.main'
                          : '#fff'
                      }`
                  }
                }
              }}
            >
              <Typography variant="h6">
                Chọn bác sĩ:
              </Typography>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption as SelectReact}
                options={userOptions}
              />
            </Box>
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
              selectedOption.value &&
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

export default MedicalSchedule
