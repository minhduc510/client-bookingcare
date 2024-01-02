import { Fragment, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { Box, Button } from '@mui/material'

import ModelAdd from './ModelAdd'
import ItemSlide from './ItemSlide'
import { IoPersonAdd } from '@/icons'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

const data = [
  {
    id: 1,
    image:
      'https://cdn.bookingcare.vn/fo/w1920/2023/11/02/134537-group-12314.png',
    title: 'suwsc khoar'
  },
  {
    id: 2,
    image:
      'https://cdn.bookingcare.vn/fo/w1920/2023/09/07/141422-144204-dat-lich-kham-bookingcare-pharmacity.jpg',
    title: 'suwsc khoar'
  },
  {
    id: 3,
    image:
      'https://cdn.bookingcare.vn/fo/w1920/2023/11/02/103728-med247.png',
    title: 'suwsc khoar'
  }
]

interface ISliceProps {
  id: number
  image: string
  title: string
}

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

  const [listSlice, setListSlice] = useState(data)
  const [sliceActiveIndex, setStyleActiveIndex] = useState<
    number | null
  >(null)
  const [sliceActive, setSliceActive] =
    useState<ISliceProps | null>(null)

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
            items={listSlice.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {listSlice.map((item, index) => (
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
        >
          Lưu
        </Button>
      </Box>

      {/* Model */}
      <ModelAdd
        open={openModelAdd}
        setOpen={setOpenModelAdd}
      />
    </>
  )
}

export default Slider
