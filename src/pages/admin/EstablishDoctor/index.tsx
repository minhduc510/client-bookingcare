import { Box, Grid } from '@mui/material'
import Position from './Position'
import Outstanding from './Outstanding'

const EstablishDoctor = () => {
  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
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
