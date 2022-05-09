import React from 'react'
import { useState } from 'react'
import AutoSelect from './components/AutoSelect'
import Button from '@mui/material/Button'

import axios from 'axios'
import { isNilorEmpty } from './utils/common'

const PredictWinner = () => {
  const [Home, setHome] = useState('')
  const [Away, setAway] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = { Home, Away }
    axios
      .post('http://localhost:8080/prediction', params)
      .then((res) => {
        const data = res.data.data
        const parameters = JSON.stringify(params)
        const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`
        alert(msg)
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  return (
    <>
      <div className='header'>
        <p>NBA Game Winner Prediction</p>
      </div>
      <div className='body'>
        <AutoSelect
          name='Home Team'
          onChange={(home) => setHome(home.abbreviation)}
        />
        <AutoSelect
          name='Away Team'
          onChange={(away) => setAway(away.abbreviation)}
        />
      </div>
      <div>
        <Button
          variant='contained'
          disabled={isNilorEmpty(Home) || isNilorEmpty(Away)}
          onClick={handleSubmit}
        >
          Predict
        </Button>
      </div>
    </>
  )
}

export default PredictWinner
