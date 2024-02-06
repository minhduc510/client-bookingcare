import colorCode from '@/configs/color'
import { Box, Typography } from '@mui/material'
import Image from '@/components/Image'

const GeneralSliceItem = () => {
  return (
    <Box
      sx={{
        border: `1px solid ${colorCode.grey300}`,
        borderRadius: 3,
        p: {
          xs: 0,
          sm: 1.5,
          md: 2.5
        },
        width: '100%'
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          width: '100%',
          position: 'relative',
          height: {
            xs: '100px',
            sm: '200px'
          },
          overflow: 'hidden'
        }}
      >
        <Image
          src={
            'https://cdn.bookingcare.vn/fo/w640/2023/12/26/101739-than-kinh.png'
          }
          alt={''}
          fill
          objectFit="cover"
        />
      </Box>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: '0.9rem',
            sm: '1.2rem'
          },
          textAlign: 'center',
          marginTop: {
            xs: 0,
            sm: 2
          },
          p: { xs: 0.8, sm: 0 }
        }}
      >
        Dịch vụ toàn diện
      </Typography>
    </Box>
  )
}

export default GeneralSliceItem
