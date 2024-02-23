import { Fragment, useRef, useState } from 'react'
import Slider from 'react-slick'
import {
  Box,
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material'

import colorCode from '@/configs/color'
import { SlideGeneral, SpecialistProps } from '@/interface'
import GeneralSliceItem from './GeneralSliceItem'
import { IoIosArrowBack, IoIosArrowForward } from '@/icons'
import { SLIDE_TO_SHOW } from '@/utils/constant'

interface IProps {
  name: string
  data: SpecialistProps[]
  type: SlideGeneral
}

const GeneralSlice = ({ name, data, type }: IProps) => {
  const slider = useRef<Slider>(null)
  const [hiddenNextBtn, setHiddenNextBtn] = useState(true)
  const [hiddenPrevBtn, setHiddenPrevBtn] = useState(false)
  const handleSliderNext = () => {
    slider?.current?.slickNext()
  }
  const handleSliderPrev = () => {
    slider?.current?.slickPrev()
  }

  const settings = {
    dots: false,
    speed: 1000,
    infinite: false,
    slidesToShow:
      data.length > SLIDE_TO_SHOW.pc
        ? SLIDE_TO_SHOW.pc
        : data.length,
    slidesToScroll: SLIDE_TO_SHOW.pc,
    beforeChange: (_before: number, after: number) => {
      if (after > 0) {
        setHiddenPrevBtn(true)
      } else {
        setHiddenPrevBtn(false)
      }
      if (
        Math.ceil(after / SLIDE_TO_SHOW.pc) >=
        Math.floor(data.length / SLIDE_TO_SHOW.pc)
      ) {
        setHiddenNextBtn(false)
      } else {
        setHiddenNextBtn(true)
      }
    },
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            data.length > SLIDE_TO_SHOW.pc
              ? SLIDE_TO_SHOW.mobile
              : data.length,
          slidesToScroll: SLIDE_TO_SHOW.mobile,
          beforeChange: (
            _before: number,
            after: number
          ) => {
            if (after > 0) {
              setHiddenPrevBtn(true)
            } else {
              setHiddenPrevBtn(false)
            }
            if (
              Math.ceil(after / SLIDE_TO_SHOW.mobile) >=
              Math.floor(data.length / SLIDE_TO_SHOW.mobile)
            ) {
              setHiddenNextBtn(false)
            } else {
              setHiddenNextBtn(true)
            }
          }
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
          {name}
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
        {data.length > 0 ? (
          <Slider ref={slider} {...settings}>
            {data.map((item) => (
              <Fragment key={item.id}>
                <GeneralSliceItem data={item} type={type} />
              </Fragment>
            ))}
          </Slider>
        ) : (
          <Typography
            textAlign="center"
            fontStyle="italic"
            fontWeight={600}
          >
            Chưa có dữ liệu
          </Typography>
        )}
        {data.length >
          (window.innerWidth > 600
            ? SLIDE_TO_SHOW.pc
            : SLIDE_TO_SHOW.mobile) && (
          <>
            {hiddenPrevBtn && (
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
                  position: 'absolute',
                  left: -15,
                  top: '50%',
                  cursor: 'pointer',
                  transform: 'translateY(-50%)',
                  border: '1px solid',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? '#fff'
                        : 'primary.dark'
                    }`,
                  boxShadow:
                    'rgba(0, 255, 187, 0.25) 0px 3px 8px'
                }}
              >
                <IoIosArrowBack />
              </Box>
            )}
            {hiddenNextBtn && (
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
                  position: 'absolute',
                  right: -15,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: '1px solid',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  cursor: 'pointer',
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? '#fff'
                        : 'primary.dark'
                    }`,
                  boxShadow:
                    'rgba(0, 255, 187, 0.25) 0px 3px 8px'
                }}
              >
                <IoIosArrowForward />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  )
}

export default GeneralSlice
