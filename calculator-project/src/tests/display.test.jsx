import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Display from '../components/display/index'

describe('Display component', () => {
  it('displays the value passed to it', () => {
    const testValue = '123456'
    render(<Display value={testValue} />)
    const display = screen.getByText(testValue)
    expect(display).toBeInTheDocument()
  })
})
