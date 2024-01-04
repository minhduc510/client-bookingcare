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

type Inputs = {
  email: string
  password: string
}

const Login = () => {
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
    } = await apiNoToken.login(data)
    if (error) {
      setErrorMsg(message)
    } else {
      dispatch(loginAdded(dataRes.accessToken))
      setErrorMsg('')
      const pathName =
        searchParams.get('continue_url') ??
        `/${path.admin.path}`
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
          <Box sx={{ width: '300px' }}>
            <ReactLogo />
          </Box>
          <Box
            sx={{
              width: '500px',
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
              <h2>Đăng nhập</h2>
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
              justifyContent="end"
              sx={{ marginTop: 2 }}
            >
              <Link
                to={`/${path.admin.path}/${path.admin.children.forgotPassword}`}
              >
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
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Options />
    </>
  )
}

export default Login
