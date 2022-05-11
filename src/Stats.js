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
import { getTeam } from './utils/common'

import axios from 'axios'
import './Stats.scss'

const Stats = () => {
  const Home = sessionStorage.getItem('home')
  const Away = sessionStorage.getItem('away')

  const [home_stats, setHomeStats] = useState([])
  const [home_statsp, setHomeStatsp] = useState([])
  const [away_stats, setAwayStats] = useState([])
  const [away_statsp, setAwayStatsp] = useState([])
  const [elosm, setElosm] = useState([])

  useEffect(() => {
    const params = { Home, Away }

    axios
      .post('http://localhost:8080/teamstats', params)
      .then((res) => {
        const data = res.data.data
        setHomeStats([...data['home']])
        setHomeStatsp([...data['home%']])
        setAwayStats([...data['away']])
        setAwayStatsp([...data['away%']])
        setElosm({ ...data.elosm })
      })
      .catch((error) => {
        alert(error)
      })
  }, [Away, Home])

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
        data: home_statsp,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: getTeam(Away),
        data: away_statsp,
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
      <h2>{`${getTeam(Home)} v/s ${getTeam(Away)}`}</h2>
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
