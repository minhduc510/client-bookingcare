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
              <MediaItem
                image="https://bookingcare.vn/assets/truyenthong/vtv1.png"
                link="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
              />
              <MediaItem
                image="https://bookingcare.vn/assets/truyenthong/ictnews.png"
                link="https://vietnamnet.vn/thong-tin-truyen-thong"
              />
              <MediaItem
                image="https://bookingcare.vn/assets/truyenthong/vnexpress.png"
                link="https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
              />
              <MediaItem
                image="https://cdn.bookingcare.vn/fo/w384/2023/11/01/165432-vtcnewslogosvg.png"
                link="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html"
              />
              <MediaItem
                image="https://bookingcare.vn/assets/truyenthong/cuc-cong-nghe-thong-tin-bo-y-te-2.png"
                link="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
              />
              <MediaItem
                image="https://bookingcare.vn/assets/truyenthong/infonet.png"
                link="https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html"
              />
              <MediaItem
                image="https://bookingcare.vn/assets/truyenthong/vtv1.png"
                link="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
              />
              <MediaItem
                image="https://cdn.bookingcare.vn/fo/w384/2023/11/02/110757-dantrilogo.png"
                link="https://dantri.com.vn/nhan-tai-dat-viet/san-pham-nen-tang-dat-kham-booking-care-201908201625624751.htm"
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default MediaSaid
