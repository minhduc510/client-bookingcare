/* eslint-disable indent */
import { apiHasToken } from '@/api'
import Loading from '@/components/Loading'
import colorCode from '@/configs/color'
import { FiX } from '@/icons'
import {
  PositionProps,
  ScheduleDayBookProps,
  UserProps
} from '@/interface'
import { useAppSelector } from '@/redux/hooks'
import { stateUserSlice } from '@/redux/slices/user'
import path from '@/routes/path'
import swal from '@/utils/swal'
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputBase,
  InputLabel,
  Modal,
  Stack,
  Typography,
  styled
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface IProps {
  time: ScheduleDayBookProps | null
  open: boolean
  doctor: UserProps
  price: string
  closeModel: () => void
}

type Inputs = {
  reason: string
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '100%',
    sm: 600
  },
  height: {
    xs: '100%',
    sm: 600
  },
  bgcolor: 'background.paper',
  border: {
    xs: 'none',
    sm: '2px solid #000'
  },
  boxShadow: 24,
  p: 4
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'light'
        ? '#F3F6F9'
        : '#1A2027',
    border: '1px solid',
    borderColor:
      theme.palette.mode === 'light'
        ? '#E0E3E7'
        : '#2D3843',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ])
  }
}))

const ModelBookSchedule = ({
  time,
  open,
  price,
  doctor,
  closeModel
}: IProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { fullName, email, address } =
    useAppSelector(stateUserSlice)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      reason: ''
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async ({
    reason
  }) => {
    setLoading(true)
    if (doctor && time) {
      const { error, message } =
        await apiHasToken.createBooking({
          reason,
          doctor_id: Number(doctor.id),
          medicalexaminationday_id: Number(time.day_id),
          medicalexaminationhour_id: Number(time.hour_id)
        })
      if (!error) {
        swal.success('Đặt lịch thành công').then(() => {
          navigate(`/${path.client.booking}`)
        })
      } else {
        swal.error(message)
      }
    }
    setLoading(false)
  }

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={closeModel}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {loading && <Loading open={loading} />}
          <Stack
            onClick={closeModel}
            alignItems={'flex-end'}
          >
            <FiX size={25} />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Box
              sx={{
                border: `1px solid ${colorCode.grey300}`,
                borderRadius: '50%'
              }}
            >
              <Avatar
                alt={doctor?.fullName}
                src={doctor?.avatar}
                sx={{ width: '65px', height: '65px' }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                {doctor?.positions &&
                doctor?.positions.length
                  ? doctor.positions
                      ?.map(
                        (item: PositionProps) => item.name
                      )
                      .join(', ')
                  : ''}{' '}
                {doctor?.fullName}
              </Typography>
              <Typography>
                {doctor?.doctor_info?.description}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ marginTop: 1 }}>
            <Typography fontWeight={600}>
              {time?.content}
            </Typography>
            <Box>
              Giá khám:{' '}
              <Typography display="inline" fontWeight={600}>
                {price}
              </Typography>
            </Box>
          </Box>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              variant="standard"
              sx={{ width: '100%', marginTop: 1 }}
            >
              <InputLabel shrink htmlFor="fullName">
                Họ tên
              </InputLabel>
              <BootstrapInput
                id="fullName"
                readOnly
                value={fullName}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: '100%', marginTop: 1 }}
            >
              <InputLabel shrink htmlFor="email">
                Email
              </InputLabel>
              <BootstrapInput
                id="email"
                readOnly
                value={email}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: '100%', marginTop: 1 }}
            >
              <InputLabel shrink htmlFor="address">
                Địa chỉ
              </InputLabel>
              <BootstrapInput
                id="address"
                readOnly
                defaultValue={address}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: '100%', marginTop: 1 }}
            >
              <InputLabel shrink htmlFor="reason">
                Lý do khám
              </InputLabel>
              <BootstrapInput
                id="reason"
                {...register('reason', {
                  required: 'Trường này không được bỏ trống'
                })}
                sx={{
                  '& .MuiInputBase-input': {
                    bgcolor: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? colorCode.grey500
                          : '#fff'
                      }`,
                    color: 'black',
                    borderColor:
                      errors.reason?.message && 'red'
                  }
                }}
              />
              {errors.reason?.message && (
                <Typography color={'red'} fontWeight={600}>
                  {errors.reason?.message}
                </Typography>
              )}
            </FormControl>
            <Stack alignItems="flex-end" marginTop={3}>
              <Button
                type="submit"
                variant="contained"
                sx={{ color: '#fff' }}
              >
                Đặt lịch
              </Button>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModelBookSchedule
