import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import Experience from './Experience'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
    <VRButton />
        <Canvas>
            <XR>
                <Controllers />
                <Hands />
                <mesh>
                    <boxGeometry />
                    <meshBasicMaterial color="blue" />
                </mesh>
            </XR>
        </Canvas>
    </>
)