import Box from "./Box";
import { useState } from "react";
import { Interactive } from "@react-three/xr";
import { Text } from "@react-three/drei";

const Button = ({ ...props }) => {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(0x123456);

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
  };

  return (
    <Interactive
      onClick={onSelect}
      onSelect={onSelect}
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Box
        color={color}
        scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        size={[0.4, 0.1, 0.1]}
        {...props}
      >
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.05}
          color="#fff"
          anchorX="center"
          anchorY="middle"
        >
          Hello react-xr!
        </Text>
      </Box>
    </Interactive>
  );
};

export default Button;
