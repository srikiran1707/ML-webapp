import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import CustomAlert from './CustomAlert'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

import axios from 'axios'
import { isNilorEmpty, getTeam } from '../utils/common'

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
  const [interpretation, setInterpretation] = useState('')
  const [alert, setAlert] = useState(false)
  const [msg, setMsg] = useState(null)
  const [type, setType] = useState('')
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleError = (err) => {
    setAlert(true)
    setMsg(err)
    setType('error')
    setTimeout(() => {
      setAlert(false)
      setMsg(null)
      setType('')
    }, 3000)
  }

  const handleSuccess = (msg) => {
    setAlert(true)
    setMsg(msg)
    setType('success')
    setTimeout(() => {
      setAlert(false)
      setMsg(null)
      setType('')
    }, 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = { Home, Away }

    axios
      .post('http://localhost:8080/prediction', params)
      .then((res) => {
        const data = res.data.data
        props.getWinner(data.prediction)
        setInterpretation(data.interpretation)
        handleSuccess('Prediction fetched successfully .')
        handleClickOpen()
      })
      .catch((error) => {
        handleError(error.message)
      })
  }

  return (
    <>
      <Button
        size='large'
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
          Prediction Result : {getTeam(interpretation)}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{`Team ${getTeam(
            interpretation
          )} has a higher chance to win based on recent performance and historical data.`}</Typography>
          <Typography gutterBottom>{`${getTeam(
            interpretation
          )} has performed better in recent matches and has a higher rating.`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button className='viewStats' autoFocus onClick={handleClose}>
            <QueryStatsIcon />
            Stats
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <div className='error'>
        {alert && <CustomAlert type={type} msg={msg} />}
      </div>
    </>
  )
}

export default PredictionResponse
