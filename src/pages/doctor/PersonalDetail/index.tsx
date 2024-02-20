/* eslint-disable react-hooks/exhaustive-deps */
import {
  nameValidation,
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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import swal from '@/utils/swal'
import path from '@/routes/path'
import colorCode from '@/configs/color'
import Loading from '@/components/Loading'
import InputText from '@/components/InputText'
import { useAppSelector } from '@/redux/hooks'
import { stateUserSlice } from '@/redux/slices/user'
import { apiHasToken, apiNoToken, linkApi } from '@/api'
import {
  ISpecialistProps,
  InfoDoctorProps,
  PositionProps
} from '@/interface'
import {
  InputAdornment,
  NumberInput
} from '@/components/NumberInput'

const initVal = 'Đang tải dữ liệu...'

type Inputs = {
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
const PersonalDetailDoctor = () => {
  const navigate = useNavigate()
  const { id } = useAppSelector(stateUserSlice)
  const [loading, setLoading] = useState(false)
  const [textMarkdown, setTextMarkdown] = useState('')
  const [textHTML, setTextHTML] = useState('')
  const [messageErrorPosition, setMessageErrorPosition] =
    useState('')
  const [activeBtnSave, setActiveBtnSave] = useState(true)
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

  const handleChangePosition = (
    event: SelectChangeEvent<typeof personPosition>
  ) => {
    const {
      target: { value }
    } = event
    setMessageErrorPosition('')
    setPersonPosition(value as string[])
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
      description: initVal,
      nameClinic: initVal,
      addressClinic: initVal,
      priceFrom: 100000,
      priceTo: 500000
    } as Inputs
  })

  const onSubmit: SubmitHandler<Inputs> = async (
    dataValues
  ) => {
    setLoading(true)
    if (!personPosition.length) {
      if (!personPosition.length) {
        setMessageErrorPosition(
          'Trường này không được để trống'
        )
      }
    } else {
      const formData: InfoDoctorProps = {
        ...dataValues,
        positions: personPosition.map(
          (item) => item.split('-')[0]
        ),
        specialist: specialistsSelected.split('-')[0],
        markdown: textMarkdown,
        html: textHTML
      }

      const { error, message } =
        await apiHasToken.updateDoctorCurrent(formData)
      if (!error) {
        swal
          .success('Cập nhật bác sĩ thành công')
          .then(() => {
            navigate(`/${path.doctor.home}`)
          })
      } else {
        swal.error(message)
      }
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
      }
    }
  }, [isLoadingSpecialist])

  useEffect(() => {
    if (data && data.user) {
      reset({
        description: data.user.doctor_info
          ? data.user.doctor_info?.description
          : '(Chưa cập nhật)',
        nameClinic: data.user.doctor_info
          ? data.user.doctor_info?.nameClinic
          : '(Chưa cập nhật)',
        addressClinic: data.user.doctor_info
          ? data.user.doctor_info?.addressClinic
          : '(Chưa cập nhật)',
        priceFrom:
          data.user.doctor_info?.priceFrom ?? 100000,
        priceTo: data.user.doctor_info?.priceTo ?? 500000
      })
      if (data.user.doctor_info) {
        setSpecialistsSelected(
          `${data.user.doctor_info.specialist.id}-${data.user.doctor_info.specialist.name}`
        )
        setTextMarkdown(data.user.doctor_info?.markdown)
        setTextHTML(data.user.doctor_info?.html)
      }
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
    getValues('addressClinic'),
    getValues('nameClinic'),
    getValues('priceFrom'),
    getValues('priceTo'),
    textMarkdown,
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
            Cập nhật bác sĩ
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
                      listPosition?.data?.map(
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
        </>
      )}
    </>
  )
}

export default PersonalDetailDoctor
