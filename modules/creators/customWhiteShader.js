let randomNum = () => Math.round(5.3+Math.random()) / 10;
const _VS = `
void main(){
  vec3 scale = vec3(4.0, 1.0, 1.0);
  gl_Position = projectionMatrix*modelViewMatrix*vec4(position * scale, 11.0);
}`;
function _FS() {
  return `
void main(){
    gl_FragColor = vec4(${randomNum()}, ${randomNum()}, ${randomNum()}, ${randomNum()});
}`;
}
const vertexShader = `
varying vec2 vUv;

void main() {

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`,
  fragmentShader = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;

varying vec2 vUv;

void main() {

  gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

}
`;

export { _VS, _FS, vertexShader, fragmentShader };
