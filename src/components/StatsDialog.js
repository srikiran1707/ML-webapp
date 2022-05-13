import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { getTeam, isNilorEmpty } from '../utils/common'
import Stats from '../Stats'
import { Box } from '@mui/system'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const StatsDialog = (props) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Home = props.Home
  const Away = props.Away

  return (
    <>
      <div>
        <div className='button-padding'>
          <Button
            size='medium'
            variant='contained'
            disabled={isNilorEmpty(Home) || isNilorEmpty(Away)}
            onClick={handleClickOpen}
          >
            <QueryStatsIcon />
            Stats
          </Button>
        </div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
              <Box style={{ justifyContent: 'center' }}>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant='h6'
                  component='div'
                >
                  {`${getTeam(Home)} - ${getTeam(Away)}`}
                </Typography>
              </Box>
              <IconButton
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Stats />
        </Dialog>
      </div>
    </>
  )
}

export default StatsDialog
