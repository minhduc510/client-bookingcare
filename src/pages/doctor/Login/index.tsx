import { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import {
  Link,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Alert,
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material'

import path from '@/routes/path'
import Loading from '@/components/Loading'
import Options from '@/components/Options'
import InputText from '@/components/InputText'
import ReactLogo from '@/assets/svg/logo.svg?react'
import { apiNoToken } from '@/api'
import { loginAdded } from '@/redux/slices/auth'
import {
  emailValidation,
  passwordValidation
} from '@/validation'
import colorCode from '@/configs/color'

type Inputs = {
  email: string
  password: string
}

const LoginDoctor = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const [errorMsg, setErrorMsg] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const {
      error,
      message,
      data: dataRes
    } = await apiNoToken.login({ ...data, _type: 'Doctor' })
    if (error) {
      setErrorMsg(message)
    } else {
      dispatch(loginAdded(dataRes.accessToken))
      setErrorMsg('')
      const pathName =
        searchParams.get('continue_url') ??
        `/${path.doctor.listSchedule}`
      navigate(pathName)
    }
    setLoading(false)
  }

  return (
    <>
      <Container sx={{ height: '100vh' }}>
        {loading && <Loading open={loading} />}
        <Stack
          justifyContent="center"
          alignItems="center"
          gap={3}
          sx={{ height: '100%' }}
        >
          <Box
            sx={{
              width: {
                xs: '250px',
                sm: '300px'
              }
            }}
          >
            <ReactLogo />
          </Box>
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '500px'
              },
              p: 2,
              borderRadius: 1,
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
                Đăng nhập (Bác sĩ)
              </Typography>
              {errorMsg && (
                <Alert
                  severity="error"
                  sx={{ marginTop: 1 }}
                >
                  {errorMsg}
                </Alert>
              )}

              <Box sx={{ marginTop: 3 }}>
                <InputText
                  label="Email"
                  error={errors.email?.message}
                  {...register('email', emailValidation)}
                  onChange={(e) =>
                    setValue('email', e.target.value)
                  }
                />
              </Box>
              <Box sx={{ marginTop: 3 }}>
                <InputText
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  {...register(
                    'password',
                    passwordValidation
                  )}
                  onChange={(e) =>
                    setValue('password', e.target.value)
                  }
                />
              </Box>
              <Button
                variant="contained"
                sx={{ marginTop: 3, color: 'white' }}
                type="submit"
              >
                Đăng nhập
              </Button>
            </form>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: 2 }}
            >
              <Link to={`/${path.doctor.forgotPassword}`}>
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
              <Link to={`/${path.doctor.register}`}>
                <Typography
                  sx={{
                    ':hover': {
                      color: 'primary.main',
                      cursor: 'pointer'
                    }
                  }}
                >
                  Đăng ký tài khoản?
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Options />
    </>
  )
}

export default LoginDoctor
