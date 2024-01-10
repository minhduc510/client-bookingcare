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
  addressValidation
} from '@/validation'
import Loading from '@/components/Loading'
import styleModel from '@/helpers/styleModel'
import InputText from '@/components/InputText'
import { Role, UserProps } from '@/interface'
import { apiHasToken } from '@/api'
import swal from '@/utils/swal'

const names = ['Doctor', 'Client']

interface IProps {
  user: UserProps
  open: boolean
  closeModel: () => void
  resetSearchAndKeyword: () => void
}

type Gender = 0 | 1

type Inputs = {
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  roles: Role[]
}

const ModelUpdate = ({
  user,
  open,
  closeModel,
  resetSearchAndKeyword
}: IProps) => {
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState(Number(user.gender))

  const [roleName, setRoleName] = useState<Role[]>(
    user.roles as Role[]
  )

  const handleChangeRole = (
    event: SelectChangeEvent<typeof roleName>
  ) => {
    const {
      target: { value }
    } = event
    setError('roles', '' as ErrorOption)
    setRoleName(value as Role[])
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
      email: user.email,
      phone: user.phone,
      address: user.address,
      lastName: user.lastName,
      firstName: user.firstName,
      roles: roleName
    } as Inputs
  })

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    phone,
    address,
    lastName,
    firstName,
    roles
  }) => {
    setLoading(true)
    const dataBody: UserProps = {}
    if (firstName.trim() !== user.firstName) {
      dataBody.firstName = firstName
    }
    if (lastName.trim() !== user.lastName) {
      dataBody.lastName = lastName
    }
    if (address.trim() !== user.address) {
      dataBody.address = address
    }
    if (phone.trim() !== user.phone) {
      dataBody.phone = phone
    }
    if (email.trim() !== user.email) {
      dataBody.email = email
    }
    if (
      JSON.stringify(roles) !== JSON.stringify(user.roles)
    ) {
      dataBody.roles = roles
    }
    if (gender !== Number(user.gender)) {
      dataBody.gender = gender
    }
    if (Object.keys(dataBody).length > 0) {
      const { error, message } =
        await apiHasToken.updateUser(
          Number(user.id),
          dataBody
        )
      if (!error) {
        swal
          .success('Cập nhật user thành công ^^')
          .then(() => {
            closeModel()
            resetSearchAndKeyword()
          })
      } else {
        swal.error(message)
      }
    } else {
      await swal.warning(
        'Bạn chưa thay đổi thông tin nào !'
      )
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
              Cập nhật người dùng
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
                    value={roleName}
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

export default ModelUpdate
