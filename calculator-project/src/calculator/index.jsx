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
        const result = eval(`${prevValue} ${lastOperator} ${input}`) // ¡Cuidado con eval en producción!
        setInput(String(result))
        setPrevValue(null) // Resetea prevValue para nuevas operaciones
        setLastOperator(null) // Limpia el operador para nuevas operaciones
        setShouldReset(true) // Prepara el reseteo para la próxima entrada numérica
      } catch (error) {
        setInput('Error')
      }
    }
  }

  const handleButtonClick = (value) => {
    if ('+-*/'.includes(value)) {
      if (!shouldReset) {
        setPrevValue(input) // Guarda el input actual como prevValue para la operación
        setShouldReset(true) // Marca para resetear el input en el siguiente número
      }
      setLastOperator(value) // Establece el operador actual
    } else if (value === '=') {
      calculateResult()
      setShouldReset(true) // Prepara el reseteo para la próxima entrada numérica
    } else if (value === 'C') {
      setInput('')
      setPrevValue(null)
      setLastOperator(null)
      setShouldReset(false)
    } else {
      if (shouldReset) {
        setInput(value) // Reset input y comienza con nuevo número
        setShouldReset(false) // Desmarca el reseteo, ahora ingresando un nuevo número
      } else {
        setInput(input + value) // Añade al número actual en display
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
        default:
          const validKeys = '0123456789+-*/=C'
          if (validKeys.includes(key.toUpperCase())) {
            event.preventDefault()
            setActiveKey(key.toUpperCase())
            handleButtonClick(key.toUpperCase() === 'C' ? 'C' : key)
          }
          break
      }
    }

    const handleKeyUp = () => {
      setActiveKey(null) // Remove highlight when key is released
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
      <Display value={input} />
      <div className="keypad">
        {'C1234567890+-*/='.split('').map((char) => (
          <Button
            key={char}
            label={char}
            isActive={activeKey === char}
            onClick={() => handleButtonClick(char)}
          />
        ))}
      </div>
    </div>
  )
}

export default Calculator
