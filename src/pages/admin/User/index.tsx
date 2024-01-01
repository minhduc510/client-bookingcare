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
  MenuItem
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
import { useState } from 'react'
import swal from '@/utils/swal'
import ModelAdd from './ModelAdd'
import ModelLock from './ModelLock'
import ModelInfo from './ModelInfo'
import ModelUpdate from './ModelUpdate'

export default function User() {
  const [openModelAdd, setOpenModelAdd] = useState(false)
  const [openModelLock, setOpenModelLock] = useState(false)
  const [openModelInfo, setOpenModelInfo] = useState(false)
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
        <InputSearch />
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
                value={10}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Tất cả</MenuItem>
                <MenuItem value={20}>Kích hoạt</MenuItem>
                <MenuItem value={30}>Đã khóa</MenuItem>
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
                  Tình trạng
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
                <TableCell align="center">
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
                    <FaRegCircleCheck size={18} />
                    <span>Kích hoạt</span>
                  </Box>
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
                      onClick={() => setOpenModelInfo(true)}
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
                <TableCell align="center">
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
                    <FaRegCircleXmark size={18} />
                    <span>Đã khóa</span>
                  </Box>
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
                      onClick={() => setOpenModelInfo(true)}
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
      <ModelInfo
        open={openModelInfo}
        setOpen={setOpenModelInfo}
      />
    </>
  )
}
