import * as THREE from "/modules/three/build/three.module.js";

function rerenderAfterResize(camera, scene, renderer) {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = Math.pow(0.9, 4.0);
  renderer.shadowMap.enabled = true;
  camera.updateProjectionMatrix();
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  renderer.render(scene, camera);
}

export { rerenderAfterResize };
