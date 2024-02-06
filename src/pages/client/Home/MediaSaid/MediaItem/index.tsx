import { Box } from '@mui/material'
import Image from '@/components/Image'
import theme from '@/configs/theme'

const MediaItem = () => {
  return (
    <Box
      sx={{
        height: '65px',
        [theme.breakpoints.up('xs')]: {
          bgcolor: 'transparent',
          width: '21%'
        },
        [theme.breakpoints.up('sm')]: {
          width: '23%'
        },
        [theme.breakpoints.up('md')]: {
          width: '48%',
          bgcolor: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? 'primary.dark'
                : '#fff'
            }`
        },
        borderRadius: 3,
        paddingY: 1.3
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {' '}
        <Image
          src={
            'https://bookingcare.vn/assets/truyenthong/vtv1.png'
          }
          alt={''}
          fill
          objectFit="contain"
        />
      </Box>
    </Box>
  )
}

export default MediaItem
