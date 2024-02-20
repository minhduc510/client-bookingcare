import {
  useForm,
  ErrorOption,
  SubmitHandler
} from 'react-hook-form'
import {
  Box,
  Chip,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material'
import MarkdownIt from 'markdown-it'
import useSWR, { mutate } from 'swr'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import {
  nameValidation,
  roleValidation,
  phoneValidation,
  emailValidation,
  addressValidation,
  passwordValidation
} from '@/validation'
import {
  InputAdornment,
  NumberInput
} from '@/components/NumberInput'
import swal from '@/utils/swal'
import path from '@/routes/path'
import colorCode from '@/configs/color'
import Loading from '@/components/Loading'
import { FaCloudUploadAlt } from '@/icons'
import { apiHasToken, apiNoToken, linkApi } from '@/api'
import { NAME_ROLES } from '@/utils/constant'
import InputText from '@/components/InputText'
import ImagePreview from '@/components/ImagePreview'
import {
  Gender,
  ISpecialistProps,
  PositionProps,
  Role
} from '@/interface'
import VisuallyHiddenInput from '@/helpers/VisuallyHiddenInput'

type Inputs = {
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  description: string
  nameClinic: string
  password: string
  addressClinic: string
  priceFrom: number
  priceTo: number
  roles: Role[]
  positions: string[]
}

interface IEditorProps {
  html: string
  text: string
}

const mdParser = new MarkdownIt(/* Markdown-it options */)

const DoctorCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openImagePreview, setOpenImagePreview] =
    useState(false)
  const [gender, setGender] = useState(0)
  const [file, setFile] = useState<File | string>('')
  const [messageErrorFile, setMessageErrorFile] =
    useState<string>('')
  const [textMarkdown, setTextMarkdown] = useState('')
  const [textHTML, setTextHTML] = useState('')

  const [specialistsSelected, setSpecialistsSelected] =
    useState('')
  const [specialists, setSpecialists] = useState<string[]>(
    []
  )
  const [roleName, setRoleName] = useState<Role[]>([
    'Doctor'
  ])
  const [personPosition, setPersonPosition] = useState<
    string[]
  >([])

  function handleEditorChange({
    html,
    text
  }: IEditorProps) {
    setTextMarkdown(text)
    setTextHTML(html)
  }

  const closeImagePreview = useCallback(() => {
    setOpenImagePreview(false)
  }, [])

  const handleChangeGender = (
    event: SelectChangeEvent<typeof gender>
  ) => {
    const {
      target: { value }
    } = event
    setGender(value as Gender)
  }

  const handleChangeSpecialists = (
    event: SelectChangeEvent
  ) => {
    const {
      target: { value }
    } = event
    setSpecialistsSelected(value)
  }

  const handleChangeRole = (
    event: SelectChangeEvent<typeof roleName>
  ) => {
    const {
      target: { value }
    } = event
    setError('roles', '' as ErrorOption)
    setRoleName(value as Role[])
  }

  const handleChangePosition = (
    event: SelectChangeEvent<typeof personPosition>
  ) => {
    const {
      target: { value }
    } = event
    setError('positions', '' as ErrorOption)
    setPersonPosition(value as string[])
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

  const { data: listPosition, isLoading } = useSWR(
    linkApi.getAllPosition,
    apiHasToken.getAllPosition(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  const {
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
      firstName: '',
      password: '',
      description: '',
      nameClinic: '',
      addressClinic: '',
      priceFrom: 100000,
      priceTo: 500000,
      roles: roleName,
      positions: personPosition
    } as Inputs
  })

  const onSubmit: SubmitHandler<Inputs> = async ({
    roles,
    positions,
    ...data
  }) => {
    setLoading(true)
    const formData = new FormData()
    for (const property in data) {
      formData.append(
        `${property}`,
        `${data[property as keyof typeof data]}`
      )
    }
    for (const element of roles) {
      formData.append('roles[]', element)
    }
    for (const element of positions) {
      formData.append(
        'positions[]',
        element.split('-')[0].trim()
      )
    }
    formData.append('gender', String(gender))
    if (textMarkdown || textHTML) {
      formData.append('markdown', textMarkdown)
      formData.append('html', textHTML)
    }
    file && formData.append('file', file)
    formData.append(
      'specialist',
      specialistsSelected.split('-')[0]
    )
    const { error, message } = await apiHasToken.createUser(
      formData
    )
    if (!error) {
      swal.success('Tạo mới bác sĩ thành công').then(() => {
        mutate([linkApi.getAllUserDoctors])
        navigate(`/${path.admin.doctors}`)
      })
    } else {
      swal.error(message)
    }
    setLoading(false)
  }

  const {
    data: dataSpecialist,
    isLoading: isLoadingSpecialist
  } = useSWR(
    linkApi.getAllSpecialist,
    apiNoToken.getAllSpecialist(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (dataSpecialist) {
      if (dataSpecialist.data.length) {
        setSpecialists(
          dataSpecialist.data.map(
            (item: ISpecialistProps) =>
              `${item.id}-${item.name}`
          )
        )
        setSpecialistsSelected(
          `${dataSpecialist.data[0].id}-${dataSpecialist.data[0].name}`
        )
      }
    }
    setLoading(false)
  }, [isLoadingSpecialist])

  return (
    <>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.3rem'
            }}
          >
            Thêm mới bác sĩ
          </Typography>
          <Box
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: '100%',
                maxWidth: '2400px',
                margin: 'auto'
              }}
            >
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
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
              </Stack>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                sx={{ marginTop: 3 }}
                spacing={3}
              >
                <Box sx={{ width: '100%' }}>
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
                <Box sx={{ width: '100%' }}>
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
                <Box sx={{ width: '100%' }}>
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
              </Stack>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                sx={{ marginTop: 3 }}
                alignItems={{
                  xs: 'center',
                  sm: 'initial',
                  md: 'center'
                }}
                spacing={3}
              >
                <FormControl
                  size="small"
                  sx={{
                    marginTop: 3,
                    width: '100%'
                  }}
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
                    {NAME_ROLES.map((name) => (
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

                <FormControl
                  size="small"
                  sx={{
                    marginTop: 3,
                    width: '100%'
                  }}
                  error={!!errors.positions?.message}
                >
                  <InputLabel id="demo-multiple-chip-label">
                    Chức vụ
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personPosition}
                    {...register(
                      'positions',
                      roleValidation
                    )}
                    onChange={handleChangePosition}
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
                        {selected.map((value: string) => (
                          <Chip
                            key={value}
                            label={value
                              .split('-')[1]
                              ?.trim()}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {!isLoading &&
                      listPosition?.data.map(
                        (item: PositionProps) => (
                          <MenuItem
                            key={item.id}
                            value={`${
                              item.id
                            }-${item.name.trim()}`}
                          >
                            {item.name}
                          </MenuItem>
                        )
                      )}
                  </Select>
                  {!!errors.positions?.message && (
                    <FormHelperText>
                      {errors.positions?.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Thuộc chuyên khoa
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={`${specialistsSelected}`}
                    label="Age"
                    onChange={handleChangeSpecialists}
                  >
                    {specialists.length > 0 ? (
                      specialists.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item.split('-')[1]}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Không có chuyên khoa nào
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Stack>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                sx={{ marginTop: 3 }}
                alignItems={{
                  xs: 'center',
                  sm: 'initial',
                  md: 'center'
                }}
                spacing={3}
              >
                <Box sx={{ width: '100%' }}>
                  <InputText
                    label={'Mật khẩu'}
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
                <Stack
                  direction={{
                    xs: 'row',
                    sm: 'column',
                    md: 'row'
                  }}
                  alignItems={{
                    xs: 'center',
                    sm: 'initial',
                    md: 'center'
                  }}
                  spacing={1}
                  marginTop={!messageErrorFile ? 3 : 0}
                  sx={{ width: '100%' }}
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
                        minWidth: '150px'
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
                  {file && (
                    <Box sx={{ fontSize: '0.9rem' }}>
                      đã chọn 1 ảnh (
                      <Typography
                        display="inline"
                        onClick={() =>
                          setOpenImagePreview(true)
                        }
                        sx={{
                          fontSize: '0.9rem',
                          color: 'blue',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                      >
                        bấm vào đây
                      </Typography>{' '}
                      để xem preview)
                    </Box>
                  )}
                </Stack>
              </Stack>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                marginY={2}
                alignItems={{
                  xs: 'flex-start',
                  sm: 'center'
                }}
                spacing={3}
                width={'100%'}
              >
                <Box
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '55%'
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    Miêu tả:
                  </Typography>
                  <TextField
                    placeholder="Miêu tả..."
                    multiline
                    rows={15}
                    fullWidth
                    helperText={`${
                      !!errors.description?.message
                        ? errors.description?.message
                        : ''
                    }`}
                    {...register(
                      'description',
                      addressValidation
                    )}
                    sx={{
                      maxWidth: '1000px'
                    }}
                    error={!!errors.description?.message}
                  />
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '45%'
                    },
                    '& .MuiTextField-root': {
                      maxWidth: '100%'
                    }
                  }}
                >
                  <Box
                    sx={{
                      marginTop: 4
                    }}
                  >
                    <InputText
                      label={'Tên phòng khám'}
                      error={errors.nameClinic?.message}
                      {...register(
                        'nameClinic',
                        nameValidation
                      )}
                      onChange={(e) => {
                        setValue(
                          'nameClinic',
                          e.target.value
                        )
                        setError(
                          'nameClinic',
                          '' as ErrorOption
                        )
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      marginTop: 4
                    }}
                  >
                    <InputText
                      label={'Địa chỉ phòng khám'}
                      error={errors.addressClinic?.message}
                      {...register(
                        'addressClinic',
                        addressValidation
                      )}
                      onChange={(e) => {
                        setValue(
                          'addressClinic',
                          e.target.value
                        )
                        setError(
                          'addressClinic',
                          '' as ErrorOption
                        )
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        fontStyle: 'italic'
                      }}
                    >
                      Vui lòng ghi rõ địa chỉ cụ thể!
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: 2 }}>
                    <Stack
                      direction={{
                        xs: 'column',
                        md: 'row'
                      }}
                      spacing={2}
                    >
                      <Box
                        sx={{
                          width: '100%'
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            fontStyle: 'italic'
                          }}
                        >
                          Giá từ
                        </Typography>
                        <NumberInput
                          onChange={(_event, val) =>
                            setValue(
                              'priceFrom',
                              val as number
                            )
                          }
                          defaultValue={getValues(
                            'priceFrom'
                          )}
                          min={1000}
                          startAdornment={
                            <InputAdornment>
                              VNĐ
                            </InputAdornment>
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          width: '100%'
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            fontStyle: 'italic'
                          }}
                        >
                          Giá đến
                        </Typography>
                        <NumberInput
                          onChange={(_event, val) =>
                            setValue(
                              'priceTo',
                              val as number
                            )
                          }
                          min={1000}
                          defaultValue={getValues(
                            'priceTo'
                          )}
                          startAdornment={
                            <InputAdornment>
                              VNĐ
                            </InputAdornment>
                          }
                        />
                      </Box>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        fontStyle: 'italic',
                        textAlign: 'center'
                      }}
                    >
                      Ghi cụ thể giá tiền
                      (VD:100.000,1.000.000,...)!
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Box
                sx={{
                  marginTop: 3,
                  ul: {
                    listStyle: 'disc'
                  },
                  '& .rc-md-navigation': {
                    bgcolor: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? 'primary.main'
                          : colorCode.grey200
                      }`,
                    '& .button': {
                      color: '#fff'
                    }
                  },
                  '& .section-container': {
                    bgcolor: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? `${colorCode.grey900} !important`
                          : '#fff !important'
                      }`,
                    color: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? '#fff !important'
                          : `${colorCode.grey900} !important`
                      }`,
                    '.custom-html-style': {
                      color: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? '#fff  !important'
                            : `${colorCode.grey900} !important`
                        }`
                    }
                  }
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  Thông tin thêm:
                </Typography>
                <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={(text) =>
                    mdParser.render(text)
                  }
                  onChange={handleEditorChange}
                />
              </Box>
              <Stack
                alignItems={{
                  xs: 'initial',
                  md: 'flex-end'
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    color: 'white'
                  }}
                  type="submit"
                >
                  Cập nhật
                </Button>
              </Stack>
            </form>
          </Box>
          {openImagePreview && (
            <ImagePreview
              file={file}
              open={openImagePreview}
              closeModel={closeImagePreview}
            />
          )}
        </>
      )}
    </>
  )
}

export default DoctorCreate
