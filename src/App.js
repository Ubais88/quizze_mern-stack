import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/dashboard' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App