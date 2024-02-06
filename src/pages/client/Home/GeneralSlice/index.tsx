import Slider from 'react-slick'
import { useRef } from 'react'
import {
  Box,
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material'

import colorCode from '@/configs/color'
import GeneralSliceItem from './GeneralSliceItem'
import { IoIosArrowBack, IoIosArrowForward } from '@/icons'

const GeneralSlice = () => {
  const slider = useRef<Slider>(null)
  const handleSliderNext = () => {
    slider?.current?.slickNext()
  }
  const handleSliderPrev = () => {
    slider?.current?.slickPrev()
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={'center'}
      >
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
        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) =>
              `${
                theme.palette.mode === 'dark'
                  ? 'primary.main'
                  : colorCode.cyan100
              }`,
            color: colorCode.cyan700,
            fontSize: {
              xs: '0.9rem',
              sm: '1.3rem'
            },
            borderRadius: 4,
            fontWeight: 600,
            ' &:hover': {
              bgcolor: 'primary.main'
            }
          }}
        >
          Xem thêm
        </Button>
      </Stack>
      <Box
        sx={{
          marginY: {
            xs: 3,
            sm: 5
          },
          position: 'relative',
          '.slick-list': {
            margin: '0 -5px'
          },
          '.slick-slide': {
            padding: {
              xs: '0 5px',
              sm: '0 10px'
            }
          }
        }}
      >
        <Slider ref={slider} {...settings}>
          <GeneralSliceItem />
          <GeneralSliceItem />
          <GeneralSliceItem />
          <GeneralSliceItem />
          <GeneralSliceItem />
        </Slider>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: 'absolute',
            right: -15,
            left: -15,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <Box
            onClick={handleSliderPrev}
            sx={{
              width: {
                xs: '30px',
                sm: '40px'
              },
              height: {
                xs: '30px',
                sm: '40px'
              },
              border: '1px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              color: 'primary.dark',
              boxShadow:
                'rgba(0, 255, 187, 0.25) 0px 3px 8px'
            }}
          >
            <IoIosArrowBack />
          </Box>
          <Box
            onClick={handleSliderNext}
            sx={{
              width: {
                xs: '30px',
                sm: '40px'
              },
              height: {
                xs: '30px',
                sm: '40px'
              },
              border: '1px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              color: 'primary.dark',
              boxShadow:
                'rgba(0, 255, 187, 0.25) 0px 3px 8px'
            }}
          >
            <IoIosArrowForward />
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default GeneralSlice
