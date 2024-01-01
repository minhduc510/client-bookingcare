/* eslint-disable no-unused-vars */
import {
  Box,
  Fade,
  Modal,
  Button,
  Select,
  MenuItem,
  Backdrop,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material'
import InputText from '@/components/InputText'
import styleModel from '@/helpers/styleModel'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModelAdd = ({ open, setOpen }: IProps) => {
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
            Thêm người dùng
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
              <Box sx={{ marginTop: 3 }}>
                <InputText label={'Password'} name={''} />
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

export default ModelAdd
