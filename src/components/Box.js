const Box = ({ color, size, scale, children, ...rest }) => {
  return (
    <mesh scale={scale} {...rest}>
      <boxGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  );
};
export default Box;
