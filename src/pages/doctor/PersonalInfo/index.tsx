/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  useForm,
  SubmitHandler,
  ErrorOption
} from 'react-hook-form'
import { SelectChangeEvent } from '@mui/material/Select'
import {
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material'

import {
  nameValidation,
  emailValidation,
  phoneValidation,
  addressValidation
} from '@/validation'
import { Gender } from '@/interface'
import { apiHasToken } from '@/api'
import { FaCloudUploadAlt } from '@/icons/index'

import swal from '@/utils/swal'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import InputText from '@/components/InputText'
import VisuallyHiddenInput from '@/helpers/VisuallyHiddenInput'
import { Link } from 'react-router-dom'
import path from '@/routes/path'
import colorCode from '@/configs/color'
import {
  stateUserSlice,
  userUpdated
} from '@/redux/slices/user'
import {
  useAppDispatch,
  useAppSelector
} from '@/redux/hooks'

type Inputs = {
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
}

const PersonalInfoDoctor = () => {
  const [loading, setLoading] = useState(true)
  const [disableSubmit, setDisableSubmit] = useState(true)
  const [gender, setGender] = useState(0)
  const [file, setFile] = useState<File | string>('')
  const [messageErrorFile, setMessageErrorFile] =
    useState<string>('')
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(stateUserSlice)

  const handleChangeGender = (
    event: SelectChangeEvent<typeof gender>
  ) => {
    const {
      target: { value }
    } = event
    setGender(value as Gender)
  }

  const handleInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const acceptedFormats = ['image/jpeg', 'image/png']
      const fileExtension = event.target.files[0].type
      if (!acceptedFormats.includes(fileExtension)) {
        setFile('')
        setMessageErrorFile(
          'Chỉ chấp nhận tệp có dạng image/jpeg hoặc image/png'
        )
        return
      }
      setMessageErrorFile('')
      setFile(event.target.files[0])
    }
  }

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      address: '',
      lastName: '',
      firstName: ''
    }
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const formData = new FormData()
    for (const property in data) {
      formData.append(
        `${property}`,
        `${data[property as keyof typeof data]}`
      )
    }
    formData.append('gender', String(gender))
    typeof file !== 'string' &&
      formData.append('file', file)
    const {
      error,
      message,
      data: dataRes
    } = await apiHasToken.updateCurrent(formData)
    if (!error) {
      swal.success('Cập nhật thành công ^^').then(() => {
        dispatch(userUpdated(dataRes))
      })
    } else {
      swal.error(message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (userInfo.email) {
      reset({
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        lastName: userInfo.lastName,
        firstName: userInfo.firstName
      })
      setGender(Number(userInfo.gender))
      setFile(userInfo.avatar as string)
    }
    setLoading(false)
  }, [JSON.stringify(userInfo)])

  useEffect(() => {
    if (
      gender !== Number(userInfo.gender) ||
      getValues('email') !== userInfo.email ||
      getValues('phone') !== userInfo.phone ||
      getValues('firstName') !== userInfo.firstName ||
      getValues('lastName') !== userInfo.lastName ||
      getValues('address') !== userInfo.address ||
      file !== userInfo.avatar
    ) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
  }, [
    file,
    gender,
    getValues('address'),
    getValues('email'),
    getValues('phone'),
    getValues('lastName'),
    getValues('firstName')
  ])

  return (
    <>
      {loading && !userInfo.email ? (
        <Loading open={loading} />
      ) : (
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
            Thông tin cá nhân
          </Typography>
          <Box
            sx={{
              marginX: 'auto',
              width: {
                xs: 'auto',
                md: '1000px'
              }
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: '100%' }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginTop: 3 }}
                spacing={3}
              >
                <Box sx={{ width: '100%' }}>
                  <InputText
                    label={'firstName'}
                    error={errors.firstName?.message}
                    {...register(
                      'firstName',
                      nameValidation
                    )}
                    onChange={(e) => {
                      setValue('firstName', e.target.value)
                      setError(
                        'firstName',
                        '' as ErrorOption
                      )
                    }}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <InputText
                    label={'lastName'}
                    error={errors.lastName?.message}
                    {...register(
                      'lastName',
                      nameValidation
                    )}
                    onChange={(e) => {
                      setValue('lastName', e.target.value)
                      setError(
                        'lastName',
                        '' as ErrorOption
                      )
                    }}
                  />
                </Box>
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
                  label={'Địa chỉ'}
                  error={errors.address?.message}
                  {...register(
                    'address',
                    addressValidation
                  )}
                  onChange={(e) => {
                    setValue('address', e.target.value)
                    setError('address', '' as ErrorOption)
                  }}
                />
              </Box>
              <Box sx={{ marginTop: 3 }}>
                <InputText
                  label={'Email'}
                  readOnly={Boolean(userInfo.typeLogin)}
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
                  label={'Số điện thoại'}
                  error={errors.phone?.message}
                  {...register('phone', phoneValidation)}
                  onChange={(e) => {
                    setValue('phone', e.target.value)
                    setError('phone', '' as ErrorOption)
                  }}
                />
              </Box>
              {!userInfo.typeLogin && (
                <>
                  <Typography
                    sx={{
                      color: colorCode.cyan400,
                      '& :hover': {
                        color: colorCode.cyan700
                      }
                    }}
                    fontStyle={'italic'}
                    paddingY={2}
                  >
                    <Link
                      to={`/${path.doctor.changePassword}`}
                    >
                      Đổi mật khẩu
                    </Link>
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <Button
                      color={`${
                        messageErrorFile
                          ? 'error'
                          : 'primary'
                      }`}
                      component="label"
                      variant={`${
                        messageErrorFile
                          ? 'outlined'
                          : 'contained'
                      }`}
                      startIcon={<FaCloudUploadAlt />}
                      sx={{
                        maxWidth: '200px'
                      }}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleInputFile}
                      />
                    </Button>
                    {messageErrorFile ? (
                      <Typography
                        sx={{
                          color: '#f44336',
                          fontSize: '0.8rem'
                        }}
                        margin="5px 0 0 15px"
                      >
                        {messageErrorFile}
                      </Typography>
                    ) : (
                      <Box
                        sx={{
                          width: '130px',
                          height: '130px',
                          position: 'relative',
                          border: '1px solid gray',
                          borderRadius: '50%',
                          overflow: 'hidden'
                        }}
                      >
                        <Image
                          src={
                            typeof file === 'string'
                              ? file
                              : URL.createObjectURL(file)
                          }
                          alt={''}
                          fill
                          objectFit="cover"
                        />
                      </Box>
                    )}
                  </Stack>
                </>
              )}
              <Button
                variant="contained"
                sx={{
                  marginTop: 3,
                  color: 'white',
                  width: '100%'
                }}
                type="submit"
                disabled={disableSubmit}
              >
                Tiếp tục
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </>
  )
}

export default PersonalInfoDoctor
