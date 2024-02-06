import { Box, Typography } from '@mui/material'
import Image from '@/components/Image'
import { DoctorOutstandingProps } from '@/interface'
import { Link } from 'react-router-dom'
import path from '@/routes/path'

interface IProps {
  user: DoctorOutstandingProps
}

const DoctorSliceItem = ({ user }: IProps) => {
  return (
    <Link
      to={`/${path.client.doctorDetail.split('/')[0]}/${
        user.id
      }`}
    >
      <Box
        sx={{
          borderRadius: 3,
          width: '100%'
        }}
      >
        <Box
          sx={{
            width: '100%',

            height: {
              xs: '100px',
              sm: '200px'
            },
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              borderRadius: '50%',
              marginX: 'auto',
              width: {
                xs: '100px',
                sm: '200px'
              },
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: (theme) =>
                `${
                  theme.palette.mode === 'dark'
                    ? theme.boxShadowDark
                    : theme.boxShadowLight
                }`
            }}
          >
            <Image
              src={user.avatar as string}
              alt={''}
              fill
              objectFit="cover"
            />
          </Box>
        </Box>
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
          {user?.positions && user?.positions.length
            ? user?.positions?.join(', ')
            : ''}{' '}
          {user?.fullName}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: '0.8rem',
              sm: '1.1rem'
            },
            textAlign: 'center'
          }}
        >
          Sức khỏe tâm thần,Tư vấn, trị liệu Tâm lý
        </Typography>
      </Box>
    </Link>
  )
}

export default DoctorSliceItem
