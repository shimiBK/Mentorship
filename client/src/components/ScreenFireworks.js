import React from 'react'
import { Fireworks } from '@fireworks-js/react'

const ScreenFireworks = () => {
  return (
    <Fireworks
    options={{
      rocketsPoint: {
        min: 0,
        max: 100
      }
    }}
    style={{
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      position: 'fixed',
      sound: 'true'
    }}
/>
  )
}

export default ScreenFireworks
