import useSWR from 'swr'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Stack,
  Typography
} from '@mui/material'

import Image from '@/components/Image'
import Doctor from '@/components/Doctor'
import colorCode from '@/configs/color'
import { DoctorProps } from '@/interface'
import Loading from '@/components/Loading'
import { apiNoToken, linkApi } from '@/api'

const SpecialistDetail = () => {
  const { id } = useParams()
  const { data, isLoading } = useSWR(
    linkApi.getSpecialist(Number(id)),
    apiNoToken.getSpecialist(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return (
    <>
      {isLoading ? (
        <Loading open={isLoading} />
      ) : (
        <>
          <Box>
            <Container sx={{ position: 'relative' }}>
              <Box sx={{ paddingY: 3 }}>
                <Typography
                  sx={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {data.data.name}
                </Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: data.data.html
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  opacity: '0.3'
                }}
              >
                <Image
                  alt={`Background ${data.data.text}`}
                  src={data.data.image}
                  fill
                  objectFit="cover"
                />
              </Box>
            </Container>
          </Box>
          {data.data.doctor.length ? (
            <Box
              sx={{
                bgcolor: (theme) =>
                  `${
                    theme.palette.mode === 'dark'
                      ? 'primary.light'
                      : colorCode.grey200
                  }`
              }}
            >
              <Container sx={{ paddingY: 3 }}>
                <Stack spacing={3}>
                  {data.data.doctor.map(
                    (item: DoctorProps, index: number) => (
                      <Fragment key={index}>
                        <Doctor data={item} />
                      </Fragment>
                    )
                  )}
                </Stack>
              </Container>
            </Box>
          ) : (
            <Typography
              fontWeight={600}
              fontSize="1.3rem"
              fontStyle="italic"
              textAlign="center"
            >
              Khoa này không có bác sĩ nào!
            </Typography>
          )}

          <Box
            sx={{
              bgcolor: (theme) =>
                `${
                  theme.palette.mode === 'dark'
                    ? colorCode.green900
                    : colorCode.green600
                }`
            }}
          >
            <Container sx={{ paddingY: 2 }}>
              <Typography display="inline" color="#fff">
                Cần tìm hiểu thêm?
              </Typography>{' '}
              <Typography
                display="inline"
                color={colorCode.yellow600}
              >
                Xem câu hỏi thường gặp.
              </Typography>
            </Container>
          </Box>
        </>
      )}
    </>
  )
}

export default SpecialistDetail
