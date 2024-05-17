import React from 'react'
import '../styles/display.css'

const Display = ({ value }) => {
  return (
    <div className="display" data-testid="display-value">
      {value}
    </div>
  )
}

export default Display
