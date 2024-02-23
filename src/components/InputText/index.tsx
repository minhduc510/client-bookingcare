/* eslint-disable no-unused-vars */
import colorCode from '@/configs/color'
import { TextField } from '@mui/material'
import { RefObject, forwardRef } from 'react'

interface IProps {
  label: string
  name: string
  readOnly?: boolean
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
      readOnly = false,
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
        inputProps={{ readOnly }}
        sx={{
          width: '100%',
          maxWidth: '600px',
          bgcolor: (theme) => {
            return readOnly
              ? theme.palette.mode === 'dark'
                ? 'primary.light'
                : colorCode.grey200
              : 'auto'
          }
        }}
        onChange={onChange}
      />
    )
  }
)

export default InputText
