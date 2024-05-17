import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastNotification } from './components/noti/index.jsx'
import Calculator from './calculator/index'

function App() {
  return (
    <Router>
      <ToastNotification />
      <Routes>
        <Route path="/" element={<Navigate replace to="/calculator" />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  )
}

export default App
