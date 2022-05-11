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
import axios from 'axios'
import './Modelstats.scss'

const ModelStats = () => {
  const [model_stats, setModelStats] = useState({})

  useEffect(() => {
    axios
      .get('http://localhost:8080/modelstats')
      .then((res) => {
        const data = res.data.data
        setModelStats({ ...data })
      })
      .catch((error) => {
        alert(error)
      })
  }, [])

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
      },
    },
  }

  const labels = ['Accuracy']
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
      <h2 className='header'>Model Comparison</h2>
      <div className='modelChart'>
        <Bar options={options} data={data_stats} />
      </div>
    </div>
  )
}

export default ModelStats
