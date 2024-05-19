import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Button from './index.jsx'

describe('Button component', () => {
  it('renders with given label and handles click', () => {
    const handleClick = vi.fn()
    render(<Button label="Test Button" onClick={handleClick} isActive={false} />)

    const button = screen.getByText('Test Button')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies active class when isActive is true', () => {
    render(<Button label="Active Button" onClick={() => {}} isActive={true} />)
    const button = screen.getByText('Active Button')
    expect(button).toHaveClass('active')
  })
})
