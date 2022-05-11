import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Winner from './Winner'
import Navbar from './components/Navbar'
import Home from './Home'
import About from './About'
import Stats from './Stats'
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='predictor' element={<Winner />} />
          <Route path='predictor/stats' element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
