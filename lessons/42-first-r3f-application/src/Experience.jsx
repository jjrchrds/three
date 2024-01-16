import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Experience = () => {
  const { camera, gl } = useThree();
  const cubeRef = useRef(null);
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta;
    cubeRef.current.rotation.y += delta;
  });
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} damping />

      <ambientLight intensity={1} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh rotation-x={-Math.PI * 0.5} scale={10} position-y={-1}>
        <planeGeometry />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </>
  );
};

export default Experience;
