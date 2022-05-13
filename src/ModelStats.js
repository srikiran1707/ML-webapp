import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { isNilorEmpty } from './utils/common'
import { Button } from '@mui/material'
import { Tooltip as MUITooltip } from '@mui/material'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining'
import CustomAlert from './components/CustomAlert'
import axios from 'axios'
import './Modelstats.scss'

const ModelStats = () => {
  const [model_stats, setModelStats] = useState({})
  const [alert, setAlert] = useState(false)
  const [msg, setMsg] = useState(null)
  const [type, setType] = useState('')

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

  const fetchModelStats = async () => {
    await axios
      .get('http://localhost:8080/modelstats')
      .then((res) => {
        const data = res.data.data
        setModelStats({ ...data })
        handleSuccess('Model stats fetched successfully .')
      })
      .catch((error) => {
        handleError(error.message)
      })
  }

  useEffect(() => {
    if (isNilorEmpty(model_stats)) {
      fetchModelStats()
    }
  })

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
      },
    },
  }

  const labels = ['Accuracy %']
  const data_stats = {
    labels,
    datasets: [
      {
        label: 'Logistic Regression',
        data: [model_stats.log_acc],
        backgroundColor: 'rgba(2, 85, 148, 0.66)',
      },
      {
        label: 'Random Forest',
        data: [model_stats.rf_acc],
        backgroundColor: 'rgba(255, 5, 65, 0.51)',
      },
      {
        label: 'Linear SVC',
        data: [model_stats.lsvc_acc],
        backgroundColor: 'rgba(165, 5, 255, 0.51)',
      },
      {
        label: 'KNN',
        data: [model_stats.knn_acc],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className='modelContainer'>
      <div className='glassHeader'>
        <h2 className='header'>
          Model Comparison
          <MUITooltip title='Train Models'>
            <Button variant='primary' onClick={() => fetchModelStats()}>
              <ModelTrainingIcon />
            </Button>
          </MUITooltip>
        </h2>
      </div>
      <div className='modelChart'>
        <div className='glassModel'>
          <Bar options={options} data={data_stats} />
        </div>
        {alert && <CustomAlert type={type} msg={msg} />}
      </div>
    </div>
  )
}

export default ModelStats
