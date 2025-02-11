import React from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
    const {userid}= useParams()
  return (
    <div className='text-center text-4xl py-4'>User: {userid} </div>
  )
}

