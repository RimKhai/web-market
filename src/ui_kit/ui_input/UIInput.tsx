import { TextField } from '@mui/material'
import React from 'react'
import { UIInputStyles } from './styles'

interface UIInputProps {
    width?: string,
    height?: string,
    label?: string,
    action?: () => void
}

const UIInput: React.FunctionComponent<UIInputProps> = ({width, height, label, action}) => {
  return (
    <TextField 
    variant='outlined'
    label={label}
    sx={{...UIInputStyles, width: width, height: height}}
    />
  )
}

export default UIInput
