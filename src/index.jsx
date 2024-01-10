import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Interactive, XR, Controllers, VRButton } from "@react-three/xr";
import { Sky, Text } from "@react-three/drei";
import "@react-three/fiber";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import Box from "./components/Box";
import Button from "./components/Button";
import MovementController from "./components/MovementController";
import { OrbitControls } from "@react-three/drei";
import Experience from "./components/Experience";

function App() {
  const color = "red";

  return (
    <>
      <VRButton />
      <Canvas camera={{ position: [3, 3, 3] }} shadows>
        <OrbitControls />
        <XR>
          <Experience />

          <MovementController applyForward={false} />
          <MovementController
            hand="left"
            applyRotation={false}
            applyHorizontal={true}
          />

          <Controllers />
        </XR>
      </Canvas>
    </>
  );
}

//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(<App />);
