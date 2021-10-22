import * as THREE from "/modules/three/build/three.module.js";

let fairyBaseTexture = new THREE.TextureLoader().load(
  "/static/3Dmodels/Fairy/textures/fairy_navi_baseColor.png"
);
let fairyBaseMaterial = new THREE.MeshMatcapMaterial({
  map: fairyBaseTexture,
  side: THREE.DoubleSide,
  depthTest: true,
});

let fairyWingTexture = new THREE.TextureLoader().load(
    "/static/3Dmodels/Fairy/textures/fairy_navi_baseColor.png"
  );
  let fairyWingMaterial = new THREE.MeshMatcapMaterial({
    map: fairyWingTexture,
  });

export { fairyBaseMaterial, fairyWingMaterial };
