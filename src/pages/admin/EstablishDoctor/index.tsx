import { Box, Grid } from '@mui/material'
import Position from './Position'
import Outstanding from './Outstanding'

const EstablishDoctor = () => {
  return (
    <Box>
      <Grid
        container
        spacing={{
          xs: 0,
          md: 5
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            maxWidth: {
              xs: '96.5vw',
              sm: '98vw',
              md: 'auto'
            }
          }}
        >
          <Outstanding />
        </Grid>
        <Grid item xs={12} md={6}>
          <Position />
        </Grid>
      </Grid>
    </Box>
  )
}

export default EstablishDoctor
