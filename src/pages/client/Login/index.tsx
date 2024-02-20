import {
  Link,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Stack,
  Button,
  Typography,
  Alert
} from '@mui/material'

import path from '@/routes/path'
import colorCode from '@/configs/color'
import InputText from '@/components/InputText'
import {
  emailValidation,
  passwordValidation
} from '@/validation'
import { useState } from 'react'
import { apiNoToken } from '@/api'
import { useAppDispatch } from '@/redux/hooks'
import { loginAdded } from '@/redux/slices/auth'
import Loading from '@/components/Loading'
import swal from '@/utils/swal'

type Inputs = {
  email: string
  password: string
}

const LoginClient = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLoginGoogle = () => {
    window.open(
      `${import.meta.env.VITE_URL_SERVER}/api/auth/google`,
      '_self'
    )
  }

  const handleLoginFacebook = () => {
    window.open(
      `${
        import.meta.env.VITE_URL_SERVER
      }/api/auth/facebook`,
      '_self'
    )
  }

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
    } = await apiNoToken.login({ ...data, _type: 'Client' })
    if (error) {
      setErrorMsg(message)
    } else {
      swal.success('Đăng nhập thành công!').then(() => {
        dispatch(loginAdded(dataRes.accessToken))
        setErrorMsg('')
        const pathName =
          searchParams.get('continue_url') ??
          path.client.home
        navigate(pathName)
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
            Đăng nhập
          </Typography>
          {errorMsg && (
            <Alert severity="error" sx={{ marginTop: 1 }}>
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
              {...register('password', passwordValidation)}
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
            Tiếp tục
          </Button>
        </form>
        <Box sx={{ marginY: 2 }}>
          <Typography textAlign="center">
            Hoặc đăng nhập bằng:
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            marginTop={1}
          >
            <Button
              variant="contained"
              color="info"
              sx={{ color: 'white' }}
              onClick={handleLoginFacebook}
            >
              Facebook
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ color: 'white' }}
              onClick={handleLoginGoogle}
            >
              Google
            </Button>
          </Stack>
        </Box>
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
          <Link to={`/${path.client.register}`}>
            <Typography
              sx={{
                ':hover': {
                  color: 'primary.main',
                  cursor: 'pointer'
                }
              }}
            >
              Bạn chưa có tài khoản?
            </Typography>
          </Link>
        </Stack>
      </Box>
    </>
  )
}

export default LoginClient
