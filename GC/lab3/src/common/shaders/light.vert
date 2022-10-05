#version 300 es

uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uPerspectiveMatrix;

in mat4 a_modelMatrix;
in vec4 a_position;
in vec3 a_normal;
in vec4 a_color;

out vec4 v_color;
out vec3 v_normal;
void main() {

    v_color = a_color;
    v_normal = normalize(vec3(transpose(a_modelMatrix) * vec4(a_normal, 1.0)));

    gl_Position = uProjectionMatrix * uPerspectiveMatrix * uViewMatrix * a_modelMatrix * a_position;
}