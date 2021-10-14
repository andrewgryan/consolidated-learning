
// Fragment shader

precision mediump float;

uniform float time;
varying vec2 vPosition;

#pragma glslify: noise = require('glsl-noise/simplex/2d');

void main() {
  float gain = noise(sin(time) * vPosition);
  vec3 color = vec3(0.8, 0.3, 0.2);
  gl_FragColor = vec4(gain * color, 1.0);
}
