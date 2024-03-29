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
import {
  DateTimePicker,
  LocalizationProvider
} from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import swal from '@/utils/swal'
import styleModel from '@/helpers/styleModel'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModelLock = ({ open, setOpen }: IProps) => {
  const handleLock = () => {
    swal.confirm(
      'Bạn có chắc chắn muốn khóa tài khoản này?'
    )
  }
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
            Khóa tài khoản người dùng
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            <FormControl sx={{ width: '100%' }}>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
              >
                <DateTimePicker />
              </LocalizationProvider>
              <Button
                onClick={handleLock}
                variant="contained"
                sx={{ marginTop: 3, color: 'white' }}
              >
                Tiếp tục
              </Button>
            </FormControl>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModelLock
