/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from 'swr'
import {
  Fragment,
  useState,
  useEffect,
  useCallback
} from 'react'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  useSensor,
  DndContext,
  useSensors,
  TouchSensor,
  DragOverlay,
  MouseSensor,
  DragEndEvent,
  DragStartEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { Box, Button } from '@mui/material'

import swal from '@/utils/swal'
import ModelAdd from './ModelAdd'
import ItemSlide from './ItemSlide'
import Loading from '@/components/Loading'
import { IoPersonAdd } from '@/icons'
import { ISliceProps } from '@/interface'
import { apiHasToken, linkApi } from '@/api'

const dataFake = [
  {
    id: 1,
    image: '',
    title: '',
    order: 0
  }
]

const styleDragOverlay = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}

const Slider = () => {
  const [openModelAdd, setOpenModelAdd] = useState(false)

  const [listSlice, setListSlice] =
    useState<ISliceProps[]>(dataFake)
  const [sliceActiveIndex, setStyleActiveIndex] = useState<
    number | null
  >(null)
  const [sliceActive, setSliceActive] =
    useState<ISliceProps | null>(null)

  const handleOpenModelAdd = useCallback(() => {
    setOpenModelAdd(false)
  }, [])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 8,
      distance: 4
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const slice = listSlice.find(
      (item) => item.id === active.id
    )
    const sliceIndex = listSlice.findIndex(
      (item) => item.id === active.id
    )
    if (slice) {
      setSliceActive(slice)
      setStyleActiveIndex(sliceIndex)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      setListSlice((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id === active.id
        )
        const newIndex = items.findIndex(
          (item) => item.id === over.id
        )
        return arrayMove(items, oldIndex, newIndex)
      })
      setSliceActive(null)
      setStyleActiveIndex(null)
    }
  }

  const handleSaveOrder = async () => {
    const dataOrder = listSlice.map((slide) => slide.id)
    const { error } = await apiHasToken.orderSlide(
      dataOrder
    )
    if (!error) {
      swal
        .success('Cập nhật thứ tự slide thành công')
        .then(() => {
          mutate()
        })
    } else {
      swal.error('Cập nhật thứ tự slide không thành công')
    }
  }

  const { data, isLoading, mutate } = useSWR(
    linkApi.getAllSlide,
    apiHasToken.getAllSlide(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (!isLoading) {
      if (!data.error) {
        setListSlice(data.data)
      }
    }
  }, [isLoading, JSON.stringify(data?.data)])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          onClick={() => setOpenModelAdd(true)}
          variant="contained"
          sx={{ color: 'white' }}
          startIcon={<IoPersonAdd />}
        >
          Thêm
        </Button>
      </Box>
      {isLoading ? (
        <Loading open={isLoading} />
      ) : (
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          sensors={sensors}
        >
          <Box
            sx={{
              overflowX: {
                xs: 'auto',
                md: 'hidden'
              },
              marginTop: 2,
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: {
                xs: 'calc(100vw - 15px)',
                md: '100%'
              },
              bgcolor: 'primary.main',
              boxShadow: (theme) =>
                `${
                  theme.palette.mode === 'dark'
                    ? theme.boxShadowDark
                    : theme.boxShadowLight
                }`
            }}
          >
            <SortableContext
              items={listSlice?.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {listSlice?.map((item, index) => (
                <Fragment key={index}>
                  <ItemSlide data={item} index={index} />
                </Fragment>
              ))}
            </SortableContext>
          </Box>
          <DragOverlay dropAnimation={styleDragOverlay}>
            {sliceActive && (
              <ItemSlide
                data={sliceActive}
                index={sliceActiveIndex}
              />
            )}
          </DragOverlay>
        </DndContext>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 2
        }}
      >
        <Button
          variant="contained"
          sx={{ color: 'white', bgcolor: 'green' }}
          onClick={handleSaveOrder}
        >
          Lưu
        </Button>
      </Box>

      {/* Model */}
      {openModelAdd && (
        <ModelAdd
          open={openModelAdd}
          closeModel={handleOpenModelAdd}
        />
      )}
    </>
  )
}

export default Slider
