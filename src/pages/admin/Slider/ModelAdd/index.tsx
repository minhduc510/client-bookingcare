/* eslint-disable no-unused-vars */
import { mutate } from 'swr'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Fade,
  Modal,
  Button,
  Backdrop,
  Typography
} from '@mui/material'

import swal from '@/utils/swal'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import styleModel from '@/helpers/styleModel'
import InputText from '@/components/InputText'
import VisuallyHiddenInput from '@/helpers/VisuallyHiddenInput'

import { FaCloudUploadAlt } from '@/icons'
import { apiHasToken, linkApi } from '@/api'
import { addressValidation } from '@/validation'

interface IProps {
  open: boolean
  setOpen: () => void
}

type Inputs = {
  title: string
}

const ModelAdd = ({ open, setOpen }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [messageErrorFile, setMessageErrorFile] =
    useState<string>('')

  const handleInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const acceptedFormats = ['image/jpeg', 'image/png']
      const fileExtension = event.target.files[0].type
      if (!acceptedFormats.includes(fileExtension)) {
        setFile(null)
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
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: ''
    } as Inputs
  })
  const onSubmit: SubmitHandler<Inputs> = async ({
    title
  }) => {
    setLoading(true)
    if (!file) {
      setMessageErrorFile('Trường này không được bỏ trống')
    }
    if (file && !messageErrorFile) {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('file', file)
      const { error } = await apiHasToken.createSlide(
        formData
      )
      if (!error) {
        swal.success('Thêm slide thành công').then(() => {
          mutate(linkApi.getAllSlide)
          setOpen()
        })
      } else {
        swal.error('Thêm slide không thành công')
      }
    }
    setLoading(false)
  }
  // console.log(data)
  return (
    <>
      {loading && <Loading open={loading} />}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen()}
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
              Thêm Slide
            </Typography>
            <Box
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                  <InputText
                    label={'Title'}
                    error={errors.title?.message}
                    {...register(
                      'title',
                      addressValidation
                    )}
                    onChange={(e) => {
                      setValue('title', e.target.value)
                    }}
                  />
                </Box>
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
                    sx={{ maxWidth: '200px', marginTop: 2 }}
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
                  {file && (
                    <Box
                      sx={{
                        marginTop: 3,
                        width: '300px',
                        height: '200px',
                        position: 'relative',
                        border: '1px solid gray',
                        borderRadius: 1
                      }}
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={''}
                        fill
                        objectFit="contain"
                      />
                    </Box>
                  )}
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginTop: 3, color: 'white' }}
                  onClick={() => {
                    if (!file) {
                      setMessageErrorFile(
                        'Trường này không được bỏ trống'
                      )
                    }
                  }}
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
