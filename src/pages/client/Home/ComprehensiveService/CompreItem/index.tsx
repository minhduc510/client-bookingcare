import { Box, Stack, Typography } from '@mui/material'

import swal from '@/utils/swal'
import Image from '@/components/Image'
import colorCode from '@/configs/color'
import BackGroundImage from '@/assets/images/background_grid_item.png'

interface IProps {
  name: string
  image: string
}

const CompreItem = ({ name, image }: IProps) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={{ xs: 2, md: 10 }}
      onClick={() => {
        swal.warning(
          'Chức năng này chưa hoàn thiện, mong bạn thông cảm :(('
        )
      }}
      sx={{
        width: { xs: '47%', sm: '47%', md: '48%' },
        border: `1px solid ${colorCode.grey300}`,
        borderRadius: 5,
        p: 2,
        cursor: 'pointer',
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
        <Image
          src={image}
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
        {name}
      </Typography>
    </Stack>
  )
}

export default CompreItem
