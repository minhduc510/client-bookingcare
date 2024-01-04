import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import {
  Box,
  Stack,
  Button,
  Container,
  Alert
} from '@mui/material'

import Loading from '@/components/Loading'
import Options from '@/components/Options'
import InputText from '@/components/InputText'
import ReactLogo from '@/assets/svg/logo.svg?react'
import { passwordValidation } from '@/validation'
import { apiNoToken } from '@/api'

type Inputs = {
  passwordConfirm: string
  password: string
}

const RecoverPassword = () => {
  const [loading, setLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorTokenExist, setErrorTokenExist] =
    useState(false)
  const [changePasswordSuccess, setChangePasswordSuccess] =
    useState(false)
  const [userId, setUserId] = useState(null)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      passwordConfirm: ''
    }
  })
  const onSubmit: SubmitHandler<Inputs> = async ({
    password
  }) => {
    setLoading(true)
    if (userId) {
      const { error } = await apiNoToken.recoverPassWord(
        userId,
        password
      )
      setIsSubmit(true)
      setChangePasswordSuccess(!error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (token) {
      const callApi = async () => {
        const { error, userId } =
          await apiNoToken.checkTokenEmail(token)
        if (error) {
          setErrorTokenExist(error)
        } else {
          setUserId(userId)
        }
      }
      callApi()
    }
  }, [])

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
            {isSubmit ? (
              changePasswordSuccess ? (
                <Alert severity="success">
                  Đổi mật khẩu thành công!
                </Alert>
              ) : (
                <Alert severity="error">
                  Đổi mật khẩu không thành công, vui lòng
                  kiểm tra lại!
                </Alert>
              )
            ) : errorTokenExist ? (
              <Alert severity="error">
                Thời hạn lấy lại mật khẩu đã hết, vui lòng
                gửi lại yêu cầu!
              </Alert>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Lấy lại mật khẩu</h2>
                <Box sx={{ marginTop: 3 }}>
                  <InputText
                    label="Mật khẩu mới"
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
                <Box sx={{ marginTop: 3 }}>
                  <InputText
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    error={errors.passwordConfirm?.message}
                    {...register('passwordConfirm', {
                      required: true,
                      validate: (val: string) => {
                        if (watch('password') != val) {
                          return 'Mật khẩu không trùng khớp'
                        }
                      }
                    })}
                    onChange={(e) =>
                      setValue(
                        'passwordConfirm',
                        e.target.value
                      )
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
            )}
          </Box>
        </Stack>
      </Container>
      <Options />
    </>
  )
}

export default RecoverPassword
