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
  TableContainer
} from '@mui/material'
import {
  FaPen,
  FaLock,
  FaInfo,
  IoPersonAdd,
  RiDeleteBin4Fill
} from '@/icons'

import InputSearch from '@/components/InputSearch'
import { useState } from 'react'
import swal from '@/utils/swal'
import ModelAdd from './ModelAdd'
import ModelLock from './ModelLock'
import ModelUpdate from './ModelUpdate'

export default function User() {
  const [openModelAdd, setOpenModelAdd] = useState(false)
  const [openModelLock, setOpenModelLock] = useState(false)
  const [openModelUpdate, setOpenModelUpdate] =
    useState(false)

  const handleDeleteUser = () => {
    swal.confirm('Bạn có chắc chắn muốn xóa?')
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <InputSearch />
        <Button
          onClick={() => setOpenModelAdd(true)}
          variant="contained"
          sx={{ color: 'white' }}
          startIcon={<IoPersonAdd />}
        >
          Thêm
        </Button>
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
                xs: '800px',
                md: '100%'
              },
              overflowX: 'auto'
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Họ tên</TableCell>
                <TableCell align="center">
                  Giới tính
                </TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">
                  Số điện thoại
                </TableCell>
                <TableCell align="center">
                  Lựa chọn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
                      onClick={() =>
                        setOpenModelUpdate(true)
                      }
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
                      onClick={() => setOpenModelLock(true)}
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
                      onClick={handleDeleteUser}
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
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">
                  Trần Minh Đức
                </TableCell>
                <TableCell align="center">Nam</TableCell>
                <TableCell align="center">
                  minhduc@gmail.com
                </TableCell>
                <TableCell align="center">
                  0912649791
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Tooltip title="xem chi tiết">
                    <Box
                      sx={{
                        bgcolor: 'blue',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaInfo size={15} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="cập nhật">
                    <Box
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
                      sx={{
                        bgcolor: 'orange',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaLock size={13} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <Box
                      sx={{
                        bgcolor: 'red',
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <RiDeleteBin4Fill size={15} />
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          py={2}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Pagination count={5} color="primary" />
        </Box>
      </Paper>

      {/* Model */}
      <ModelAdd
        open={openModelAdd}
        setOpen={setOpenModelAdd}
      />
      <ModelLock
        open={openModelLock}
        setOpen={setOpenModelLock}
      />
      <ModelUpdate
        open={openModelUpdate}
        setOpen={setOpenModelUpdate}
      />
    </>
  )
}
