import {
  Box,
  Grid,
  Stack,
  Button,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import swal from '@/utils/swal'
import path from '@/routes/path'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import { ISpecialistProps } from '@/interface'
import { apiHasToken, apiNoToken } from '@/api'

const Specialist = () => {
  const [loading, setLoading] = useState(true)
  const [specialists, setSpecialists] = useState<
    ISpecialistProps[]
  >([])

  const handleRemoveSpecialist = (id: number) => {
    swal
      .confirm('Bank có chắc chắn muốn xóa?')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          setLoading(true)
          const { error, message } =
            await apiHasToken.deleteSpecialist(id)
          if (!error) {
            swal.success('Đã xóa thành công')
          } else {
            swal.error(message)
          }
          setLoading(false)
        }
      })
  }

  useEffect(() => {
    const callApi = async () => {
      const { error, data } =
        await apiNoToken.getAllSpecialist()
      if (!error) {
        setSpecialists(data)
      }
      setLoading(false)
    }
    callApi()
  }, [loading])

  return (
    <Box>
      <Typography fontSize="1.2rem" fontWeight="600">
        Danh sách các chuyên khoa
      </Typography>
      <Stack alignItems="flex-end">
        <Link to={`/${path.admin.specialistCreate}`}>
          <Button
            variant="contained"
            sx={{ color: '#fff' }}
          >
            Thêm
          </Button>
        </Link>
      </Stack>
      {loading ? (
        <Loading open={loading} />
      ) : specialists.length > 0 ? (
        <>
          <Grid container spacing={3} marginY={0}>
            {specialists.map((item, index) => (
              <Grid item xs={4} key={item.id}>
                <Box
                  padding={2}
                  sx={{
                    boxShadow: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? theme.boxShadowDark
                          : theme.boxShadowLight
                      }`,
                    borderRadius: 2
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography fontWeight="600">
                      {index + 1}. {item.name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button color="info">
                        <Link
                          to={`/${path.admin.specialistUpdate.replace(
                            ':id',
                            `${item.id}`
                          )}`}
                        >
                          Sửa
                        </Link>
                      </Button>
                      <Button
                        color="error"
                        onClick={() =>
                          handleRemoveSpecialist(item.id)
                        }
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </Stack>
                  <Box>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '250px',
                        height: '250px',
                        borderRadius: 3,
                        overflow: 'hidden',
                        marginX: 'auto',
                        marginY: 2,
                        boxShadow: (theme) =>
                          `${
                            theme.palette.mode === 'dark'
                              ? theme.boxShadowDark
                              : theme.boxShadowLight
                          }`
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={''}
                        objectFit="cover"
                        fill
                      />
                    </Box>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: item.html
                      }}
                    ></Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography
          sx={{
            fontStyle: 'italic',
            fontSize: '1.2rem',
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          Không có chuyên khóa nào!
        </Typography>
      )}
    </Box>
  )
}

export default Specialist
