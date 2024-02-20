import {
  Box,
  Container,
  Stack,
  Typography
} from '@mui/material'
import ReactLogo from '@/assets/svg/logo.svg?react'

const NotFound = () => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ height: '100%' }}
      >
        <Box sx={{ width: '300px' }}>
          <ReactLogo />
        </Box>
        <Typography fontSize={'1.3rem'} fontWeight={600}>
          Đường link này không tồn tại !
        </Typography>
      </Stack>
    </Container>
  )
}

export default NotFound
