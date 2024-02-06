import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  Paper,
  Slide,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'

import swal from '@/utils/swal'
import Loading from '@/components/Loading'
import { PositionProps } from '@/interface'
import { apiHasToken, linkApi } from '@/api'
import { passwordValidation } from '@/validation'

type Inputs = {
  name: string
}

const Position = () => {
  const [idUpdate, setIdUpdate] = useState<null | number>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  const [msgToast, setMsgToast] = useState('')
  const [isCreate, setIsCreate] = useState(false)

  const onCloseToast = () => {
    setOpenToast(false)
    setMsgToast('')
  }

  const onCloseInputCreate = () => {
    setIsCreate(false)
  }

  const handleDelete = (id: number) => {
    swal
      .confirm('Bạn có chắc chắn muốn xóa?')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error } =
            await apiHasToken.deletePosition(id)
          if (!error) {
            swal.success('Xóa thành công!').then(() => {
              mutate()
            })
          } else {
            swal.error('Xóa không thành công!')
          }
        }
      })
  }

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmitUpdate: SubmitHandler<Inputs> = async (
    data
  ) => {
    setLoading(true)
    if (idUpdate) {
      const { error } = await apiHasToken.updatePosition(
        idUpdate,
        data
      )
      if (!error) {
        mutate()
        setMsgToast('Cập nhật thành công')
        setOpenToast(true)
        setIdUpdate(null)
      } else {
        setMsgToast('Cập nhật không thành công')
        setOpenToast(true)
        setIdUpdate(null)
      }
    }
    setLoading(false)
  }
  const onSubmitCreate: SubmitHandler<Inputs> = async (
    data
  ) => {
    setLoading(true)
    const { error } = await apiHasToken.createPosition(data)
    if (!error) {
      mutate()
      setMsgToast('Tạo thành công')
      setOpenToast(true)
      setIsCreate(false)
    } else {
      setMsgToast('Tạo không thành công')
      setOpenToast(true)
      setIsCreate(false)
    }
    setLoading(false)
  }
  const { data, isLoading, mutate } = useSWR(
    linkApi.getAllPosition,
    apiHasToken.getAllPosition(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <>
      {loading && <Loading open={loading} />}
      <Snackbar
        key={Math.random()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={openToast}
        onClose={onCloseToast}
        message={msgToast}
        autoHideDuration={3000}
        ContentProps={{
          sx: {
            background:
              data && data.data.error ? 'red' : 'green',
            color: '#fff'
          }
        }}
        TransitionComponent={(props) => (
          <Slide {...props} direction="left" />
        )}
      />

      <Box>
        <Typography
          sx={{ fontWeight: 600, fontStyle: 'italic' }}
        >
          Chức vụ
        </Typography>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            setIsCreate(true)
            setIdUpdate(null)
            setValue('name', '')
            clearErrors('name')
          }}
          sx={{ marginY: 2 }}
        >
          Thêm
        </Button>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10%' }}>
                  STT
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ width: '25%' }}
                >
                  Tên vị trí
                </TableCell>
                <TableCell align="left">Lựa chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.data.length > 0 &&
                data.data.map(
                  (item: PositionProps, index: number) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        '&:last-child td, &:last-child th':
                          {
                            border: 0
                          }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">
                        {idUpdate === item.id ? (
                          <TextField
                            error={!!errors.name}
                            helperText={
                              errors.name
                                ? errors.name.message
                                : null
                            }
                            label="Tên"
                            variant="standard"
                            {...register(
                              'name',
                              passwordValidation
                            )}
                            sx={{
                              '& .MuiFormHelperText-root': {
                                fontSize: '0.8rem'
                              }
                            }}
                          />
                        ) : (
                          item.name
                        )}
                      </TableCell>
                      <TableCell>
                        {idUpdate === item.id ? (
                          <Stack
                            direction={'row'}
                            justifyContent={'flex-start'}
                          >
                            <Button
                              variant="text"
                              color="success"
                              onClick={handleSubmit(
                                onSubmitUpdate
                              )}
                            >
                              Lưu
                            </Button>
                            <Button
                              variant="text"
                              color="info"
                              onClick={() => {
                                setIdUpdate(null)
                                setValue('name', '')
                              }}
                            >
                              Bỏ qua
                            </Button>
                          </Stack>
                        ) : (
                          <Stack
                            direction={'row'}
                            justifyContent={'flex-start'}
                          >
                            <Button
                              variant="text"
                              color="success"
                              onClick={() => {
                                setIdUpdate(item.id)
                                setValue('name', item.name)
                                clearErrors('name')
                                onCloseInputCreate()
                              }}
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="text"
                              color="error"
                              onClick={() =>
                                handleDelete(item.id)
                              }
                            >
                              Xóa
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              {isCreate && (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{ textAlign: 'center' }}
                    component="th"
                    scope="row"
                  >
                    <TextField
                      error={!!errors.name}
                      helperText={
                        errors.name
                          ? errors.name.message
                          : null
                      }
                      label="Tên"
                      variant="standard"
                      {...register(
                        'name',
                        passwordValidation
                      )}
                      sx={{
                        '& .MuiFormHelperText-root': {
                          fontSize: '0.8rem'
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction={'row'}
                      justifyContent={'flex-start'}
                    >
                      <Button
                        variant="text"
                        color="success"
                        onClick={handleSubmit(
                          onSubmitCreate
                        )}
                      >
                        Lưu
                      </Button>
                      <Button
                        variant="text"
                        color="info"
                        onClick={onCloseInputCreate}
                      >
                        Bỏ qua
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default Position
