import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Interactive, XR, Controllers, VRButton } from '@react-three/xr'
import { Sky, Text } from '@react-three/drei'
import '@react-three/fiber'
import './style.css'
import { Canvas } from '@react-three/fiber'
import Box from './components/Box'
import Button from './components/Button'
import MovementController from './components/MovementController';
import { OrbitControls } from '@react-three/drei'

function Floor({...props}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#666" />
    </mesh>
  )
}

function App() {

  const color = "red";

  return (
    <>
      <VRButton />
      <Canvas>
        <OrbitControls />
        <XR>
          <Sky sunPosition={[0, 1, 0]} />
          <Floor receiveShadow/>
          <ambientLight />
          <pointLight position={[10, 10, 10]} castShadow={true}/>

          <Box
            color={color}
            // scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            size={[1, 1, 1]}
            position={[0,1,0]}
            castShadow
          />
          <MovementController applyForward={false}/>
          <MovementController
            hand="left"
            applyRotation={false}
            applyHorizontal={true}
          />

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
