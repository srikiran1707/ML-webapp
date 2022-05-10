import React from 'react'
import { useState } from 'react'
import AutoSelect from './components/AutoSelect'
import PredictionResponse from './components/PredictionResponse'
import Container from '@mui/material/Container'
import './Winner.scss'

const Winner = () => {
  const [Home, setHome] = useState('')
  const [Away, setAway] = useState('')
  return (
    <div className='container'>
      <div className='glass'>
        <Container maxWidth='sm'>
          <div className='header'>NBA Win Predictor</div>
          <div className='body'>
            <div className='home team'>
              <AutoSelect
                name='Home Team'
                onChange={(home) => setHome(home.abbreviation)}
              />
            </div>
            <div className='away team'>
              <AutoSelect
                name='Away Team'
                onChange={(away) => setAway(away.abbreviation)}
              />
            </div>
          </div>
          <div className='button'>
            <PredictionResponse Home={Home} Away={Away} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Winner
