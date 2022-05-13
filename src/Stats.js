import React from 'react'
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
import { getTeam, normalizePercentage } from './utils/common'

import './Stats.scss'

const Stats = (props) => {
  const {
    Home,
    home_stats,
    home_statsp,
    Away,
    away_stats,
    away_statsp,
    elosm,
  } = props

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

  const labels_stats = ['Offensive Rebound', 'Steal', 'Turnover', 'Points']
  const labels_statsp = ['Field Goal %', '3 Pointer %', 'Free Throw %']
  const labels_elosm = ['ELO', 'Secret Metric']

  const data_stats = {
    labels: labels_stats,
    datasets: [
      {
        label: getTeam(Home),
        data: home_stats,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: getTeam(Away),
        data: away_stats,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const data_statsp = {
    labels: labels_statsp,
    datasets: [
      {
        label: getTeam(Home),
        data: normalizePercentage(home_statsp),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: getTeam(Away),
        data: normalizePercentage(away_statsp),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const data_elosm = {
    labels: labels_elosm,
    datasets: [
      {
        label: getTeam(Home),
        data: [elosm[0], elosm[2]],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: getTeam(Away),
        data: [elosm[1], elosm[3]],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className='statsContainer'>
      <div className='glassHeader'>
        <h2 className='header'>Team stats</h2>
      </div>
      <div className='chart'>
        <div className='stats'>
          <Bar options={options} data={data_stats} />
        </div>
        <div className='statsp'>
          <Bar options={options} data={data_statsp} />
        </div>
      </div>
      <div className='elosm'>
        <Bar options={options} data={data_elosm} />
      </div>
    </div>
  )
}

export default Stats
