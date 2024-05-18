import React from 'react'
import '../styles/numberButton.css'

const Button = ({ label, isActive, onClick, color, textColor, className }) => {
  return (
    <button
      className={`button ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
      style={{ backgroundColor: color, color: textColor }}
    >
      {label}
    </button>
  )
}

export default Button
