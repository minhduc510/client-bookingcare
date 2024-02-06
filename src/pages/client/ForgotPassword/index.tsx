import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Alert,
  Stack,
  Button,
  Typography
} from '@mui/material'

import path from '@/routes/path'
import { apiNoToken } from '@/api'
import colorCode from '@/configs/color'
import Loading from '@/components/Loading'
import InputText from '@/components/InputText'
import { emailValidation } from '@/validation'

type Inputs = {
  email: string
}

const ForgotPasswordClient = () => {
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
            Quên mật khẩu
          </Typography>
          {msg && (
            <Alert
              severity={`${error ? 'error' : 'success'}`}
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
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
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

export default ForgotPasswordClient
