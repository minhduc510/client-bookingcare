/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'

import colorCode from '@/configs/color'
import {
  DoctorProps,
  PositionProps,
  ScheduleDayBookProps,
  ScheduleDayProps
} from '@/interface'
import { useEffect, useState } from 'react'
import formatCurrency from '@/utils/formatCurrency'
import {
  FaRegCalendarAlt,
  TiArrowSortedDown
} from '@/icons'
import ModelBookSchedule from './ModelBookSchedule'

type Hour = {
  id: number
  content: string
}

interface IProps {
  data: DoctorProps
}

const Doctor = ({ data }: IProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = (hour: Hour) => {
    const day = listSchedule.find(
      (item) => item.id === dayActiveId
    )
    day &&
      setTime({
        hour_id: hour.id,
        day_id: day.id,
        content: `Ngày ${day.content} - ${hour.content}`
      })
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const [hidePriceList, setHidePriceList] = useState(true)
  const [hideInsurance, setHideInsurance] = useState(true)
  const [dayActiveId, setDayActiveId] = useState(0)
  const [time, setTime] =
    useState<ScheduleDayBookProps | null>(null)
  const [price, setPrice] = useState('')
  const [listSchedule, setListSchedule] = useState<
    ScheduleDayProps[]
  >([])

  useEffect(() => {
    if (data) {
      setListSchedule(data.schedule_day)
      if (data.schedule_day.length > 0) {
        setDayActiveId(data.schedule_day[0].id)
      }
      setPrice(`${formatCurrency(data.priceFrom)}
    - ${formatCurrency(data.priceTo)}`)
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          bgcolor: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? 'primary.dark'
                : '#fff'
            }`,
          p: 2,
          borderRadius: 3,
          boxShadow: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? theme.boxShadowDark
                : theme.boxShadowLight
            }`
        }}
      >
        <Grid container columnSpacing={3} marginTop={3}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              borderRight: {
                sm: '1px solid gray'
              }
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ maxWidth: '700px' }}
              spacing={{ xs: 1, sm: 3 }}
              alignItems="center"
            >
              <Box>
                <Avatar
                  alt={data?.fullName}
                  src={data?.avatar}
                  sx={{
                    width: '100px',
                    height: '100px',
                    boxShadow: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? theme.boxShadowDark
                          : theme.boxShadowLight
                      }`
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    textAlign: {
                      xs: 'center',
                      sm: 'start'
                    },
                    color: colorCode.cyan300
                  }}
                >
                  {data?.positions && data.positions.length
                    ? data.positions
                        ?.map(
                          (item: PositionProps) => item.name
                        )
                        .join(', ')
                    : ''}{' '}
                  {data?.fullName}
                </Typography>
                {data?.description && (
                  <Typography>
                    {data.description}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                paddingBottom: 1.5,
                borderBottom: `1px solid ${colorCode.grey300}`
              }}
            >
              <Box sx={{ marginTop: 2 }}>
                {listSchedule?.length > 0 ? (
                  <>
                    <FormControl
                      variant="standard"
                      sx={{
                        m: 1,
                        minWidth: 120,
                        width: {
                          xs: '100%',
                          sm: '200px'
                        }
                      }}
                    >
                      <Select
                        IconComponent={TiArrowSortedDown}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={dayActiveId}
                        onChange={(event) =>
                          setDayActiveId(
                            Number(event.target.value)
                          )
                        }
                        sx={{
                          '.css-499nkr-MuiSelect-select-MuiInputBase-input-MuiInput-input:focus':
                            {
                              bgcolor: 'transparent'
                            }
                        }}
                      >
                        {listSchedule.map(
                          (item: ScheduleDayProps) => (
                            <MenuItem
                              value={item.id}
                              key={item.id}
                            >
                              {item.content}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <Box marginTop={1}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                      >
                        <FaRegCalendarAlt />
                        <Typography
                          sx={{ fontWeight: 600 }}
                        >
                          Lịch khám
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={2}
                        marginTop={3}
                      >
                        {listSchedule
                          .find(
                            (item) =>
                              item.id === dayActiveId
                          )
                          ?.hour.map((item) => (
                            <Button
                              key={item.id}
                              onClick={() =>
                                handleOpen({
                                  id: item.id,
                                  content: item.content
                                })
                              }
                              variant="outlined"
                              size="medium"
                              sx={{
                                borderColor:
                                  colorCode.cyan400,
                                color: colorCode.cyan400
                              }}
                            >
                              {item.content}
                            </Button>
                          ))}
                      </Stack>
                    </Box>
                  </>
                ) : (
                  <Typography>
                    Không có lịch nào!
                  </Typography>
                )}
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? colorCode.grey300
                        : colorCode.grey600
                    }`
                }}
              >
                Địa chỉ khám
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {data?.nameClinic}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.9rem'
                }}
              >
                {data?.addressClinic}
              </Typography>
            </Box>
            <Box
              sx={{
                paddingBottom: 1.5,
                marginTop: 1,
                borderBottom: `1px solid ${colorCode.grey300}`
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,

                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? colorCode.grey300
                        : colorCode.grey600
                    }`
                }}
              >
                Giá khám
              </Typography>
              {hidePriceList ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  >
                    {price}
                  </Typography>
                  <Typography
                    onClick={() => setHidePriceList(false)}
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      color: colorCode.cyan400,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: colorCode.cyan700
                      }
                    }}
                  >
                    Xem bảng giá
                  </Typography>
                </>
              ) : (
                <Box>
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? 'primary.main'
                            : colorCode.grey300
                        }`
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}
                      >
                        Giá khám:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}
                      >
                        {price}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '0.85rem'
                      }}
                    >
                      Bệnh nhân sử dụng Bảo hiểm tư nhân vui
                      lòng đến khám trước 15h hàng ngày
                    </Typography>
                  </Box>
                  <Stack
                    alignItems="flex-end"
                    marginTop={1}
                  >
                    <Typography
                      onClick={() => setHidePriceList(true)}
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: colorCode.cyan400,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: colorCode.cyan700
                        }
                      }}
                    >
                      Ẩn bảng giá
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                paddingBottom: 1.5,
                marginTop: 1
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? colorCode.grey300
                        : colorCode.grey600
                    }`
                }}
              >
                Loại bảo hiểm áp dụng.
              </Typography>
              {hideInsurance ? (
                <>
                  <Typography
                    onClick={() => setHideInsurance(false)}
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      color: colorCode.cyan400,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: colorCode.cyan700
                      }
                    }}
                  >
                    Xem chi tiết.
                  </Typography>
                </>
              ) : (
                <Box>
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: (theme) =>
                        `${
                          theme.palette.mode === 'dark'
                            ? 'primary.main'
                            : colorCode.grey300
                        }`
                    }}
                  >
                    <Box
                      sx={{
                        paddingBottom: 1.5,
                        borderBottom: `1px solid ${colorCode.grey300}`
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}
                      >
                        Bảo hiểm y tế nhà nước
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem'
                        }}
                      >
                        Hiện chưa áp dụng bảo hiểm y tế nhà
                        nước cho dịch vụ khám chuyên gia.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        marginTop: 1.5
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}
                      >
                        Bảo hiểm y tế tư nhân
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem'
                        }}
                      >
                        Đối với các đơn vị bảo hiểm không
                        bảo lãnh trực tiếp, phòng khám xuất
                        hoá đơn tài chính (hoá đơn đỏ) và hỗ
                        trợ bệnh nhân hoàn thiện hồ sơ
                      </Typography>
                    </Box>
                  </Box>
                  <Stack
                    alignItems="flex-end"
                    marginTop={1}
                  >
                    <Typography
                      onClick={() => setHideInsurance(true)}
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: colorCode.cyan400,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: colorCode.cyan700
                        }
                      }}
                    >
                      Thu gọn
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ModelBookSchedule
        doctor={data}
        time={time}
        price={price}
        open={open}
        closeModel={handleClose}
      />
    </>
  )
}

export default Doctor
