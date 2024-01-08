import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Interactive, XR, Controllers, VRButton } from '@react-three/xr'
import { Sky, Text } from '@react-three/drei'
import '@react-three/fiber'
import './style.css'
import { Canvas } from '@react-three/fiber'
import Button from './components/Button'

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#666" />
    </mesh>
  )
}

function App() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Sky sunPosition={[0, 1, 0]} />
          <Floor />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Controllers />
          <Button position={[0, 0.8, -1]} />
        </XR>
      </Canvas>
    </>
  )
}

//@ts-ignore
const root = createRoot(document.getElementById('root'))
root.render(<App />)
