import React from 'react'
import { useState } from 'react'
import AutoSelect from './components/AutoSelect'
import CustomAlert from './components/CustomAlert'
import TeamStats from './components/TeamStats'
import PredictionResponse from './components/PredictionResponse'
import Container from '@mui/material/Container'
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction'
import Button from '@mui/material/Button'
import { isNilorEmpty, getTeam, filterTeamSelect } from './utils/common'

import axios from 'axios'

import './Winner.scss'

const Winner = () => {
  const [Home, setHome] = useState('')
  const [Away, setAway] = useState('')
  const [prediction, setPrediction] = useState('')
  const [open, setOpen] = useState(false)
  const [interpretation, setInterpretation] = useState('')
  const [alert, setAlert] = useState(false)
  const [msg, setMsg] = useState(null)
  const [type, setType] = useState('')

  const onHomeChangeHandler = (value) => {
    setHome(value.abbreviation)
    setPrediction('')
    setOpen(false)
  }

  const onAwayChangeHandler = (value) => {
    setAway(value.abbreviation)
    setPrediction('')
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
    setOpen(true)
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
        setInterpretation(data.interpretation)
        setPrediction(data.prediction)
        handleSuccess('Prediction fetched successfully .')
      })
      .catch((error) => {
        handleError(error.message)
      })
  }

  return (
    <div className='PredictContainer'>
      <div className='alertColumn'>
        <div className='multiGlass'>
          <div className='glass'>
            <Container maxWidth='sm'>
              <div className='header'>NBA Winner Predictor</div>
              <div className='body'>
                <div className='home team'>
                  <AutoSelect
                    required
                    label='Home Team'
                    name={Home}
                    teams={filterTeamSelect(Away)}
                    onChange={onHomeChangeHandler}
                  />
                </div>
                <div className='away team'>
                  <AutoSelect
                    required
                    label='Away Team'
                    name={Away}
                    teams={filterTeamSelect(Home)}
                    onChange={onAwayChangeHandler}
                  />
                </div>
              </div>
              <div className='dialog'>
                <div className='button'>
                  <div className='button-padding'>
                    <Button
                      size='medium'
                      variant='contained'
                      disabled={isNilorEmpty(Home) || isNilorEmpty(Away)}
                      onClick={handleSubmit}
                    >
                      <OnlinePredictionIcon />
                      Predict
                    </Button>
                  </div>
                  <TeamStats Home={Home} Away={Away} />
                </div>
              </div>
            </Container>
          </div>
          <div className='glassResult'>
            <div className='multiGlass'>
              <div
                className={`Home glassLogo ${prediction === 'H' ? 'win' : ''}`}
              >
                <div className={`Home Logo `}>
                  <img
                    src={require(`./images/${Home || 'default'}.jpg`)}
                    alt={Home}
                  />
                  <p>{getTeam(Home) || 'Home Team'}</p>
                </div>
              </div>
              <span>v/s</span>
              <div
                className={`Away glassLogo ${prediction === 'A' ? 'win' : ''}`}
              >
                <div className='Away Logo'>
                  <img
                    src={require(`./images/${Away || 'default'}.jpg`)}
                    alt={Away}
                  />
                  <p>{getTeam(Away) || 'Away Team'}</p>
                </div>
              </div>
            </div>
            <PredictionResponse interpretation={interpretation} open={open} />
          </div>
        </div>
        <div className='alert'>
          {alert && <CustomAlert type={type} msg={msg} />}
        </div>
      </div>
    </div>
  )
}

export default Winner
