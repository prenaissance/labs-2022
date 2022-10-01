#version 300 es

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uPerspectiveMatrix;

in vec4 a_position;
in vec3 a_normal;

out vec4 v_color;
out vec3 v_normal;
void main() {

    v_color = vec4(0.39f, 0.12f, 0.33f, 1);
    v_normal = a_normal;

    gl_Position = uProjectionMatrix * uPerspectiveMatrix * uViewMatrix * uModelMatrix * a_position;
}