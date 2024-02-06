import { Container, Stack, Typography } from '@mui/material'
import CompreItem from './CompreItem'

const ComprehensiveService = () => {
  return (
    <Container sx={{ marginY: 3 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: '1.3rem',
            sm: '1.5rem'
          }
        }}
      >
        Dịch vụ toàn diện
      </Typography>
      <Stack
        direction="row"
        sx={{
          marginY: {
            xs: 3,
            sm: 5
          }
        }}
        flexWrap={'wrap'}
        gap={{
          xs: 2,
          sm: 5
        }}
      >
        <CompreItem />
        <CompreItem />
        <CompreItem />
        <CompreItem />
        <CompreItem />
      </Stack>
    </Container>
  )
}

export default ComprehensiveService
