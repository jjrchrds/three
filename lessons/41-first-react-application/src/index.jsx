import './style.css'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

const root = createRoot(document.querySelector('#root'))

root.render(
    <h1>Hello React</h1>
)