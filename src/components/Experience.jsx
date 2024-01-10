import { extend, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

const Experience = () => {
  const Floor = ({ ...props }) => {
    const grassColorTexture = useLoader(
      TextureLoader,
      "/textures/grass/color.jpg"
    );
    const grassAmbientOcclusionTexture = useLoader(
      TextureLoader,
      "/textures/grass/ambientOcclusion.jpg"
    );
    const grassNormalTexture = useLoader(
      TextureLoader,
      "/textures/grass/normal.jpg"
    );
    const grassRoughnessTexture = useLoader(
      TextureLoader,
      "/textures/grass/roughness.jpg"
    );

    grassColorTexture.repeat.set(8, 8);
    grassAmbientOcclusionTexture.repeat.set(8, 8);
    grassNormalTexture.repeat.set(8, 8);
    grassRoughnessTexture.repeat.set(8, 8);

    grassColorTexture.wrapS = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    grassNormalTexture.wrapS = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

    grassColorTexture.wrapT = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    grassNormalTexture.wrapT = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} {...props} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          map={grassColorTexture}
          aoMap={grassAmbientOcclusionTexture}
          normalMap={grassNormalTexture}
          roughnessMap={grassRoughnessTexture}
        />
      </mesh>
    );
  };

  const Walls = () => {
    const bricksColorTexture = useLoader(
      TextureLoader,
      "/textures/bricks/color.jpg"
    );
    const bricksAmbientOcclusionTexture = useLoader(
      TextureLoader,
      "/textures/bricks/ambientOcclusion.jpg"
    );
    const bricksNormalTexture = useLoader(
      TextureLoader,
      "/textures/bricks/normal.jpg"
    );
    const bricksRoughnessTexture = useLoader(
      TextureLoader,
      "/textures/bricks/roughness.jpg"
    );

    return (
      <mesh position-y={1.25} castShadow>
        <boxGeometry args={[4, 2.5, 4]} />
        <meshStandardMaterial
          map={bricksColorTexture}
          aoMap={bricksAmbientOcclusionTexture}
          normalMap={bricksNormalTexture}
          roughnessMap={bricksRoughnessTexture}
        />
      </mesh>
    );
  };

  const Roof = () => {
    return (
      <mesh position={[0, 3, 0]} rotation-y={Math.PI * 0.25}>
        <coneGeometry args={[3.5, 1, 4]} />
        <meshStandardMaterial color="darkslategrey" />
      </mesh>
    );
  };

  const Bush = ({ ...props }) => {
    return (
      <mesh {...props} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="green" />
      </mesh>
    );
  };

  const Door = ({ ...props }) => {
    const color = useLoader(TextureLoader, "/textures/door/color.jpg");
    const ambientOcclusion = useLoader(
      TextureLoader,
      "/textures/door/ambientOcclusion.jpg"
    );
    const alpha = useLoader(TextureLoader, "/textures/door/alpha.jpg");
    const height = useLoader(TextureLoader, "/textures/door/height.jpg");
    const metalness = useLoader(TextureLoader, "/textures/door/metalness.jpg");
    const roughness = useLoader(TextureLoader, "/textures/door/roughness.jpg");
    const normal = useLoader(TextureLoader, "/textures/door/normal.jpg");

    return (
      <mesh {...props}>
        <planeGeometry args={[2.2, 2.2, 100, 100]} />
        <meshStandardMaterial
          map={color}
          alphaMap={alpha}
          displacementMap={height}
          displacementScale={0.1}
          transparent
          aoMap={ambientOcclusion}
          metalnessMap={metalness}
          roughnessMap={roughness}
          normalMap={normal}
        />
      </mesh>
    );
  };

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
        <DoorLight />
        <Door position={[0, 1, 2.01]} />
        <Walls />
        {bushes.map((bush, index) => (
          <Bush key={index} {...bush} />
        ))}
      </group>
    );
  };

  const Graves = () => {
    const count = 50;

    const Grave = ({ ...props }) => {
      return (
        <mesh {...props} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.2]} />
          <meshStandardMaterial color="grey" />
        </mesh>
      );
    };
    return (
      <group>
        {[...Array(count)].map((_, index) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = 3 + Math.random() * 12;
          return (
            <Grave
              key={index}
              position={[
                Math.cos(angle) * radius,
                0.3,
                Math.sin(angle) * radius,
              ]}
              rotation={[
                0,
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4,
              ]}
            />
          );
        })}
      </group>
    );
  };

  const DoorLight = () => {
    return (
      <pointLight
        position={[0, 2.2, 2.7]}
        color={"#ff7d46"}
        intensity={3}
        distance={7}
        castShadow
      />
    );
  };

  const Ghosts = () => {
    const ghost1 = useRef();
    const ghost2 = useRef();
    const ghost3 = useRef();

    useFrame((state, delta) => {
      const elapsedTime = state.clock.getElapsedTime();

      const ghost1Angle = elapsedTime * 0.5;
      ghost1.current.position.x = Math.cos(ghost1Angle) * 4;
      ghost1.current.position.z = Math.sin(ghost1Angle) * 4;
      ghost1.current.position.y = Math.sin(elapsedTime * 3);

      const ghost2Angle = -elapsedTime * 0.32;
      ghost2.current.position.x = Math.cos(ghost2Angle) * 5;
      ghost2.current.position.z = Math.sin(ghost2Angle) * 5;
      ghost2.current.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

      const ghost3Angle = -elapsedTime * 0.18;
      ghost3.current.position.x =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
      ghost3.current.position.z =
        Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
      ghost3.current.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    });

    return (
      <group>
        <pointLight
          ref={ghost1}
          position={[0, 2, 0]}
          color={"#ff00ff"}
          intensity={1}
          distance={7}
        />
        <pointLight
          ref={ghost2}
          position={[2, 2, 0]}
          color={"#00ffff"}
          intensity={1}
          distance={7}
        />
        <pointLight
          ref={ghost3}
          position={[-2, 2, 0]}
          color={"#ffff00"}
          intensity={1}
          distance={7}
        />
      </group>
    );
  };

  return (
    <>
      <color attach="background" args={["#262837"]} />
      <fog attach="fog" color="#262837" near={1} far={15} />
      <ambientLight color={"#b9d5ff"} intensity={0.12} />
      <directionalLight
        color={"#ffffff"}
        position={[4, 5, -2]}
        intensity={0.26}
        castShadow
        shadow-mapSize={256}
      />
      <House />
      <Graves />
      <Ghosts />
      <Floor />
    </>
  );
};

export default Experience;
