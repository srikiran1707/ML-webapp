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
import CustomAlert from './CustomAlert'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TeamStats = (props) => {
  const Home = props.Home
  const Away = props.Away

  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState(false)
  const [msg, setMsg] = useState(null)
  const [type, setType] = useState('')
  const [home_stats, setHomeStats] = useState([])
  const [home_statsp, setHomeStatsp] = useState([])
  const [away_stats, setAwayStats] = useState([])
  const [away_statsp, setAwayStatsp] = useState([])
  const [elosm, setElosm] = useState([])

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

  const fetchTeamstats = async () => {
    const params = { Home, Away }

    await axios
      .post('http://localhost:8080/teamstats', params)
      .then((res) => {
        const data = res.data.data
        setHomeStats([...data['home']])
        setHomeStatsp([...data['home%']])
        setAwayStats([...data['away']])
        setAwayStatsp([...data['away%']])
        setElosm({ ...data.elosm })
        handleClickOpen()
        handleSuccess('Team stats fetched successfully .')
      })
      .catch((error) => {
        handleError(error.message)
      })
  }

  return (
    <>
      <div>
        <div className='button-padding'>
          <Button
            size='medium'
            variant='contained'
            disabled={isNilorEmpty(Home) || isNilorEmpty(Away)}
            onClick={fetchTeamstats}
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
          <Stats
            Home={Home}
            Away={Away}
            home_stats={home_stats}
            home_statsp={home_statsp}
            away_stats={away_stats}
            away_statsp={away_statsp}
            elosm={elosm}
          />
          {alert && <CustomAlert type={type} msg={msg} />}
        </Dialog>
      </div>
    </>
  )
}

export default TeamStats
