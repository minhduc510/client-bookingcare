/* eslint-disable no-unused-vars */
import {
  Box,
  Fade,
  Modal,
  Button,
  Backdrop,
  Typography,
  FormControl
} from '@mui/material'

import InputText from '@/components/InputText'
import styleModel from '@/helpers/styleModel'
import { FaCloudUploadAlt } from '@/icons'
import VisuallyHiddenInput from '@/helpers/VisuallyHiddenInput'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModelEdit = ({ open, setOpen }: IProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
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
            Sửa Slide
          </Typography>
          <Box
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            <FormControl sx={{ width: '100%' }}>
              <Box>
                <InputText label={'Tiêu đề'} name={''} />
              </Box>
              <Button
                component="label"
                variant="contained"
                startIcon={<FaCloudUploadAlt />}
                sx={{ maxWidth: '200px', marginTop: 2 }}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                variant="contained"
                sx={{ marginTop: 3, color: 'white' }}
              >
                Tiếp tục
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModelEdit
