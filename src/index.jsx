import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import Experience from './Experience'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
    <XRButton mode={"VR"} />
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