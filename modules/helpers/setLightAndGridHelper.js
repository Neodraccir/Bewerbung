import * as THREE from "/modules/three/build/three.module.js";

function setLightAndGridHelper(scene, pointLight, dirLight) {
  const lightHelper = new THREE.PointLightHelper(pointLight);
  const lightHelper2 = new THREE.DirectionalLightHelper(dirLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper, lightHelper2, gridHelper);
  return [lightHelper, lightHelper2, gridHelper];
}

export { setLightAndGridHelper };
