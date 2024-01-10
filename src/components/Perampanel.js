import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const Perampanel = () => {
  const fbx = useLoader(FBXLoader, "/Idle_Perampanel.fbx");

  return (
    <primitive object={fbx} position={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} />
  );
};

export default Perampanel;
