  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  uniform vec2 uFrequency;
  uniform float uTime;
  attribute vec3 position;
  attribute float aRandom;
  attribute vec2 uv;

  uniform vec3 uColor;

  varying vec2 vUv;
  varying float vElevation;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1; // wave z
    // modelPosition.z += aRandom * 0.1; // random z

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += elevation;
 

    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
    vElevation = elevation;
  }
