import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Experience = () => {

  const Floor = ({...props}) => {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    )
  }

  const Walls = () => {
    return (
      <mesh position-y={1.25}>
      <boxGeometry args={[4, 2.5, 4]}/>
      <meshStandardMaterial color="hotpink" />
    </mesh>
    )
  }

  const Roof = () => {
    return (
      <mesh position={[0, 3, 0]} rotation-y={Math.PI * .25}>
      <coneGeometry args={[3.5, 1, 4]} />
      <meshStandardMaterial color="darkslategrey" />
      </mesh>
    )
  }

  const Bush = ({...props}) => {
    return (
      <mesh {...props}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="green" />
      </mesh> 
    )
  }

  const Door = ({...props}) => {
    return (
      <mesh {...props}>
        <planeGeometry args={[2.2, 2.2, 100, 100]} />
        <meshStandardMaterial color="brown" />
      </mesh>
    
    )
  }

  const House = () => {
    const bushes = [
      { scale: 0.5, position: [0.8, 0.2, 2.2] },
      { scale: 0.25, position: [1.4, 0.1, 2.1] },
      { scale: 0.4, position: [-0.8, 0.1, 2.2] },
      { scale: 0.15, position: [-1, 0.05, 2.6] },
    ];

    return (
      <group>
        <Roof />
        <Door position={[0, 1, 2.01]} />
        <Walls />
        {bushes.map((bush, index) => <Bush key={index} {...bush}/>)}

      </group>
    )
  }

  

  return (
    <>
    <ambientLight intensity={1} />
    <directionalLight position={[1, 2, 3]} intensity={4.5} />
    <House/>
    <Floor/>
      {/* 


      
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
      </mesh> */}
    </>
  );
};

export default Experience;
