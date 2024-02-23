/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from 'swr'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material'

import colorCode from '@/configs/color'
import DoctorSliceItem from './DoctorSliceItem'
import { SLIDE_TO_SHOW } from '@/utils/constant'
import BackgroundImage from '@/assets/images/background5.png'
import { apiNoToken, linkApi } from '@/api'
import { IoIosArrowBack, IoIosArrowForward } from '@/icons'
import { DoctorOutstandingProps } from '@/interface'

const DoctorSlice = () => {
  const slider = useRef<Slider>(null)
  const [lengthSlideItem, setLengthSlideItem] = useState(0)
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
      lengthSlideItem > SLIDE_TO_SHOW.pc
        ? SLIDE_TO_SHOW.pc
        : lengthSlideItem,
    slidesToScroll: SLIDE_TO_SHOW.pc,
    beforeChange: (_before: number, after: number) => {
      if (after > 0) {
        setHiddenPrevBtn(true)
      } else {
        setHiddenPrevBtn(false)
      }
      if (
        Math.ceil(after / SLIDE_TO_SHOW.pc) >=
        Math.floor(lengthSlideItem / SLIDE_TO_SHOW.pc)
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
            lengthSlideItem > SLIDE_TO_SHOW.mobile
              ? SLIDE_TO_SHOW.mobile
              : lengthSlideItem,
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
              Math.floor(
                lengthSlideItem / SLIDE_TO_SHOW.mobile
              )
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
  const { data, isLoading } = useSWR(
    linkApi.getOutstandingDoctor,
    apiNoToken.getOutstandingDoctor(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (data) {
      setLengthSlideItem(data.users.length)
    }
  }, [isLoading, JSON.stringify(data?.users)])

  return (
    <Box
      sx={{
        backgroundImage: (theme) =>
          `${
            theme.palette.mode === 'dark'
              ? 'none'
              : `url(
        ${BackgroundImage}
        )`
          }`,
        bgcolor: (theme) =>
          `${
            theme.palette.mode === 'dark'
              ? 'primary.main'
              : 'none'
          }`,
        paddingY: 5
      }}
    >
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
            Bác sĩ nổi bật
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
          {data && lengthSlideItem > 0 ? (
            <Slider ref={slider} {...settings}>
              {data.users.map(
                (
                  item: DoctorOutstandingProps,
                  index: number
                ) => (
                  <DoctorSliceItem
                    user={item}
                    key={index}
                  />
                )
              )}
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

          {lengthSlideItem >
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
    </Box>
  )
}

export default DoctorSlice
