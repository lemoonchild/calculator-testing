import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import Calculator from '../calculator/index'

test('displays number when number button is clicked', () => {
  render(<Calculator />)
  const buttonOne = screen.getByText('1')
  fireEvent.click(buttonOne)
  const display = screen.getByText('1')
  expect(display).toBeInTheDocument()
})

test('handles basic addition operation', async () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('='))
  const display = screen.getByText('5')
  expect(display).toBeInTheDocument()
})

test('clears display when C button is clicked', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('C'))
  const display = screen.getByText('')
  expect(display).toBeInTheDocument()
})

test('continues operation with previous result', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('*'))
  fireEvent.click(screen.getByText('4'))
  fireEvent.click(screen.getByText('='))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('='))
  const display = screen.getByText('23') // 5 * 4 + 3 = 23
  expect(display).toBeInTheDocument()
})

test('calculates using keyboard input', () => {
  render(<Calculator />)
  fireEvent.keyDown(window, { key: '1' })
  fireEvent.keyDown(window, { key: '+' })
  fireEvent.keyDown(window, { key: '2' })
  fireEvent.keyDown(window, { key: 'Enter' })
  const display = screen.getByText('3')
  expect(display).toBeInTheDocument()
})

test('displays error when a number is divided by zero', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('6'))
  fireEvent.click(screen.getByText('/'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('='))
  const display = screen.getByText('Error')
  expect(display).toBeInTheDocument()
})
