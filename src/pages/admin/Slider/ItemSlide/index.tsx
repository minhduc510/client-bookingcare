import { mutate } from 'swr'
import { CSS } from '@dnd-kit/utilities'
import { useCallback, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Box, Tooltip, Typography } from '@mui/material'

import swal from '@/utils/swal'
import ModelEdit from '../ModelEdit'
import Image from '@/components/Image'

import {
  FaPen,
  GiHamburgerMenu,
  RiDeleteBin4Fill
} from '@/icons'
import { ISliceProps } from '@/interface'
import { apiHasToken, linkApi } from '@/api'

interface IProps {
  data: ISliceProps
  index: number | null
}

const ItemSlide = ({ data, index }: IProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: data.id,
    data: { ...data },
    animateLayoutChanges: () => false,
    transition: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid green' : undefined,
    borderRadius: '8px'
  }

  const [openModelEdit, setOpenModelEdit] = useState(false)

  const handleOpenModelEdit = useCallback(() => {
    setOpenModelEdit(false)
  }, [])

  const handleDeleteSlider = () => {
    swal
      .confirm('Bạn có chắc chắn muốn xóa?')
      .then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const { error } = await apiHasToken.deleteSlide(
            data.id
          )
          if (!error) {
            swal
              .success('Xóa user thành công!')
              .then(() => {
                mutate(linkApi.getAllSlide)
              })
          }
        }
      })
  }
  return (
    <>
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        sx={{
          width: {
            xs: '850px',
            sm: '100%'
          }
        }}
      >
        <Box
          {...listeners}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 2,
            py: 1,
            px: 5,
            color: 'white',
            bgcolor: 'primary.dark'
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              color: 'white',
              bgcolor: 'primary.main'
            }}
          >
            {Number(index) + 1}
          </Box>
          <Box
            sx={{
              width: 153,
              height: 80,
              position: 'relative',
              bgcolor: 'black',
              borderRadius: 1,
              overflow: 'hidden'
            }}
          >
            <Image
              src={data.image}
              fill
              alt=""
              objectFit="contain"
            />
          </Box>
          <Typography
            sx={{
              width: '400px',
              maxWidth: '400px',
              textAlign: 'center'
            }}
          >
            {data.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Tooltip title="cập nhật slide">
              <Box
                onClick={() => setOpenModelEdit(true)}
                sx={{
                  bgcolor: 'green',
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
                <FaPen size={13} />
              </Box>
            </Tooltip>
            <Tooltip title="xóa slide">
              <Box
                onClick={handleDeleteSlider}
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
          </Box>
          <Tooltip
            title="kéo slide"
            sx={{ cursor: 'pointer' }}
          >
            <Box>
              <GiHamburgerMenu size={25} />
            </Box>
          </Tooltip>
        </Box>
      </Box>
      {/* Model */}

      {openModelEdit && (
        <ModelEdit
          data={data}
          open={openModelEdit}
          closeModel={handleOpenModelEdit}
        />
      )}
    </>
  )
}

export default ItemSlide
