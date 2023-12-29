import { TextField } from '@mui/material'

interface IProps {
  label: string
  name: string
  type?: 'text' | 'password'
  size?: 'small' | 'medium'
}

const InputText = ({
  label,
  name,
  type = 'text',
  size = 'small'
}: IProps) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      size={size}
      sx={{
        width: '100%',
        maxWidth: '500px'
      }}
    />
  )
}

export default InputText
