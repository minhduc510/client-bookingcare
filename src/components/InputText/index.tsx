/* eslint-disable no-unused-vars */
import { TextField } from '@mui/material'
import { RefObject, forwardRef } from 'react'

interface IProps {
  label: string
  name: string
  error: string | undefined
  type?: 'text' | 'password'
  size?: 'small' | 'medium'
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void
}

type RefType =
  | ((instance: HTMLDivElement | null) => void)
  | RefObject<HTMLDivElement>
  | null
  | undefined

const InputText = forwardRef(
  (
    {
      label,
      name,
      error,
      type = 'text',
      size = 'small',
      onChange
    }: IProps,
    ref: RefType
  ) => {
    return (
      <TextField
        error={!!error}
        helperText={error ? error : ''}
        ref={ref}
        label={label}
        name={name}
        type={type}
        size={size}
        sx={{
          width: '100%',
          maxWidth: '500px'
        }}
        onChange={onChange}
      />
    )
  }
)

export default InputText
