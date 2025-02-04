import React, { useState, useEffect, Fragment } from "react";
import { Hands } from "@react-three/xr";
import { useThree } from "@react-three/fiber";
import {
  Box,
  OrbitControls,
  Plane,
  Sphere,
  Sky,
  useMatcapTexture,
} from "@react-three/drei";
import { usePlane, useBox, Physics, useSphere } from "@react-three/cannon";
import JointCollider from "./JointCollider";

function Cube({ position, args = [0.06, 0.06, 0.06] }) {
  const [boxRef] = useBox(() => ({ position, mass: 1, args }));
  const [tex] = useMatcapTexture("C7C0AC_2E181B_543B30_6B6270");

  return (
    <Box ref={boxRef} args={args} castShadow>
      <meshMatcapMaterial attach="material" matcap={tex} />
    </Box>
  );
}

function Ball({ position, args = [0.05, 16, 16] }) {
  const [sphereRef] = useSphere(() => ({ position, mass: 1, args }));
  const [tex] = useMatcapTexture("C7C0AC_2E181B_543B30_6B6270");

  return (
    <Sphere ref={sphereRef} args={args} castShadow>
      <meshMatcapMaterial attach="material" matcap={tex} />
    </Sphere>
  );
}

function HandsReady(props) {
  const [ready, setReady] = useState(false);
  const { gl } = useThree();
  useEffect(() => {
    if (ready) return;
    const joint = gl.xr.getHand(0).joints["index-finger-tip"];
    if (joint?.jointRadius !== undefined) return;
    const id = setInterval(() => {
      const joint = gl.xr.getHand(0).joints["index-finger-tip"];
      if (joint?.jointRadius !== undefined) {
        setReady(true);
      }
    }, 500);
    return () => clearInterval(id);
  }, [gl, ready]);

  return ready ? props.children : null;
}

const HandsColliders = () =>
  [...Array(25)].map((_, i) => (
    <Fragment key={i}>
      <JointCollider index={i} hand={0} / >
      <JointCollider index={i} hand={1} />
    </Fragment>
  ));

function Scene() {
  const [floorRef] = usePlane(() => ({
    args: [10, 10],
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 1, 0],
    type: "Static",
  }));

  const [wallRef1] = usePlane(() => ({
    args: [5, 2],
    position: [0, 2, -2.5],
    type: "Static",
  }));

  const [wallRef2] = usePlane(() => ({
    args: [5, 2],
    rotation: [0, Math.PI * 0.5, 0],
    position: [-2.5, 2, 0],
    type: "Static",
  }));

  const [wallRef3] = usePlane(() => ({
    args: [5, 2],
    rotation: [0, Math.PI, 0],
    position: [0, 2, 2.5],
    type: "Static",
  }));
  return (
    <>
      <Sky />

      <Plane ref={wallRef1} args={[5, 2]} receiveShadow castShadow>
        <meshStandardMaterial attach="material" color="#ff0000" />
      </Plane>
      <Plane ref={wallRef2} args={[5, 2]} receiveShadow castShadow>
        <meshStandardMaterial attach="material" color="#ff0000" />
      </Plane>

      <Plane ref={wallRef3} args={[5, 2]} receiveShadow castShadow>
        <meshStandardMaterial attach="material" color="#ff0000" />
      </Plane>

      <Plane ref={floorRef} args={[10, 10]} receiveShadow>
        <meshStandardMaterial attach="material" color="#fff" />
      </Plane>
      <Hands />
      <HandsReady>
        <HandsColliders />
      </HandsReady>
      {[...Array(7)].map((_, i) => (
        <Ball key={i} position={[0, 1.1 + 0.1 * i, -0.5]} />
      ))}
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={1.25} />
    </>
  );
}

const JuggleExperience = () => (
  <>
    <Physics
      gravity={[0, -9.81, 0]}
      iterations={20}
      defaultContactMaterial={{
        friction: 0.09,
      }}
    >
      <Scene />
    </Physics>
  </>
);

export default JuggleExperience;
