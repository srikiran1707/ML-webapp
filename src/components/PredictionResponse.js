import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { getTeam } from '../utils/common'

const PredictionResponse = (props) => {
  const { interpretation, open } = props

  return (
    <>
      <div className={`result ${open ? 'visible' : 'disabled'}`}>
        <DialogTitle>Prediction Result : {getTeam(interpretation)}</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{`Team ${getTeam(
            interpretation
          )} has a higher chance to win based on recent performance and historical data.`}</Typography>
          <Typography gutterBottom>{`${getTeam(
            interpretation
          )} has performed better in recent matches and has a higher rating.`}</Typography>
        </DialogContent>
      </div>
    </>
  )
}

export default PredictionResponse
