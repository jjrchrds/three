uniform float uTime;
uniform float uBigWavesElevation;
void main() 
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Elevation
    float elevation = sin(modelPosition.x) * uBigWavesElevation;
    modelPosition.y += elevation;

   
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
}