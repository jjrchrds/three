import { useThree, useFrame } from "@react-three/fiber";
import { joints } from "./joints";
import { useSphere } from "@react-three/cannon";
import { Sphere, Box } from "@react-three/drei";

const JointCollider = ({ index, hand }) => {
  const { gl } = useThree();
  const handObj = gl.xr.getHand(hand);
  const joint = handObj.joints[joints[index]];
  const size = joint.jointRadius ?? 0.0001;

  const [tipRef, api] = useSphere(() => ({
    args: [size],
    position: [-1, 0, 0],
  }));

  const WristController = () => {
    return (
      <Box>
        <meshBasicMaterial opacity={0} attach="material" />
      </Box>
    );
  };

  useFrame(() => {
    if (joint === undefined) return;
    api.position.set(joint.position.x, joint.position.y, joint.position.z);
  });

  return (
    <Sphere ref={tipRef} args={[size]}>
      <meshBasicMaterial opacity={0} attach="material" />
    </Sphere>
  );
};

export default JointCollider;
