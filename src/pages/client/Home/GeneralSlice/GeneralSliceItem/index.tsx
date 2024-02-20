/* eslint-disable indent */
import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import path from '@/routes/path'
import Image from '@/components/Image'
import colorCode from '@/configs/color'
import { SlideGeneral, SpecialistProps } from '@/interface'
import swal from '@/utils/swal'

interface IProps {
  data: SpecialistProps
  type: SlideGeneral
}

const GeneralSliceItem = ({ data, type }: IProps) => {
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => {
        type === 'Specialist'
          ? navigate(
              `/${path.client.specialist.replace(
                ':id',
                String(data.id)
              )}`
            )
          : swal.warning('Trang này chưa hoàn thiện.')
      }}
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
          src={data.image}
          alt={data.name}
          fill
          objectFit="contain"
        />
      </Box>
      <Stack
        justifyContent="center"
        sx={{ height: '100px' }}
      >
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
          {data.name}
        </Typography>
      </Stack>
    </Box>
  )
}

export default GeneralSliceItem
