import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  PivotControls,
  TransformControls,
} from "@react-three/drei";

export default function Experience() {
  const cubeRef = useRef();

  const { camera, gl } = useThree();

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </PivotControls>
      <Html className="label">test</Html>

      <mesh ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <TransformControls object={cubeRef} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
