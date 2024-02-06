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
  Stack,
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
import { FaCloudUploadAlt, FiX } from '@/icons'
import { apiHasToken } from '@/api'
import { Role, UserProps } from '@/interface'

import swal from '@/utils/swal'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import styleModel from '@/helpers/styleModel'
import InputText from '@/components/InputText'
import VisuallyHiddenInput from '@/helpers/VisuallyHiddenInput'

const names = ['Doctor', 'Client']

interface IProps {
  user: UserProps
  open: boolean
  closeModel: (submit?: boolean) => void
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
  const [file, setFile] = useState<File | string>(
    user.avatar as string
  )
  const [activeBtnSave, setActiveBtnSave] = useState(true)
  const [messageErrorFile, setMessageErrorFile] =
    useState<string>('')

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
    const formData = new FormData()
    if (firstName.trim() !== user.firstName) {
      formData.append('firstName', firstName)
    }
    if (lastName.trim() !== user.lastName) {
      formData.append('lastName', lastName)
    }
    if (address.trim() !== user.address) {
      formData.append('address', address)
    }
    if (phone.trim() !== user.phone) {
      formData.append('phone', phone)
    }
    if (email.trim() !== user.email) {
      formData.append('email', email)
    }
    if (
      JSON.stringify(roles) !== JSON.stringify(user.roles)
    ) {
      for (const element of roles) {
        formData.append('roles[]', element)
      }
    }
    if (gender !== Number(user.gender)) {
      formData.append('gender', String(gender))
    }
    if (typeof file !== 'string') {
      formData.append('file', file)
    }
    const { error, message } = await apiHasToken.updateUser(
      Number(user.id),
      formData
    )
    if (!error) {
      swal
        .success('Cập nhật user thành công ^^')
        .then(async () => {
          closeModel(true)
          resetSearchAndKeyword()
        })
    } else {
      swal.error(message)
    }
    setLoading(false)
  }

  useEffect(() => {
    reset()
  }, [open])

  useEffect(() => {
    if (user) {
      if (
        getValues('address') !== user.address ||
        getValues('email') !== user.email ||
        getValues('firstName') !== user.firstName ||
        getValues('lastName') !== user.lastName ||
        getValues('phone') !== user.phone ||
        file !== user.avatar ||
        JSON.stringify(user.roles) !==
          JSON.stringify(roleName) ||
        Number(user.gender) !== gender
      ) {
        setActiveBtnSave(false)
      } else {
        setActiveBtnSave(true)
      }
    }
  }, [
    getValues('address'),
    getValues('email'),
    getValues('firstName'),
    getValues('lastName'),
    getValues('phone'),
    gender,
    file,
    JSON.stringify(roleName)
  ])

  return (
    <>
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
            <Stack
              onClick={() => closeModel()}
              alignItems={'flex-end'}
            >
              <FiX size={25} />
            </Stack>
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
                        setValue(
                          'firstName',
                          e.target.value
                        )
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
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  marginTop={!messageErrorFile ? 3 : 0}
                >
                  <Box>
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
                        maxWidth: '200px',
                        marginTop: 2
                      }}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleInputFile}
                      />
                    </Button>
                    {messageErrorFile && (
                      <Typography
                        sx={{
                          color: '#f44336',
                          fontSize: '0.8rem'
                        }}
                        margin="5px 0 0 15px"
                      >
                        {messageErrorFile}
                      </Typography>
                    )}
                  </Box>
                  {!messageErrorFile && (
                    <Box
                      sx={{
                        marginTop: 3,
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
                          typeof file !== 'string'
                            ? URL.createObjectURL(file)
                            : (user.avatar as string)
                        }
                        alt={''}
                        fill
                        objectFit="cover"
                      />
                    </Box>
                  )}
                </Stack>
                <Button
                  variant="contained"
                  disabled={activeBtnSave}
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
