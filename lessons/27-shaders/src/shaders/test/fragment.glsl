  precision mediump float;

  varying float vRandom;
  uniform vec3 uColor;
  uniform sampler2D uTexture;

  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= .5 + vElevation;
    gl_FragColor = textureColor;
  }
