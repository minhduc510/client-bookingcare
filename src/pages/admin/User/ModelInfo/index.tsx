/* eslint-disable no-unused-vars */
import {
  Box,
  Fade,
  Modal,
  Backdrop,
  Typography,
  Avatar,
  Alert
} from '@mui/material'

import { FaRegCircleCheck } from '@/icons'
import styleModel from '@/helpers/styleModel'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModelInfo = ({ open, setOpen }: IProps) => {
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
            Thông tin người dùng
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            <Avatar
              alt="Đức"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 65, height: 65, mx: 'auto' }}
            />
            <Typography
              sx={{ textAlign: 'center', marginTop: 1 }}
            >
              Trần Minh Đức
            </Typography>
            <Box sx={{ marginTop: 1 }}>
              <Typography>Họ tên: Trần Minh Đức</Typography>
              <Typography>Giới tính: Nam</Typography>
              <Typography>Email: duc@gmail.com</Typography>
              <Typography>
                Số điện thoại: 0912649791
              </Typography>
              <Alert
                sx={{ marginTop: 1 }}
                iconMapping={{
                  success: (
                    <FaRegCircleCheck fontSize="inherit" />
                  )
                }}
              >
                Tài khoản đã được kích hoạt ^^
              </Alert>
            </Box>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModelInfo
