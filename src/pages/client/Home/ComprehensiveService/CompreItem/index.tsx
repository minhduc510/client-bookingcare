import { Box, Stack, Typography } from '@mui/material'

import Image from '@/components/Image'
import colorCode from '@/configs/color'

import BackGroundImage from '@/assets/images/background_grid_item.png'

const CompreItem = () => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={{ xs: 2, md: 10 }}
      sx={{
        width: { xs: '47%', sm: '47%', md: '48%' },
        border: `1px solid ${colorCode.grey300}`,
        borderRadius: 5,
        p: 2,
        backgroundImage: (theme) =>
          `${
            theme.palette.mode === 'dark'
              ? 'none'
              : `url(
          ${BackGroundImage}
          )`
          }`,
        backgroundSize: 'cover'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: {
            xs: '50px',
            sm: '50px'
          },
          height: {
            xs: '30px',
            sm: '50px'
          }
        }}
      >
        {' '}
        <Image
          src={
            'https://cdn.bookingcare.vn/fo/w128/2023/06/07/161905-iconkham-chuyen-khoa.png'
          }
          alt={''}
          fill
          objectFit="contain"
        />
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: '1rem',
            sm: '1.5rem'
          }
        }}
      >
        Dịch vụ toàn diện
      </Typography>
    </Stack>
  )
}

export default CompreItem
