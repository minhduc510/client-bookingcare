import Slider from 'react-slick'
import { makeStyles } from '@mui/styles'
import { Box, Theme, Container } from '@mui/material'

import Image from '@/components/Image'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: '#ffc10e'
  },
  dots: {
    [theme.breakpoints.up('xs')]: {
      bottom: '-15%'
    },
    [theme.breakpoints.up('sm')]: {
      bottom: '-10%'
    },
    '& li.slick-active button::before': {
      color: '#ffbf00',
      [theme.breakpoints.up('xs')]: {
        fontSize: '0.9rem'
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.2rem'
      }
    },
    '& li': {
      margin: '0 12px',
      '& button::before': {
        [theme.breakpoints.up('xs')]: {
          fontSize: '0.4rem'
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '0.6rem'
        },
        transition: 'all 0.07s ease',
        color: '#ffc10e',
        opacity: 0.3
      }
    }
  }
}))

const SlideTitle = () => {
  const classes = useStyles()
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: `slick-dots ${classes.dots}`
  }
  return (
    <Box
      sx={{
        position: 'relative',
        height: {
          xs: '180px',
          sm: '300px',
          md: '500px'
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: '50%',
          bgcolor: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? 'primary.main'
                : 'primary.light'
            }`,
          display: {
            xs: 'none',
            sm: 'block'
          }
        }}
      ></Box>
      <Container
        sx={{
          height: '90%',
          width: '100%',
          '& div': {
            height: '100%'
          }
        }}
      >
        <Slider {...settings}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
              borderRadius: { xs: 3, sm: 5 },
              overflow: 'hidden'
            }}
          >
            <Image
              src={
                'https://cdn.bookingcare.vn/fo/w1920/2023/11/02/134537-group-12314.png'
              }
              alt={''}
              objectFit="cover"
              fill
            />
          </Box>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
              borderRadius: { xs: 3, sm: 5 },
              overflow: 'hidden'
            }}
          >
            <Image
              src={
                'https://cdn.bookingcare.vn/fo/w1920/2023/11/02/134537-group-12314.png'
              }
              alt={''}
              objectFit="cover"
              fill
            />
          </Box>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
              borderRadius: { xs: 3, sm: 5 },
              overflow: 'hidden'
            }}
          >
            <Image
              src={
                'https://cdn.bookingcare.vn/fo/w1920/2023/11/02/134537-group-12314.png'
              }
              alt={''}
              objectFit="cover"
              fill
            />
          </Box>
        </Slider>
      </Container>
    </Box>
  )
}

export default SlideTitle
