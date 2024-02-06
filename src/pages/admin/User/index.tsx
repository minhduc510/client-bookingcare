/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from 'swr'
import { debounce } from 'lodash'

import {
  Box,
  Table,
  Paper,
  Button,
  Tooltip,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Pagination,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography
} from '@mui/material'

import {
  FaPen,
  FaLock,
  FaInfo,
  IoPersonAdd,
  RiDeleteBin4Fill,
  FaRegCircleCheck,
  FaRegCircleXmark
} from '@/icons'

import InputSearch from '@/components/InputSearch'
import { useCallback, useState } from 'react'
import swal from '@/utils/swal'
import ModelAdd from './ModelAdd'
import ModelLock from './ModelLock'
import ModelInfo from './ModelInfo'
import ModelUpdate from './ModelUpdate'

import { apiHasToken, linkApi } from '@/api'
import Loading from '@/components/Loading'
import {
  ParamsSearchUserProps,
  UserProps
} from '@/interface'

export default function User() {
  const [openModelAdd, setOpenModelAdd] = useState(false)
  const [openModelLock, setOpenModelLock] = useState(false)
  const [openModelInfo, setOpenModelInfo] = useState(false)
  const [status, setStatus] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [keyword, setKeyWord] = useState('')
  const [page, setPage] = useState(1)
  const [userDetail, setUserDetail] =
    useState<UserProps | null>(null)
  const [openModelUpdate, setOpenModelUpdate] =
    useState(false)

  const handleDeleteUser = (id: number) => {
    swal
      .confirm('Bạn có chắc chắn muốn xóa?')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error } = await apiHasToken.deleteUser(id)
          if (!error) {
            swal
              .success('Xóa user thành công!')
              .then(() => {
                mutate(linkApi.getAllUserClients)
              })
          }
        }
      })
  }

  const handleCloseModelInfo = useCallback(() => {
    setOpenModelInfo(false)
    setTimeout(() => {
      setUserDetail(null)
    }, 500)
  }, [])

  const handleCloseModelAdd = useCallback(() => {
    setOpenModelAdd(false)
    setTimeout(() => {
      setSearchValue('')
    }, 500)
  }, [])

  const handleCloseModelUpdate = useCallback(
    (isSubmit: boolean = false) => {
      setOpenModelUpdate(false)
      setTimeout(() => {
        setUserDetail(null)
        isSubmit && mutate(querySearch)
      }, 500)
    },
    []
  )

  const handleChangeSearch = (value: string) => {
    setSearchValue(value)
    debounceDropDown(value)
  }

  const handleChangeStatus = (
    event: SelectChangeEvent<number>
  ) => {
    setStatus(Number(event.target.value))
  }

  const handleResetSearchAndKeyword = useCallback(() => {
    setSearchValue('')
    setKeyWord('')
  }, [])

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
  if (status) {
    querySearch.status = status
  }
  const { data, isLoading, mutate } = useSWR(
    [linkApi.getAllUserClients, querySearch],
    apiHasToken.getAllUser(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

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
        Danh sách người dùng
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
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Age"
                onChange={handleChangeStatus}
              >
                <MenuItem value={0}>Tất cả</MenuItem>
                <MenuItem value={1}>Kích hoạt</MenuItem>
                <MenuItem value={-1}>Đã khóa</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            onClick={() => setOpenModelAdd(true)}
            variant="contained"
            sx={{ color: 'white' }}
            startIcon={<IoPersonAdd />}
          >
            Thêm
          </Button>
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
            <TableContainer>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{
                  width: {
                    xs: '800px',
                    md: '100%'
                  },
                  overflowX: 'auto'
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      Họ tên
                    </TableCell>
                    <TableCell align="center">
                      Giới tính
                    </TableCell>
                    <TableCell align="center">
                      Địa chỉ
                    </TableCell>
                    <TableCell align="center">
                      Email
                    </TableCell>
                    <TableCell align="center">
                      Số điện thoại
                    </TableCell>
                    <TableCell align="center">
                      Tình trạng
                    </TableCell>
                    <TableCell align="center">
                      Lựa chọn
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data && data.data?.users.length > 0 ? (
                    data.data.users.map(
                      (user: UserProps) => (
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
                            {user.status === 1 ? (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 1,
                                  fontWeight: 600,
                                  fontStyle: 'italic',
                                  color: 'green'
                                }}
                              >
                                <FaRegCircleCheck
                                  size={18}
                                />
                                <span>Kích hoạt</span>
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 1,
                                  fontWeight: 600,
                                  fontStyle: 'italic',
                                  color: 'red'
                                }}
                              >
                                <FaRegCircleXmark
                                  size={18}
                                />
                                <span>Đã khóa</span>
                              </Box>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1,
                              flexWrap: 'wrap',
                              cursor: 'pointer'
                            }}
                          >
                            <Tooltip title="xem chi tiết">
                              <Box
                                onClick={() => {
                                  setUserDetail(user)
                                  setOpenModelInfo(true)
                                }}
                                sx={{
                                  bgcolor: 'blue',
                                  width: 24,
                                  height: 24,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  cursor: 'pointer'
                                }}
                              >
                                <FaInfo size={15} />
                              </Box>
                            </Tooltip>
                            <Tooltip title="cập nhật">
                              <Box
                                onClick={() => {
                                  setUserDetail(user)
                                  setOpenModelUpdate(true)
                                }}
                                sx={{
                                  bgcolor: 'green',
                                  width: 25,
                                  height: 25,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white'
                                }}
                              >
                                <FaPen size={13} />
                              </Box>
                            </Tooltip>
                            <Tooltip title="khóa tài khoản">
                              <Box
                                onClick={() =>
                                  setOpenModelLock(true)
                                }
                                sx={{
                                  bgcolor: 'orange',
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
                                <FaLock size={13} />
                              </Box>
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
                        <h4> Không có dữ liệu!</h4>
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
              {data && data.data?.users.length > 0 && (
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
      {openModelAdd && (
        <ModelAdd
          mutate={mutate}
          open={openModelAdd}
          closeModel={handleCloseModelAdd}
        />
      )}
      {openModelLock && (
        <ModelLock
          open={openModelLock}
          setOpen={setOpenModelLock}
        />
      )}

      {openModelUpdate && (
        <ModelUpdate
          user={userDetail as UserProps}
          open={openModelUpdate}
          closeModel={handleCloseModelUpdate}
          resetSearchAndKeyword={
            handleResetSearchAndKeyword
          }
        />
      )}
      {openModelInfo && (
        <ModelInfo
          user={userDetail}
          open={openModelInfo}
          closeModel={handleCloseModelInfo}
        />
      )}
    </>
  )
}
