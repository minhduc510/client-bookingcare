/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from 'swr'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Table,
  Paper,
  Button,
  Select,
  Tooltip,
  TableRow,
  MenuItem,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  Pagination,
  InputLabel,
  FormControl,
  TableContainer,
  SelectChangeEvent,
  Switch
} from '@mui/material'

import {
  FaPen,
  FaInfo,
  IoPersonAdd,
  RiDeleteBin4Fill
} from '@/icons'

import swal from '@/utils/swal'
import path from '@/routes/path'
import ModelLock from './ModelLock'
import Loading from '@/components/Loading'
import InputSearch from '@/components/InputSearch'

import { apiHasToken, linkApi } from '@/api'
import {
  ListActiveProps,
  ParamsSearchUserProps,
  UserProps
} from '@/interface'

export default function Doctor() {
  const [openModelLock, setOpenModelLock] = useState(false)
  const [status, setStatus] = useState<number>(999)
  const [searchValue, setSearchValue] = useState('')
  const [keyword, setKeyWord] = useState('')
  const [page, setPage] = useState(1)
  const [disableSaveActiveBtn, setDisableSaveActiveBtn] =
    useState(true)
  const [listActive, setListActive] = useState<
    ListActiveProps[]
  >([])
  const [dataUser, setDataUser] = useState<UserProps[]>([])

  const handleDeleteUser = (id: number) => {
    swal
      .confirm('Bạn có chắc chắn muốn xóa?')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error, message } =
            await apiHasToken.deleteUser(id)
          if (!error) {
            swal
              .success('Xóa user thành công!')
              .then(() => {
                mutate(linkApi.getAllUserDoctors)
              })
          } else {
            swal.error(message)
          }
        }
      })
  }

  const handleChangeSearch = (value: string) => {
    setSearchValue(value)
    debounceDropDown(value)
  }

  const handleChangeStatus = (
    event: SelectChangeEvent<number>
  ) => {
    setStatus(Number(event.target.value))
  }

  const handleActiveUser = (id: number) => {
    setListActive((prev) => {
      const clonePrev = [...prev]
      const findItem = clonePrev.find(
        (item) => item.id === id
      )
      if (findItem) {
        findItem.checked = Number(!findItem.checked) as
          | 0
          | 1
      }
      return clonePrev
    })
  }

  const saveActiveList = async () => {
    swal
      .confirm('Bạn có chắc chắn muốn lưu?')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error, message } =
            await apiHasToken.updateActive(listActive)
          if (!error) {
            swal.success('Lưu thành công')
          } else {
            swal.error(message)
          }
        }
      })
  }

  const debounceDropDown = useCallback(
    debounce((value) => setKeyWord(value), 1500),
    []
  )

  const querySearch: ParamsSearchUserProps = {
    page
  }
  if (keyword) {
    querySearch.keyword = keyword
  }
  if (status !== 999) {
    querySearch.status = status
  }
  const { data, isLoading, mutate } = useSWR(
    [linkApi.getAllUserDoctors, querySearch],
    apiHasToken.getAllUser(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    mutate()
  }, [])

  useEffect(() => {
    if (data && data.data?.users) {
      const listActiveDefault = data.data?.users.map(
        (item: UserProps) => ({
          id: item.id,
          checked: item.status
        })
      )
      if (
        JSON.stringify(listActive) ===
        JSON.stringify(listActiveDefault)
      ) {
        setDisableSaveActiveBtn(true)
      } else {
        setDisableSaveActiveBtn(false)
      }
    }
  }, [JSON.stringify(listActive)])

  useEffect(() => {
    if (data && !isLoading) {
      setDataUser(data.data?.users)
      if (data.data?.users.length) {
        setListActive(
          data.data?.users.map((item: UserProps) => ({
            id: item.id,
            checked: item.status
          }))
        )
      }
    }
  }, [isLoading, JSON.stringify(data?.data?.users)])
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: {
            xs: '1.2rem',
            sm: '1.5rem'
          }
        }}
      >
        Danh sách bác sĩ
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: {
            xs: 1,
            sm: 0
          },
          alignItems: {
            xs: 'normal',
            sm: 'center'
          },
          flexDirection: {
            xs: 'column-reverse',
            sm: 'row'
          }
        }}
      >
        <InputSearch
          value={searchValue}
          onChange={handleChangeSearch}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            justifyContent: {
              xs: 'space-between',
              sm: 'normal'
            }
          }}
        >
          <Button
            variant="contained"
            color="warning"
            sx={{ color: 'white' }}
            disabled={disableSaveActiveBtn}
            onClick={saveActiveList}
          >
            Lưu
          </Button>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Tình trạng
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Tình trạng"
                onChange={handleChangeStatus}
              >
                <MenuItem value={999}>Tất cả</MenuItem>
                <MenuItem value={1}>Kích hoạt</MenuItem>
                <MenuItem value={0}>
                  Chưa kích hoạt
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Link to={`/${path.admin.doctorCreate}`}>
            <Button
              variant="contained"
              sx={{ color: 'white' }}
              startIcon={<IoPersonAdd />}
            >
              Thêm
            </Button>
          </Link>
        </Box>
      </Box>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          maxWidth: {
            xs: 'calc(100vw - 15px)',
            md: '100%'
          },
          boxShadow: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? theme.boxShadowDark
                : theme.boxShadowLight
            }`
        }}
      >
        {isLoading ? (
          <Loading open={isLoading} />
        ) : (
          <>
            {' '}
            <TableContainer
              sx={{
                maxHeight: 600
              }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{
                  width: {
                    xs: '1000px',
                    md: '100%'
                  },
                  overflowX: 'auto'
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={'17%'}>
                      Họ tên
                    </TableCell>
                    <TableCell align="center" width={'5%'}>
                      Giới tính
                    </TableCell>
                    <TableCell align="center" width={'26%'}>
                      Địa chỉ
                    </TableCell>
                    <TableCell align="center" width={'12%'}>
                      Email
                    </TableCell>
                    <TableCell align="center" width={'10%'}>
                      Số điện thoại
                    </TableCell>
                    <TableCell align="center" width={'10%'}>
                      Tình trạng
                    </TableCell>
                    <TableCell align="center" width={'10%'}>
                      Lựa chọn
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataUser?.length > 0 ? (
                    dataUser.map(
                      (user: UserProps, index) => (
                        <TableRow hover key={user.id}>
                          <TableCell align="center">
                            {user.fullName}
                          </TableCell>
                          <TableCell align="center">
                            {user.gender ? 'Nữ' : 'Nam'}
                          </TableCell>
                          <TableCell align="center">
                            {user.address}
                          </TableCell>
                          <TableCell align="center">
                            {user.email}
                          </TableCell>
                          <TableCell align="center">
                            {user.phone}
                          </TableCell>
                          <TableCell align="center">
                            <Switch
                              onChange={() =>
                                handleActiveUser(
                                  Number(user.id)
                                )
                              }
                              checked={Boolean(
                                listActive[index].checked
                              )}
                            />
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1,
                              padding: 3,
                              flexWrap: 'wrap',
                              cursor: 'pointer'
                            }}
                          >
                            <Tooltip title="xem chi tiết">
                              <Link to={`${user.id}`}>
                                <Box
                                  sx={{
                                    bgcolor: 'blue',
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent:
                                      'center',
                                    color: 'white',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <FaInfo size={15} />
                                </Box>
                              </Link>
                            </Tooltip>
                            <Tooltip title="cập nhật">
                              <Link
                                to={`/${path.admin.doctorUpdate.replace(
                                  ':id',
                                  ''
                                )}${user.id}`}
                              >
                                <Box
                                  sx={{
                                    bgcolor: 'green',
                                    width: 25,
                                    height: 25,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent:
                                      'center',
                                    color: 'white'
                                  }}
                                >
                                  <FaPen size={13} />
                                </Box>
                              </Link>
                            </Tooltip>
                            <Tooltip title="Xóa tài khoản">
                              <Box
                                onClick={() =>
                                  handleDeleteUser(
                                    Number(user.id)
                                  )
                                }
                                sx={{
                                  bgcolor: 'red',
                                  width: 25,
                                  height: 25,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  cursor: 'pointer'
                                }}
                              >
                                <RiDeleteBin4Fill
                                  size={15}
                                />
                              </Box>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{ textAlign: 'center' }}
                      >
                        <h4>Không có dữ liệu!</h4>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              py={2}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {data && data.data?.users?.length > 0 && (
                <Pagination
                  count={data?.data.totalPage}
                  color="primary"
                  page={page}
                  onChange={(_, page) => {
                    if (page !== null) {
                      setPage(page)
                    }
                  }}
                />
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Model */}
      {openModelLock && (
        <ModelLock
          open={openModelLock}
          setOpen={setOpenModelLock}
        />
      )}
    </>
  )
}
