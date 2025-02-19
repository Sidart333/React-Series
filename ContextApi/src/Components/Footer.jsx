import React, { useContext } from 'react'
import { counterContext } from '../Contexts/context'


function Footer() {
    const counter = useContext(counterContext)
  return (
      <div>
          {counter}
    </div>
  )
}

export default Footer