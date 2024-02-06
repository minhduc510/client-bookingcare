/* eslint-disable react-hooks/exhaustive-deps */
import {
  nameValidation,
  emailValidation,
  phoneValidation,
  addressValidation
} from '@/validation'
import {
  Box,
  Chip,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material'
import {
  useForm,
  ErrorOption,
  SubmitHandler
} from 'react-hook-form'
import useSWR from 'swr'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import swal from '@/utils/swal'
import path from '@/routes/path'
import colorCode from '@/configs/color'
import { FaCloudUploadAlt } from '@/icons'
import Loading from '@/components/Loading'
import { NAME_ROLES } from '@/utils/constant'
import InputText from '@/components/InputText'
import ImagePreview from '@/components/ImagePreview'
import { apiHasToken, apiNoToken, linkApi } from '@/api'
import {
  Gender,
  ISpecialistProps,
  PositionProps,
  Role
} from '@/interface'
import VisuallyHiddenInput from '@/helpers/VisuallyHiddenInput'
import {
  InputAdornment,
  NumberInput
} from '@/components/NumberInput'

const initVal = 'Đang tải dữ liệu...'

type Inputs = {
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  description: string
  nameClinic: string
  addressClinic: string
  priceFrom: number
  priceTo: number
}

interface IEditorProps {
  html: string
  text: string
}

const mdParser = new MarkdownIt(/* Markdown-it options */)

const DoctorUpdate = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [openImagePreview, setOpenImagePreview] =
    useState(false)
  const [gender, setGender] = useState(0)
  const [file, setFile] = useState<File | string>('')
  const [messageErrorFile, setMessageErrorFile] =
    useState<string>('')
  const [textMarkdown, setTextMarkdown] = useState('')
  const [textHTML, setTextHTML] = useState('')
  const [messageErrorRole, setMessageErrorRole] =
    useState('')
  const [messageErrorPosition, setMessageErrorPosition] =
    useState('')
  const [activeBtnSave, setActiveBtnSave] = useState(true)

  const [roleName, setRoleName] = useState<Role[]>([
    'Doctor'
  ])
  const [personPosition, setPersonPosition] = useState<
    string[]
  >([])
  const [specialistsSelected, setSpecialistsSelected] =
    useState('')
  const [specialists, setSpecialists] = useState<string[]>(
    []
  )

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

  const handleChangeRole = (
    event: SelectChangeEvent<typeof roleName>
  ) => {
    const {
      target: { value }
    } = event
    setMessageErrorRole('')
    setRoleName(value as Role[])
  }

  const handleChangePosition = (
    event: SelectChangeEvent<typeof personPosition>
  ) => {
    const {
      target: { value }
    } = event
    setMessageErrorPosition('')
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

  const handleChangeSpecialists = (
    event: SelectChangeEvent
  ) => {
    const {
      target: { value }
    } = event
    setSpecialistsSelected(value)
  }

  const { data: listPosition } = useSWR(
    linkApi.getAllPosition,
    apiHasToken.getAllPosition(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  const { data, isLoading, mutate } = useSWR(
    linkApi.getDetailDoctor(Number(id)),
    apiNoToken.getDetailDoctor(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    mutate()
  }, [])

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
      email: initVal,
      phone: initVal,
      address: initVal,
      lastName: initVal,
      firstName: initVal,
      description: initVal,
      nameClinic: initVal,
      addressClinic: initVal,
      priceFrom: 100000,
      priceTo: 500000
    } as Inputs
  })

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    ...rest
  }) => {
    setLoading(true)
    if (!roleName.length || !personPosition.length) {
      if (!roleName.length) {
        setMessageErrorRole(
          'Trường này không được để trống'
        )
      }
      if (!personPosition.length) {
        setMessageErrorPosition(
          'Trường này không được để trống'
        )
      }
    } else {
      const formData = new FormData()
      for (const property in rest) {
        formData.append(
          `${property}`,
          `${rest[property as keyof typeof rest]}`
        )
      }
      if (email !== data.user.email) {
        formData.append('email', email)
      }
      if (
        JSON.stringify(roleName) !==
        JSON.stringify(data.user.roles)
      ) {
        for (const element of roleName) {
          formData.append('roles[]', element)
        }
      }
      for (const element of personPosition) {
        formData.append(
          'positions[]',
          element.split('-')[0].trim()
        )
      }
      formData.append('gender', String(gender))
      if (
        specialistsSelected !==
        `${data.user.doctor_info.specialist.id}-${data.user.doctor_info.specialist.name}`
      ) {
        formData.append(
          'specialist',
          specialistsSelected.split('-')[0]
        )
      }
      if (textMarkdown !== data.user.doctor_info.markdown) {
        formData.append('markdown', textMarkdown)
        formData.append('html', textHTML)
      }
      file &&
        file !== data.user.avatar &&
        formData.append('file', file)
      const { error, message } =
        await apiHasToken.updateUser(Number(id), formData)
      if (!error) {
        swal
          .success('Cập nhật bác sĩ thành công')
          .then(() => {
            navigate(`/${path.admin.doctors}`)
          })
      } else {
        swal.error(message)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    const callApi = async () => {
      const { error, data } =
        await apiNoToken.getAllSpecialist()
      if (!error) {
        if (data.length) {
          setSpecialists(
            data.map(
              (item: ISpecialistProps) =>
                `${item.id}-${item.name}`
            )
          )
        }
      }
      setLoading(false)
    }
    callApi()
  }, [loading])

  useEffect(() => {
    if (data && data.user) {
      reset({
        email: data.user.email,
        phone: data.user.phone,
        address: data.user.address,
        lastName: data.user.lastName,
        firstName: data.user.firstName,
        description:
          data.user.doctor_info?.description ?? '',
        nameClinic: data.user.doctor_info?.nameClinic ?? '',
        addressClinic:
          data.user.doctor_info?.addressClinic ?? '',
        priceFrom:
          data.user.doctor_info?.priceFrom ?? 100000,
        priceTo: data.user.doctor_info?.priceTo ?? 500000
      })
      setRoleName(data.user.roles)
      setSpecialistsSelected(
        `${data.user.doctor_info.specialist.id}-${data.user.doctor_info.specialist.name}`
      )
      setGender(Number(data.user.gender))
      setTextMarkdown(data.user.doctor_info?.markdown)
      setTextHTML(data.user.doctor_info?.html)
      setFile(data.user.avatar)
      setPersonPosition(
        data.user.positions.map(
          (item: PositionProps) => `${item.id}-${item.name}`
        )
      )
    }
  }, [isLoading, JSON.stringify(data?.user)])

  useEffect(() => {
    if (data && data.user) {
      if (
        JSON.stringify(
          data.user.positions.map(
            (item: PositionProps) =>
              `${item.id}-${item.name}`
          )
        ) !== JSON.stringify(personPosition) ||
        JSON.stringify(data.user.roles) !==
          JSON.stringify(roleName) ||
        file !== data.user.avatar ||
        getValues('phone') !== data.user.phone ||
        getValues('email') !== data.user.email ||
        getValues('address') !== data.user.address ||
        getValues('firstName') !== data.user.firstName ||
        getValues('lastName') !== data.user.lastName ||
        gender !== Number(data.user.gender) ||
        getValues('nameClinic') !==
          data.user.doctor_info?.nameClinic ||
        getValues('addressClinic') !==
          data.user.doctor_info?.addressClinic ||
        Number(getValues('priceTo')) !==
          data.user.doctor_info?.priceTo ||
        Number(getValues('priceFrom')) !==
          data.user.doctor_info?.priceFrom ||
        specialistsSelected !==
          `${data.user.doctor_info.specialist.id}-${data.user.doctor_info.specialist.name}` ||
        textMarkdown?.replace(/[\r\n]/gm, '') !==
          data.user.doctor_info?.markdown?.replace(
            /[\r\n]/gm,
            ''
          )
      ) {
        setActiveBtnSave(false)
      } else {
        setActiveBtnSave(true)
      }
    }
  }, [
    isLoading,
    JSON.stringify(personPosition),
    JSON.stringify(roleName),
    file,
    getValues('phone'),
    getValues('email'),
    getValues('address'),
    getValues('lastName'),
    getValues('firstName'),
    getValues('addressClinic'),
    getValues('nameClinic'),
    getValues('firstName'),
    getValues('priceFrom'),
    getValues('priceTo'),
    textMarkdown,
    gender,
    specialistsSelected
  ])

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
            Cập nhật bác sĩ #{data?.user.id}
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
                  error={!!messageErrorRole}
                >
                  <InputLabel id="demo-multiple-chip-label">
                    Quyền
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={roleName}
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
                  {!!messageErrorRole && (
                    <FormHelperText>
                      {messageErrorRole}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  size="small"
                  sx={{
                    marginTop: 3,
                    width: '100%'
                  }}
                  error={!!messageErrorPosition}
                >
                  <InputLabel id="demo-multiple-chip-label">
                    Chức vụ
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personPosition}
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
                  {!!messageErrorPosition && (
                    <FormHelperText>
                      {messageErrorPosition}
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
                direction={'row'}
                alignItems={'center'}
                spacing={1}
                marginTop={!messageErrorFile ? 3 : 0}
                sx={{ width: '100%' }}
              >
                <Box>
                  <Button
                    color={`${
                      messageErrorFile ? 'error' : 'primary'
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
                          onChange={(_event, val) => {
                            setValue(
                              'priceFrom',
                              Number(val),
                              { shouldValidate: true }
                            )
                          }}
                          value={getValues('priceFrom')}
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
                              val as number,
                              { shouldValidate: true }
                            )
                          }
                          min={1000}
                          value={getValues('priceTo')}
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
                  value={textMarkdown}
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
                  disabled={activeBtnSave}
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

export default DoctorUpdate
