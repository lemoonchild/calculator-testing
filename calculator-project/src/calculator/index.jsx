import React, { useState, useEffect, act } from 'react'
import Display from '../components/display/index.jsx'
import Button from '../components/button/index.jsx'
import './styles/calculator.css'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [lastOperator, setLastOperator] = useState('')
  const [prevValue, setPrevValue] = useState('')
  const [shouldReset, setShouldReset] = useState(false)
  const [activeKey, setActiveKey] = useState('')

  const calculateResult = () => {
    if (prevValue != null && lastOperator && !shouldReset) {
      try {
        let result = eval(`${prevValue} ${lastOperator} ${input}`)
        if (result === Infinity || result === -Infinity) {
          setInput('ERROR') // Manejo de división por cero
        } else {
          // Limitar el número de caracteres, incluyendo decimales
          const resultString = result.toString()
          if (resultString.includes('.')) {
            let maxDecimals = 9 - resultString.split('.')[0].length - 1 // Espacio para el punto
            if (maxDecimals < 0) maxDecimals = 0
            result = Number(result.toFixed(maxDecimals))
          }
          setInput(result.toString().slice(0, 9))
        }
        setPrevValue(result.toString())
        setShouldReset(true) // Prepara para la próxima entrada numérica
      } catch (error) {
        setInput('ERROR')
      }
    } else if (shouldReset && lastOperator) {
      setPrevValue(input)
      setInput('')
      setShouldReset(false)
    }
  }

  const handleButtonClick = (value) => {
    if (input === 'Error' && ('0123456789+-*/.'.includes(value) || value === 'C')) {
      clearAll()
      if (value === 'C') return
    }

    if ('+-*/'.includes(value)) {
      if (!shouldReset) {
        setPrevValue(input)
        setShouldReset(true)
      }
      setLastOperator(value)
    } else if (value === 'CE') {
      console.log('Antes de borrar: ', input)
      if (input.length > 0) {
        setInput(input.slice(0, -1))
        console.log('Después de borrar: ', input)
      }
    } else if (value === '=') {
      calculateResult()
      setShouldReset(true) // Prepara el reseteo para la próxima entrada numérica
    } else if (value === 'C') {
      clearAll()
    } else if (value === '.' && !input.includes('.') && input.length < 9) {
      setInput(input + value)
      setShouldReset(false)
    } else if (value === '±') {
      if (input && input !== 'ERROR') {
        setInput(input.startsWith('-') ? input.slice(1) : '-' + input)
      }
    } else if (value !== '.') {
      if (shouldReset) {
        setInput(value)
        setShouldReset(false)
      } else {
        const newValue = input + value
        if (newValue.length <= 9) {
          setInput(newValue)
        }
      }
    }
  }
  const clearAll = () => {
    setInput('')
    setPrevValue(null)
    setLastOperator(null)
    setShouldReset(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event
      switch (key) {
        case 'Enter':
          event.preventDefault()
          calculateResult()
          setActiveKey('=')
          break
        case 'Delete':
          event.preventDefault()
          clearAll()
          setActiveKey('C')
          break
        case '.':
          event.preventDefault()
          handleButtonClick('.')
          setActiveKey('.')
          break
        default:
          const validKeys = '0123456789+-*/=C.'
          if (validKeys.includes(key)) {
            event.preventDefault()
            setActiveKey(key)
            handleButtonClick(key)
          }
          break
      }
    }

    const handleKeyUp = () => {
      setActiveKey(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleButtonClick, calculateResult, clearAll])
  return (
    <div className="calculator">
      <div className="display-container">
        <Display value={input} />
      </div>
      <div className="controls-row">
        <Button
          key="C"
          label="C"
          isActive={activeKey === 'C'}
          onClick={() => handleButtonClick('C')}
        />
        <div className="double-button">
          <Button
            key="CE"
            label="CE"
            isActive={activeKey === 'CE'}
            onClick={() => handleButtonClick('CE')}
          />
        </div>

        <Button
          key="±"
          label="±"
          isActive={activeKey === '±'}
          onClick={() => handleButtonClick('±')}
        />
      </div>
      <div className="keypad">
        <div className="numbers-row">
          {'789456123.0='.split('').map((char, index) => (
            <Button
              key={char}
              label={char}
              isActive={activeKey === char}
              onClick={() => handleButtonClick(char)}
            />
          ))}
        </div>
        <div className="operations-row">
          {'+-*/'.split('').map((char) => (
            <Button
              key={char}
              label={char}
              isActive={activeKey === char}
              onClick={() => handleButtonClick(char)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calculator
