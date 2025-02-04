import { useRef } from "react";
import { useControls } from "leva";
import waterVertexShader from "../shaders/water/vertex.glsl";
import waterFragmentShader from "../shaders/water/fragment.glsl";

const Water = () => {
  const ref = useRef();
  const { time, elevation } = useControls({
    time: 0,
    elevation: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.001,
      label: "uBigWavesElevation",
    },
  });
  return (
    <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={1} ref={ref}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={{ uBigWavesElevation: { value: elevation } }}
      />
    </mesh>
  );
};

export default Water;
