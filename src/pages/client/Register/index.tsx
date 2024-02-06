import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ErrorOption,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import {
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Alert
} from '@mui/material'

import swal from '@/utils/swal'
import path from '@/routes/path'
import { apiNoToken } from '@/api'
import { Gender } from '@/interface'
import colorCode from '@/configs/color'
import Loading from '@/components/Loading'
import InputText from '@/components/InputText'
import {
  addressValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneValidation
} from '@/validation'

type Inputs = {
  email: string
  password: string
  firstName: string
  lastName: string
  address: string
  phone: string
  passwordConfirm: string
}

const RegisterClient = () => {
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState(0)
  const [errorMsg, setErrorMsg] = useState(false)
  const navigate = useNavigate()

  const handleChangeGender = (
    event: SelectChangeEvent<typeof gender>
  ) => {
    const {
      target: { value }
    } = event
    setGender(value as Gender)
  }

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      address: '',
      lastName: '',
      firstName: '',
      passwordConfirm: ''
    }
  })
  const onSubmit: SubmitHandler<Inputs> = async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    passwordConfirm,
    ...data
  }) => {
    setLoading(true)
    const { error, message } = await apiNoToken.register({
      ...data,
      gender,
      _type: 'Client'
    })
    if (error) {
      setErrorMsg(message)
    } else {
      swal.success('Đăng kí thành công').then(() => {
        navigate(`/${path.client.login}`)
      })
    }
    setLoading(false)
  }
  return (
    <>
      {loading && <Loading open={loading} />}
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '500px'
          },
          margin: 'auto',
          p: 2,
          marginY: {
            xs: 0,
            sm: 10
          },
          borderRadius: {
            xs: 0,
            sm: 1
          },
          boxShadow: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? theme.boxShadowDark
                : theme.boxShadowLight
            }`
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h2"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: (theme: {
                palette: { mode: string }
              }) =>
                `${
                  theme.palette.mode === 'dark'
                    ? `${colorCode.cyan300}`
                    : 'primary.main'
                }`
            }}
          >
            Đăng ký
          </Typography>
          {errorMsg && (
            <Alert severity="error" sx={{ marginTop: 1 }}>
              {errorMsg}
            </Alert>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ marginTop: 3 }}
          >
            <InputText
              label="Họ"
              error={errors.firstName?.message}
              {...register('firstName', nameValidation)}
              onChange={(e) => {
                setValue('firstName', e.target.value)
                setError('firstName', '' as ErrorOption)
              }}
            />
            <InputText
              label="Tên"
              error={errors.lastName?.message}
              {...register('lastName', nameValidation)}
              onChange={(e) => {
                setValue('lastName', e.target.value)
                setError('lastName', '' as ErrorOption)
              }}
            />
          </Stack>

          <FormControl
            fullWidth
            size="small"
            sx={{ marginTop: 3 }}
          >
            <InputLabel id="demo-simple-select-label">
              Giới tính
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={handleChangeGender}
            >
              <MenuItem value={0}>Nam</MenuItem>
              <MenuItem value={1}>Nữ</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ marginTop: 3 }}>
            <InputText
              label="Email"
              error={errors.email?.message}
              {...register('email', emailValidation)}
              onChange={(e) => {
                setValue('email', e.target.value)
                setError('email', '' as ErrorOption)
              }}
            />
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <InputText
              label="Số điện thoại"
              error={errors.phone?.message}
              {...register('phone', phoneValidation)}
              onChange={(e) => {
                setValue('phone', e.target.value)
                setError('phone', '' as ErrorOption)
              }}
            />
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <InputText
              label="Địa chỉ"
              error={errors.address?.message}
              {...register('address', addressValidation)}
              onChange={(e) => {
                setValue('address', e.target.value)
                setError('address', '' as ErrorOption)
              }}
            />
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <InputText
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register('password', passwordValidation)}
              onChange={(e) => {
                setValue('password', e.target.value)
                setError('password', '' as ErrorOption)
              }}
            />
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <InputText
              label="Xác nhận mật khẩu"
              type="password"
              error={errors.passwordConfirm?.message}
              {...register('passwordConfirm', {
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'Mật khẩu không trùng khớp'
                  }
                }
              })}
              onChange={(e) => {
                setValue('passwordConfirm', e.target.value)
                setError(
                  'passwordConfirm',
                  '' as ErrorOption
                )
              }}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ marginTop: 3, color: 'white' }}
            type="submit"
          >
            Tiếp tục
          </Button>
        </form>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Link to={`/${path.client.forgotPassword}`}>
            <Typography
              sx={{
                ':hover': {
                  color: 'primary.main',
                  cursor: 'pointer'
                }
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Link>
          <Link to={`/${path.client.login}`}>
            <Typography
              sx={{
                ':hover': {
                  color: 'primary.main',
                  cursor: 'pointer'
                }
              }}
            >
              Bạn đã có tài khoản?
            </Typography>
          </Link>
        </Stack>
      </Box>
    </>
  )
}

export default RegisterClient
