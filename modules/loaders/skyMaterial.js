import * as THREE from "/modules/three/build/three.module.js";

let skyTexture = new THREE.TextureLoader().load(
    "/static/3Dmodels/FantasySky/textures/Material__25__background_JPG_002_emissive.jpg"
  );
  let skyMaterial = new THREE.MeshMatcapMaterial({
    map: skyTexture,
    side: THREE.DoubleSide,
    depthTest: true,
  });

  export {skyMaterial}