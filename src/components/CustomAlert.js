import React from 'react'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'

const CustomAlert = (props) => {
  return (
    <Alert severity={props.type}>
      <AlertTitle>{props.type}</AlertTitle>
      <strong>{props.msg}</strong>
    </Alert>
  )
}

export default CustomAlert
