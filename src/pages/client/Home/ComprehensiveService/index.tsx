import { Container, Stack, Typography } from '@mui/material'

import CompreItem from './CompreItem'

const ComprehensiveService = () => {
  return (
    <Container sx={{ marginY: 3 }}>
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
      <Stack
        direction="row"
        sx={{
          marginY: {
            xs: 3,
            sm: 5
          }
        }}
        flexWrap={'wrap'}
        gap={{
          xs: 2,
          sm: 5
        }}
      >
        <CompreItem
          name={'Khám chuyên khoa'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/06/07/161905-iconkham-chuyen-khoa.png'
          }
        />
        <CompreItem
          name={'Khám từ xa'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/06/07/161817-iconkham-tu-xa.png'
          }
        />
        <CompreItem
          name={'Khám tổng quát'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/06/07/161350-iconkham-tong-quan.png'
          }
        />
        <CompreItem
          name={'Xét nghiệm y học'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/06/07/161340-iconxet-nghiem-y-hoc.png'
          }
        />
        <CompreItem
          name={'Sức khỏe tinh thần'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/06/07/161403-iconsuc-khoe-tinh-than.png'
          }
        />
        <CompreItem
          name={'Khám nha khoa'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/06/07/161410-iconkham-nha-khoa.png'
          }
        />
        <CompreItem
          name={'Gói phẫu thuật'}
          image={
            '	https://cdn.bookingcare.vn/fo/w96/2023/06/07/161421-icongoi-phau-thuat.png'
          }
        />
        <CompreItem
          name={'Sống khỏe tiểu đường'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/09/20/145257-thiet-ke-chua-co-ten-3.png'
          }
        />
        <CompreItem
          name={'Bài test sức khỏe'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/06/07/161442-iconbai-test-suc-khoe2.png'
          }
        />
        <CompreItem
          name={'Y tế sức khỏe'}
          image={
            'https://cdn.bookingcare.vn/fo/w96/2023/07/06/163421-153524-near-home-01.png'
          }
        />
      </Stack>
    </Container>
  )
}

export default ComprehensiveService
