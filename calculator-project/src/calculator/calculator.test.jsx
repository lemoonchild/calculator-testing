import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'

import Calculator from './index'

test('displays number when number button is clicked', () => {
  render(<Calculator />)
  const buttonOne = screen.getByText('1')
  fireEvent.click(buttonOne)
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('1')
})

test('handles basic addition operation', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('='))

  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('5')
})

test('clears display when C button is clicked', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('1'))
  expect(screen.getByTestId('display-value')).toHaveTextContent('1')
  fireEvent.click(screen.getByText('C'))
  expect(screen.getByTestId('display-value')).toHaveTextContent('')
})

test('continues operation with previous result', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('×'))
  fireEvent.click(screen.getByText('4'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('='))
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('23')
})

test('calculates using keyboard input', () => {
  render(<Calculator />)
  fireEvent.keyDown(window, { key: '1' })
  fireEvent.keyDown(window, { key: '+' })
  fireEvent.keyDown(window, { key: '2' })
  fireEvent.keyDown(window, { key: 'Enter' })

  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('3')
})

test('displays error when a number is divided by zero', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('6'))
  fireEvent.click(screen.getByText('÷'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('='))
  const display = screen.getByText('ERROR')
  expect(display).toBeInTheDocument()
})

test('changes sign of the number', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('8'))
  fireEvent.click(screen.getByText('±'))
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('-8')
})

test('does not allow more than 9 characters', () => {
  render(<Calculator />)
  const longNumber = '1234567890'.split('')
  longNumber.forEach((num) => fireEvent.click(screen.getByText(num)))
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('123456789')
})

test('allows only one decimal point', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('.'))
  fireEvent.click(screen.getByText('1'))
  fireEvent.click(screen.getByText('.'))
  fireEvent.click(screen.getByText('4'))
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('3.14')
})

test('performs operations consecutively without clearing display', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('='))
  fireEvent.click(screen.getByText('×'))
  fireEvent.click(screen.getByText('4'))
  fireEvent.click(screen.getByText('='))
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('20')
})

test('deletes last character when backspace is pressed', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('7'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('⌫'))
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('7')
})
