import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Calculator from './calculator/index'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/calculator" />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  )
}

export default App
