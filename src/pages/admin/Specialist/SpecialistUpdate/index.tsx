import MarkdownIt from 'markdown-it'
import { useCallback, useEffect, useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom'
import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material'
import {
  ErrorOption,
  SubmitHandler,
  useForm
} from 'react-hook-form'

import path from '@/routes/path'
import swal from '@/utils/swal'
import colorCode from '@/configs/color'
import { FaCloudUploadAlt } from '@/icons'
import { IEditorProps } from '@/interface'
import Loading from '@/components/Loading'
import { nameValidation } from '@/validation'
import InputText from '@/components/InputText'
import { apiHasToken, apiNoToken } from '@/api'
import ImagePreview from '@/components/ImagePreview'
import VisuallyHiddenInput from '@/helpers/VisuallyHiddenInput'

const mdParser = new MarkdownIt(/* Markdown-it options */)

type Inputs = {
  name: string
}

const SpecialistUpdate = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | string>('')
  const [html, setHtml] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [errorMarkdown, setErrorMarkdown] = useState(false)
  const [messageErrorFile, setMessageErrorFile] =
    useState<string>('')

  const [openImagePreview, setOpenImagePreview] =
    useState(false)

  const closeImagePreview = useCallback(() => {
    setOpenImagePreview(false)
  }, [])

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

  function handleEditorChange({
    html,
    text
  }: IEditorProps) {
    setText(text)
    setHtml(html)
  }

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: 'Đang tải dữ liệu ...'
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async ({
    name
  }) => {
    if (file) {
      setLoading(true)
      const formdata = new FormData()
      formdata.append('name', name)
      formdata.append('html', html)
      formdata.append('text', text)
      if (typeof file === 'object') {
        formdata.append('file', file)
      }
      const { error, message } =
        await apiHasToken.updateSpecialist(
          Number(id),
          formdata
        )
      if (!error) {
        swal.success('Cập nhật thành công').then(() => {
          navigate(`/${path.admin.specialist}`)
        })
      } else {
        swal.error(message)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    const callApi = async () => {
      const { error, data } =
        await apiNoToken.getSpecialist(Number(id))
      if (!error) {
        const { html, name, text, image } = data
        setHtml(html)
        setText(text)
        setValue('name', name)
        setFile(image)
      }
      setLoading(false)
    }
    callApi()
  }, [])

  return (
    <>
      <Box>
        {loading && <Loading open={loading} />}
        <Typography fontSize="1.2rem" fontWeight="600">
          Tạo mới chuyên khoa
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            spacing={2}
            marginY={2}
          >
            <InputText
              size="small"
              label={'Name'}
              error={errors.name?.message}
              {...register('name', nameValidation)}
              onChange={(e) => {
                setValue('name', e.target.value)
                setError('name', '' as ErrorOption)
              }}
            />
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
              >
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
                  sx={{ minWidth: '150px' }}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleInputFile}
                  />
                </Button>
                {file && (
                  <Box sx={{ fontSize: '0.9rem' }}>
                    Đã chọn 1 ảnh (
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
              {messageErrorFile && (
                <Typography
                  sx={{
                    color: '#f44336',
                    fontSize: '1rem'
                  }}
                  margin="5px 0 0 15px"
                >
                  {messageErrorFile}
                </Typography>
              )}
            </Box>
          </Stack>
          <Box
            sx={{
              marginTop: 3,
              ul: {
                listStyle: 'disc'
              },
              '.rc-md-editor': {
                border: errorMarkdown
                  ? '1px solid #f44336'
                  : 'none'
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
              Miêu tả:
            </Typography>
            <MdEditor
              style={{ height: '500px' }}
              value={text}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
            {errorMarkdown && (
              <Typography
                sx={{
                  color: '#f44336',
                  fontSize: '1rem'
                }}
                margin="5px 0 0 15px"
              >
                Trường này không được bỏ trống
              </Typography>
            )}
          </Box>
          <Stack
            spacing={1}
            marginY={3}
            direction="row"
            justifyContent="flex-end"
          >
            <Link to={`/${path.admin.specialist}`}>
              <Button variant="contained" color="info">
                Trở về
              </Button>
            </Link>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={() => {
                if (!file) {
                  setMessageErrorFile(
                    'Trường này không được bỏ trống'
                  )
                }
                if (!text) {
                  setErrorMarkdown(true)
                }
              }}
            >
              Cập nhật
            </Button>
          </Stack>
        </form>
      </Box>
      <ImagePreview
        file={file}
        radius={false}
        open={openImagePreview}
        closeModel={closeImagePreview}
      />
    </>
  )
}

export default SpecialistUpdate
