import React, { useState, useEffect } from 'react'
import Display from '../components/display/index.jsx'
import Button from '../components/button/index.jsx'
import './styles/calculator.css'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [lastOperator, setLastOperator] = useState('')
  const [prevValue, setPrevValue] = useState('')
  const [shouldReset, setShouldReset] = useState(false)
  const [activeKey, setActiveKey] = useState('')

  const calculateResult = (operator, currentValue, previousValue) => {
    const a = parseFloat(previousValue)
    const b = parseFloat(currentValue)
    if (isNaN(a) || isNaN(b)) return ''

    let result
    switch (operator) {
      case '+':
        result = a + b
        break
      case '-':
        result = a - b
        break
      case '*':
        result = a * b
        break
      case '/':
        result = b === 0 ? 'ERROR' : a / b
        break
      default:
        return ''
    }

    if (result < 0) {
      return 'ERROR'
    } else if (result > 999999999) {
      return 'ERROR'
    }

    const resultString = result.toString()
    if (resultString.length > 9) {
      return 'ERROR'
    }

    return resultString
  }

  const handleButtonClick = (value) => {
    if (input === 'ERROR' && ('0123456789+×÷.-'.includes(value) || value === 'C')) {
      clearAll()
      if (value === 'C') return
    }

    if ('+×÷-'.includes(value)) {
      const operator = value === '×' ? '*' : value === '÷' ? '/' : value

      if (lastOperator && prevValue !== '' && input !== '') {
        const result = calculateResult(lastOperator, input, prevValue)
        setInput(result)
        setPrevValue(result)
      } else {
        setPrevValue(input)
      }

      setLastOperator(operator)
      setShouldReset(true)
    } else if (value === 'CE') {
      if (input.length > 0) {
        setInput(input.slice(0, -1))
      }
    } else if (value === '=') {
      if (lastOperator && prevValue !== '' && input !== '') {
        const result = calculateResult(lastOperator, input, prevValue)
        setInput(result)
        setPrevValue(result)
      }
      setShouldReset(true)
      setLastOperator('')
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
    setPrevValue('')
    setLastOperator('')
    setShouldReset(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event
      const keyMappings = {
        Enter: '=',
        Delete: 'C',
        Backspace: 'CE',
        '*': '×',
        '/': '÷',
      }

      const keyValue = keyMappings[key] || key

      if (
        '0123456789+×÷-='.includes(keyValue) ||
        keyValue === 'C' ||
        keyValue === '.' ||
        keyValue === 'CE'
      ) {
        event.preventDefault()
        setActiveKey(keyValue)
        handleButtonClick(keyValue)
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
  }, [handleButtonClick])

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
          color="#a02022"
          textColor="#ffffff"
        />
        <div className="double-button">
          <Button
            key="⌫"
            label="⌫"
            isActive={activeKey === 'CE'}
            onClick={() => handleButtonClick('CE')}
            color="#4a4a4a"
            textColor="#ffffff"
          />
        </div>
        <Button
          key="±"
          label="±"
          isActive={activeKey === '±'}
          onClick={() => handleButtonClick('±')}
          color="#4a4a4a"
          textColor="#ffffff"
        />
      </div>
      <div className="keypad">
        <div className="numbers-row">
          {'7894561230'.split('').map((char) => (
            <Button
              key={char}
              label={char}
              isActive={activeKey === char}
              onClick={() => handleButtonClick(char)}
              color="#bbbbbb"
              textColor="#000000"
            />
          ))}
          <Button
            key="."
            label="."
            isActive={activeKey === '.'}
            onClick={() => handleButtonClick('.')}
            color="#4a4a4a"
            textColor="#ffffff"
          />
          <Button
            key="-"
            label="-"
            isActive={activeKey === '-'}
            onClick={() => handleButtonClick('-')}
            color="#4a4a4a"
            textColor="#ffffff"
          />
        </div>
        <div className="operations-row">
          {'+÷×'.split('').map((char) => (
            <Button
              key={char}
              label={char}
              isActive={activeKey === char}
              onClick={() => handleButtonClick(char)}
              color="#4a4a4a"
              textColor="#ffffff"
            />
          ))}
          <Button
            key="="
            label="="
            isActive={activeKey === '='}
            onClick={() => handleButtonClick('=')}
            color="#a02022"
            textColor="#ffffff"
          />
        </div>
      </div>
    </div>
  )
}

export default Calculator
