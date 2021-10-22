import { loadFairy } from "/modules/loaders/loadFairy.js";

function sphereBuilder(THREE, scene, shaderArr) {
  let geometry = new THREE.SphereGeometry(
    2 * Math.random(),
    52 * Math.random(),
    34 * Math.random()
  );
  let material = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: shaderArr[0],
    fragmentShader: shaderArr[1],
    transparent: true,
    opacity: 0.5,
  });
  let sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  return sphere;
}

export { sphereBuilder };
