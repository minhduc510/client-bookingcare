import {
  Box,
  Container,
  Stack,
  FormControl,
  Button,
  Typography
} from '@mui/material'

import ReactLogo from '@/assets/svg/logo.svg?react'
import InputText from '@/components/InputText'
import Options from '@/components/Options'

const Login = () => {
  return (
    <>
      {' '}
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
          <Box
            sx={{
              width: '500px',
              p: 2,
              borderRadius: 1,
              boxShadow: (theme) =>
                `${
                  theme.palette.mode === 'dark'
                    ? theme.boxShadowDark
                    : theme.boxShadowLight
                }`
            }}
          >
            <FormControl sx={{ width: '100%' }}>
              <h2>Đăng nhập</h2>
              <Box sx={{ marginTop: 3 }}>
                <InputText label="Email" name="email" />
              </Box>
              <Box sx={{ marginTop: 3 }}>
                <InputText
                  label="Password"
                  name="password"
                  type="password"
                />
              </Box>
              <Button
                variant="contained"
                sx={{ marginTop: 3, color: 'white' }}
              >
                Đăng nhập
              </Button>
            </FormControl>
            <Stack
              direction="row"
              justifyContent="end"
              sx={{ marginTop: 2 }}
            >
              <Typography
                sx={{
                  ':hover': {
                    color: 'primary.main',
                    cursor: 'pointer'
                  }
                }}
              >
                Quên mật khẩu?
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Options />
    </>
  )
}

export default Login
