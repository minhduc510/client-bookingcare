import { Backdrop } from '@mui/material'
import { Hourglass } from 'react-loader-spinner'

interface IProps {
  open: boolean
}

const Loading = ({ open }: IProps) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        backdropFilter: 'blur(2px)',
        zIndex: 9999
      }}
      open={open}
    >
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['rgb(236 72 153)', 'rgb(249 168 212)']}
      />
    </Backdrop>
  )
}

export default Loading
