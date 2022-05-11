import React from 'react'
import { useState } from 'react'
import AutoSelect from './components/AutoSelect'
import PredictionResponse from './components/PredictionResponse'
import Container from '@mui/material/Container'
import './Winner.scss'
import { getTeam, filterTeamSelect } from './utils/common'

const Winner = () => {
  const [Home, setHome] = useState('')
  const [Away, setAway] = useState('')
  const [prediction, setPrediction] = useState('')

  const getWinner = (data) => {
    setPrediction(data)
  }

  const onHomeChangeHandler = (value) => {
    setHome(value.abbreviation)
    sessionStorage.setItem('home', value.abbreviation)
    setPrediction('')
  }

  const onAwayChangeHandler = (value) => {
    setAway(value.abbreviation)
    sessionStorage.setItem('away', value.abbreviation)
    setPrediction('')
  }

  return (
    <div className='container'>
      <div className={`Home glassLogo ${prediction === 'H' ? 'win' : ''}`}>
        <div className={`Home Logo `}>
          <img src={require(`./images/${Home || 'default'}.jpg`)} alt={Home} />
          <p>{getTeam(Home) || 'Home Team'}</p>
        </div>
      </div>
      <div className='glass'>
        <Container maxWidth='sm'>
          <div className='header'>NBA Win Predictor</div>
          <div className='body'>
            <div className='home team'>
              <AutoSelect
                required
                name='Home Team'
                teams={filterTeamSelect(Away)}
                onChange={onHomeChangeHandler}
              />
            </div>
            <div className='away team'>
              <AutoSelect
                required
                name='Away Team'
                teams={filterTeamSelect(Home)}
                onChange={onAwayChangeHandler}
              />
            </div>
          </div>
          <div className='dialog'>
            <PredictionResponse Home={Home} Away={Away} getWinner={getWinner} />
          </div>
        </Container>
      </div>
      <div className={`Away glassLogo ${prediction === 'A' ? 'win' : ''}`}>
        <div className='Away Logo'>
          <img src={require(`./images/${Away || 'default'}.jpg`)} alt={Away} />
          <p>{getTeam(Away) || 'Away Team'}</p>
        </div>
      </div>
    </div>
  )
}

export default Winner
