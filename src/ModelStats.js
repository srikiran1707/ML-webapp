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
import axios from 'axios'
import './Modelstats.scss'

const ModelStats = () => {
  const [model_stats, setModelStats] = useState({})

  const fetchModelStats = async () => {
    await axios
      .get('http://localhost:8080/modelstats')
      .then((res) => {
        const data = res.data.data
        setModelStats({ ...data })
      })
      .catch((error) => {
        alert(error)
      })
  }

  useEffect(() => {
    if (isNilorEmpty(model_stats)) {
      fetchModelStats()
    }
  }, [model_stats])

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
      <h2 className='header'>
        Model Comparison
        <MUITooltip title='Train Models'>
          <Button variant='primary' onClick={() => fetchModelStats()}>
            <ModelTrainingIcon />
          </Button>
        </MUITooltip>
      </h2>
      <div className='modelChart'>
        <div className='glassModel'>
          <Bar options={options} data={data_stats} />
        </div>
      </div>
    </div>
  )
}

export default ModelStats
