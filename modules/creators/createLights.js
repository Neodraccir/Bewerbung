import * as THREE from "/modules/three/build/three.module.js";

function createLights(scene) {
  const pointLight = new THREE.PointLight(0x1F85DE);
  pointLight.position.set(0, 10, 4);

  const ambientLight = new THREE.AmbientLight(0x1F85DE, 0.01);
  ambientLight.position.set(5, 5, 5);

  const dirLight = new THREE.DirectionalLight(0x1F85DE, 5.3);
  dirLight.position.set(0, -600, 50);
  dirLight.target.position.set(0, -660, 50);

  scene.add(pointLight, ambientLight, dirLight);

  return [pointLight, ambientLight, dirLight];
}

export { createLights };
