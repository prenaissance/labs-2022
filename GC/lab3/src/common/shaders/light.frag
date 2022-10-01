#version 300 es

precision highp float;

const float ambient = 0.4;
// uniform mat4 uModelMatrix;
uniform vec3 uLightDirection;

in vec4 v_color;
in vec3 v_normal;
out vec4 outColor;

void main() {
    float diffuse = max(dot(v_normal, -normalize(uLightDirection)), 0.0);
    float lightLevel = ambient + diffuse * (1.0 - ambient);
    outColor = v_color * lightLevel + vec4(0.0, 0.0, 0.0, 1.0) * (1.0 - lightLevel);
}