import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'

import Calculator from '../calculator/index'

test('displays number when number button is clicked', () => {
  render(<Calculator />)
  const buttonOne = screen.getByText('1') // Esto obtiene el botón '1'
  fireEvent.click(buttonOne)
  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('1') // Verifica que el contenido del display es '1'
})

test('handles basic addition operation', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('2')) // Presiona el botón '2'
  fireEvent.click(screen.getByText('+')) // Presiona el botón '+'
  fireEvent.click(screen.getByText('3')) // Presiona el botón '3'
  fireEvent.click(screen.getByText('=')) // Presiona el botón '='

  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('5') // Verifica que el contenido del display es '5'
})

test('clears display when C button is clicked', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('9')) // Presiona el botón '9'
  fireEvent.click(screen.getByText('+')) // Presiona el botón '+'
  fireEvent.click(screen.getByText('1')) // Presiona el botón '1'
  // Verifica que el display muestra '1' (el último número ingresado)
  expect(screen.getByTestId('display-value')).toHaveTextContent('1')
  // Presiona el botón 'C' para limpiar el display
  fireEvent.click(screen.getByText('C'))
  // Verifica que el display está vacío después de limpiar
  expect(screen.getByTestId('display-value')).toHaveTextContent('')
})

test('continues operation with previous result', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('5')) // Presiona 5
  fireEvent.click(screen.getByText('*')) // Multiplica por
  fireEvent.click(screen.getByText('4')) // 4
  fireEvent.click(screen.getByText('+')) // Suma
  fireEvent.click(screen.getByText('3')) // 3
  fireEvent.click(screen.getByText('=')) // Igual a

  const display = screen.getByTestId('display-value') // Selección del display por test ID
  expect(display).toHaveTextContent('23') // Verifica que el resultado es 23
})

test('calculates using keyboard input', () => {
  render(<Calculator />)
  fireEvent.keyDown(window, { key: '1' }) // Presiona '1'
  fireEvent.keyDown(window, { key: '+' }) // Presiona '+'
  fireEvent.keyDown(window, { key: '2' }) // Presiona '2'
  fireEvent.keyDown(window, { key: 'Enter' }) // Presiona 'Enter' para calcular

  const display = screen.getByTestId('display-value')
  expect(display).toHaveTextContent('3') // Verifica que el contenido del display es '3'
})

test('displays error when a number is divided by zero', () => {
  render(<Calculator />)
  fireEvent.click(screen.getByText('6'))
  fireEvent.click(screen.getByText('/'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('='))
  const display = screen.getByText('ERROR')
  expect(display).toBeInTheDocument()
})
