
// Vertex shader

precision mediump float;

attribute vec2 position;
uniform mat4 model, view, projection;
uniform float time;
varying vec2 vPosition;

void main() {
    vPosition = position;
    gl_Position = projection * view * model * vec4(position, 0.0, 1.0);
}
