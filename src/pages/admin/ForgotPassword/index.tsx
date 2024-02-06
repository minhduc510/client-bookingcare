import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import InputText from '@/components/InputText'
import ReactLogo from '@/assets/svg/logo.svg?react'
import { apiNoToken } from '@/api'
import { emailValidation } from '@/validation'

type Inputs = {
  email: string
}

const ForgotPassword = () => {
  const [msg, setMsg] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: ''
    }
  })
  const onSubmit: SubmitHandler<Inputs> = async ({
    email
  }) => {
    setLoading(true)
    const { error } = await apiNoToken.sendMailGetPassWord(
      email
    )
    setError(error)
    if (error) {
      setMsg('Email không tồn tại')
    } else {
      setMsg(
        'Gửi Email thành công, vui lòng kiểm tra hộp thư để tiến hành lấy lại mật khẩu ^^'
      )
    }
    setLoading(false)
  }
  return (
    <>
      {' '}
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
              <h2>Quên mật khẩu</h2>
              {msg && (
                <Alert
                  severity={`${
                    error ? 'error' : 'success'
                  }`}
                  sx={{ marginTop: 1 }}
                >
                  {msg}
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
              <Button
                variant="contained"
                sx={{ marginTop: 3, color: 'white' }}
                type="submit"
              >
                Gửi yêu cầu
              </Button>
            </form>
            <Stack
              direction="row"
              justifyContent="end"
              sx={{ marginTop: 2 }}
            >
              <Link to={`/${path.admin.login}`}>
                <Typography
                  sx={{
                    ':hover': {
                      color: 'primary.main',
                      cursor: 'pointer'
                    }
                  }}
                >
                  Đăng nhập
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default ForgotPassword
