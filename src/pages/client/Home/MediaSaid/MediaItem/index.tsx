import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

import theme from '@/configs/theme'
import Image from '@/components/Image'

interface IProps {
  link: string
  image: string
}

const MediaItem = ({ image, link }: IProps) => {
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
      <Link to={link}>
        <Box
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              margin: 'auto',
              width: {
                xs: '100%',
                md: '60%'
              },
              height: '100%'
            }}
          >
            <Image
              src={image}
              alt={'news'}
              fill
              objectFit="contain"
            />
          </Box>
        </Box>
      </Link>
    </Box>
  )
}

export default MediaItem
