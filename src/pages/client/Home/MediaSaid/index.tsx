import {
  Box,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material'

import MediaItem from './MediaItem'
import BackgroundImage from '@/assets/images/background5.png'

const MediaSaid = () => {
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
      {' '}
      <Container>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            fontSize: {
              xs: '1.3rem',
              sm: '1.7rem'
            }
          }}
        >
          Truyền thông nói về BookingCare
        </Typography>
        <Grid
          container
          marginTop={{ xs: 2, md: 0 }}
          spacing={{ xs: 2, md: 5 }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 5,
                overflow: 'hidden',
                height: '100%',
                minHeight: { xs: '200px', sm: '340px' }
              }}
            >
              <iframe
                height="100%"
                width="100%"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              direction={'row'}
              flexWrap={'wrap'}
              alignItems={'center'}
              columnGap={2}
              rowGap={{ xs: 0, sm: 1, md: 3 }}
            >
              <MediaItem />
              <MediaItem />
              <MediaItem />
              <MediaItem />
              <MediaItem />
              <MediaItem />
              <MediaItem />
              <MediaItem />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default MediaSaid
