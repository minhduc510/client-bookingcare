/* eslint-disable indent */
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Stack
} from '@mui/material'

import Image from '../Image'
import { FiX } from '@/icons'
import styleModel from '@/helpers/styleModel'

interface IProps {
  file: File | string
  open: boolean
  radius?: boolean
  closeModel: () => void
}

const ImagePreview = ({
  file,
  open,
  radius = true,
  closeModel
}: IProps) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModel}
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
              sx={{ cursor: 'pointer' }}
            >
              <FiX size={25} />
            </Stack>
            <Box
              sx={{
                marginTop: 3,
                width: '200px',
                height: '200px',
                margin: 'auto',
                position: 'relative',
                border: '1px solid gray',
                borderRadius: `${radius ? '50%' : '0'}`,
                overflow: 'hidden'
              }}
            >
              <Image
                src={
                  file && typeof file !== 'string'
                    ? URL.createObjectURL(
                        file as Blob | MediaSource
                      )
                    : file
                }
                alt={''}
                fill
                objectFit="cover"
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ImagePreview
