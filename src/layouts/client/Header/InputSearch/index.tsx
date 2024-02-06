import { Stack, Typography } from '@mui/material'

import { IoSearch } from '@/icons'
import colorCode from '@/configs/color'

const InputSearch = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      sx={{
        border: `1px solid${colorCode.grey400}`,
        paddingX: 1,
        paddingY: {
          xs: 0.9,
          sm: 1.3
        },
        borderRadius: 5,
        backgroundColor: (theme) =>
          `${
            theme.palette.mode === 'dark'
              ? 'primary.dark'
              : '#fff'
          }`
      }}
    >
      <IoSearch size={23} color={colorCode.grey300} />
      <Typography
        sx={{
          width: '230px',
          color: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? `${colorCode.grey400}`
                : `${colorCode.grey300}`
            }`,
          fontWeight: 400
        }}
      >
        Tìm gói phẫu thuật
      </Typography>
    </Stack>
  )
}

export default InputSearch
