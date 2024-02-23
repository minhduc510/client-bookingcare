/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {
  useForm,
  SubmitHandler,
  ErrorOption
} from 'react-hook-form'
import {
  Box,
  Button,
  Typography,
  Stack
} from '@mui/material'

import { passwordValidation } from '@/validation'
import Loading from '@/components/Loading'
import InputText from '@/components/InputText'
import { Link, useNavigate } from 'react-router-dom'
import path from '@/routes/path'
import swal from '@/utils/swal'
import { apiHasToken } from '@/api'

type Inputs = {
  password: string
  passwordNew: string
  passwordConfirm: string
}

const ChangePasswordAdmin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      passwordNew: '',
      passwordConfirm: ''
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async ({
    password,
    passwordNew
  }) => {
    setLoading(true)
    const { error, message } =
      await apiHasToken.changePassword(
        password,
        passwordNew
      )
    if (!error) {
      swal
        .success('Đổi mật khẩu thành công ^^')
        .then(() => {
          navigate(`/${path.client.personalInfo}`)
        })
    } else {
      swal.error(message)
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <Loading open={loading} />}
      <Box
        id="transition-modal-description"
        sx={{ paddingY: 2 }}
      >
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontSize: '1.4rem'
          }}
        >
          Thay đổi mật khẩu
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%' }}
        >
          <Box sx={{ marginTop: 3 }}>
            <InputText
              label={'Mật khẩu cũ'}
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
              label={'Mật khẩu mới'}
              type="password"
              error={errors.passwordNew?.message}
              {...register(
                'passwordNew',
                passwordValidation
              )}
              onChange={(e) => {
                setValue('passwordNew', e.target.value)
                setError('passwordNew', '' as ErrorOption)
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
                  if (watch('passwordNew') != val) {
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

          <Stack direction="row" spacing={2} marginTop={2}>
            <Button
              variant="contained"
              color="info"
              sx={{
                color: 'white'
              }}
            >
              <Link to={`/${path.admin.personalInfo}`}>
                Trở lại
              </Link>
            </Button>
            <Button
              variant="contained"
              sx={{
                color: 'white'
              }}
              type="submit"
            >
              Tiếp tục
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default ChangePasswordAdmin
