import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { getTeam } from '../constants/teams'
import axios from 'axios'
import { isNilorEmpty } from '../utils/common'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

const PredictionResponse = (props) => {
  const { Home, Away } = props
  const [open, setOpen] = useState(false)
  const [prediction, setPrediction] = useState('')
  const [interpretation, setInterpretation] = useState('')
  const [alert, setAlert] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClickOpen()

    const params = { Home, Away }
    if (Home === Away) {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 3000)
      setOpen(false)
      return
    }
    axios
      .post('http://localhost:8080/prediction', params)
      .then((res) => {
        const data = res.data.data
        setPrediction(data.prediction)
        setInterpretation(data.interpretation)
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  return (
    <>
      <Button
        variant='contained'
        disabled={isNilorEmpty(Home) || isNilorEmpty(Away)}
        onClick={handleSubmit}
      >
        Predict
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          Prediction Result
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{`Team ${getTeam(
            interpretation
          )} has a higher chance to win`}</Typography>
        </DialogContent>
      </BootstrapDialog>
      {alert && (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>Home team and Away team should be different</strong>
        </Alert>
      )}
    </>
  )
}

export default PredictionResponse
