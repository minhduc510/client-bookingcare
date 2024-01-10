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
  Fade,
  Chip,
  Modal,
  Button,
  Select,
  MenuItem,
  Backdrop,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText
} from '@mui/material'

import {
  nameValidation,
  roleValidation,
  emailValidation,
  phoneValidation,
  addressValidation,
  passwordValidation
} from '@/validation'
import Loading from '@/components/Loading'
import styleModel from '@/helpers/styleModel'
import InputText from '@/components/InputText'
import { Role } from '@/interface'
import { apiHasToken, linkApi } from '@/api'
import swal from '@/utils/swal'
import { KeyedMutator } from 'swr'

const names = ['Doctor', 'Client']

interface IProps {
  mutate: KeyedMutator<unknown>
  open: boolean
  closeModel: () => void
}

type Gender = 0 | 1

type Inputs = {
  email: string
  password: string
  firstName: string
  lastName: string
  address: string
  phone: string
  roles: Role[]
}

const ModelAdd = ({ mutate, open, closeModel }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState(0)

  const [personName, setPersonName] = useState<Role[]>([
    'Client'
  ])

  const handleChangeRole = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value }
    } = event
    setError('roles', '' as ErrorOption)
    setPersonName(value as Role[])
  }

  const handleChangeGender = (
    event: SelectChangeEvent<typeof gender>
  ) => {
    const {
      target: { value }
    } = event
    setGender(value as Gender)
  }

  const {
    reset,
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
      roles: personName
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const { error, message } = await apiHasToken.createUser(
      {
        ...data,
        gender
      }
    )
    if (!error) {
      swal.success('Tạo user thành công ^^').then(() => {
        closeModel()
        mutate(linkApi.getAllUserDoctors)
      })
    } else {
      swal.error(message)
    }
    setLoading(false)
  }

  useEffect(() => {
    reset()
  }, [open])

  return (
    <>
      {' '}
      {loading && <Loading open={loading} />}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => closeModel()}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
        sx={{
          '& .MuiModal-backdrop': {
            backdropFilter: 'blur(3px)'
          }
        }}
      >
        <Fade in={open}>
          <Box sx={styleModel}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Thêm người dùng
            </Typography>
            <Box
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ width: '100%' }}
              >
                <Box>
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
                <Box sx={{ marginTop: 3 }}>
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
                <FormControl
                  size="small"
                  sx={{ marginTop: 3, width: '100%' }}
                  error={!!errors.roles?.message}
                >
                  <InputLabel id="demo-multiple-chip-label">
                    Quyền
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    {...register('roles', roleValidation)}
                    onChange={handleChangeRole}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Chip"
                      />
                    }
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5
                        }}
                      >
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.roles?.message && (
                    <FormHelperText>
                      {errors.roles?.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box sx={{ marginTop: 3 }}>
                  <InputText
                    label={'Password'}
                    type="password"
                    error={errors.password?.message}
                    {...register(
                      'password',
                      passwordValidation
                    )}
                    onChange={(e) => {
                      setValue('password', e.target.value)
                      setError(
                        'password',
                        '' as ErrorOption
                      )
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    color: 'white',
                    width: '100%'
                  }}
                  type="submit"
                >
                  Tiếp tục
                </Button>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ModelAdd
