/* eslint-disable no-unused-vars */
import {
  Box,
  Fade,
  Modal,
  Theme,
  Button,
  Select,
  MenuItem,
  Backdrop,
  InputLabel,
  Typography,
  FormControl
} from '@mui/material'
import InputText from '@/components/InputText'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: (theme: Theme) =>
    `${
      theme.palette.mode === 'dark'
        ? theme.boxShadowDark
        : theme.boxShadowLight
    }`,
  p: 4,
  borderRadius: 2
}

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModelUpdate = ({ open, setOpen }: IProps) => {
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
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            Cập nhật thông tin người dùng
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            <FormControl sx={{ width: '100%' }}>
              <Box>
                <InputText label={'Họ tên'} name={''} />
              </Box>
              <FormControl
                fullWidth
                size="small"
                sx={{ marginTop: 3 }}
              >
                <InputLabel id="demo-simple-select-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="male"
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ marginTop: 3 }}>
                <InputText label={'Email'} name={''} />
              </Box>
              <Box sx={{ marginTop: 3 }}>
                <InputText
                  label={'Số điện thoại'}
                  name={''}
                />
              </Box>
              <Button
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

export default ModelUpdate
