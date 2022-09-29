#version 300 es

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uPerspectiveMatrix;

in vec4 a_position;

out vec4 v_color;
// all shaders have a main function
void main() {

  v_color = vec4(0.12, 0.39, 0.39, 1);

  gl_Position = uProjectionMatrix * uPerspectiveMatrix * uViewMatrix * uModelMatrix * a_position;
}