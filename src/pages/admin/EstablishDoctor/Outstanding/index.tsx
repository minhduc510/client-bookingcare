/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import Loading from '@/components/Loading'
import { apiHasToken, linkApi } from '@/api'
import { UserProps } from '@/interface'
import {
  Avatar,
  Box,
  Button,
  Slide,
  Snackbar,
  Typography
} from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    description:
      'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    field: 'positions',
    headerName: 'Chức vụ',
    flex: 1,
    minWidth: 150
  },
  {
    field: 'avatar',
    headerName: 'Ảnh đại diện',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Avatar alt="" src={params.value} />
    )
  }
]

const Outstanding = () => {
  const [loading, setLoading] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  const [msgToast, setMsgToast] = useState('')
  const [rows, setRows] = useState<UserProps[]>([])
  const [idsChecked, setIdsChecked] = useState<number[]>([])
  const [selectionModel, setSelectionModel] = useState<
    number[]
  >([])

  const onRowsSelectionHandler = (ids: number[]) => {
    const selectedRowsData = ids.map((id) =>
      rows.find((row) => Number(row.id) === id)
    )
    setSelectionModel(ids)
    setIdsChecked(
      selectedRowsData.map((item) => Number(item?.id))
    )
  }

  const onCloseToast = () => {
    setOpenToast(false)
    setMsgToast('')
  }

  const handleSaveResult = async () => {
    setLoading(true)
    const { error, message } =
      await apiHasToken.setOutstandingDoctor(idsChecked)
    if (!error) {
      setLoading(false)
      mutate()
      setMsgToast('Cập nhật thành công')
      setOpenToast(true)
    } else {
      setLoading(false)
      setMsgToast(message)
    }
  }

  const { data, isLoading, mutate } = useSWR(
    [linkApi.getAllUserDoctors, []],
    apiHasToken.getAllUser(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (data?.data?.users) {
      const usersOutstanding = data.data?.users.filter(
        (user: UserProps) => user.outstanding
      )
      const usersNotOutstanding = data.data?.users.filter(
        (user: UserProps) => !user.outstanding
      )
      let users = [
        ...usersOutstanding,
        ...usersNotOutstanding
      ]
      users = users.map((user: UserProps) => ({
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar,
        positions: user.positions?.reduce(
          (accumulator, currentValue, index) => {
            if (index > 0) accumulator += ', '
            return accumulator + currentValue.name
          },
          ''
        )
      }))
      const ids = usersOutstanding.map(
        (user: UserProps) => user.id
      )
      setSelectionModel(ids)
      setRows(users)
    }
  }, [isLoading, JSON.stringify(data?.data?.users)])

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
      <Typography
        sx={{ fontWeight: 600, fontStyle: 'italic' }}
      >
        Bác sĩ nổi bật
      </Typography>
      <Box
        sx={{
          height: 400,
          marginTop: 3,
          overflowX: 'auto'
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowSelectionModel={selectionModel}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(ids) =>
            onRowsSelectionHandler(ids as number[])
          }
          columnVisibilityModel={{
            // Hide columns status and traderName, the other columns will remain visible
            id: false
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="info"
        sx={{ marginY: 2, float: 'right' }}
        onClick={handleSaveResult}
      >
        Thêm
      </Button>
    </>
  )
}

export default Outstanding
