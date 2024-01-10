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
import { UserProps } from '@/interface'
import styleModel from '@/helpers/styleModel'

interface IProps {
  open: boolean
  closeModel: () => void
  user: UserProps | null
}

const ModelInfo = ({ user, open, closeModel }: IProps) => {
  return (
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
              src={user?.avatar}
              sx={{ width: 65, height: 65, mx: 'auto' }}
            />
            <Typography
              sx={{ textAlign: 'center', marginTop: 1 }}
            >
              {user?.fullName}
            </Typography>
            <Box sx={{ marginTop: 1 }}>
              <Typography>
                Họ tên: {user?.fullName}
              </Typography>
              <Typography>
                Giới tính: {user?.gender ? 'Nữ' : 'Name'}
              </Typography>
              <Typography>Email: {user?.email}</Typography>
              <Typography>
                Số điện thoại: {user?.phone}
              </Typography>
              {user?.status === 1 ? (
                <Alert sx={{ marginTop: 1 }}>
                  Tài khoản đã được kích hoạt ^^
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{ marginTop: 1 }}
                >
                  Tài khoản này đã bị khóa !
                </Alert>
              )}
            </Box>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModelInfo
