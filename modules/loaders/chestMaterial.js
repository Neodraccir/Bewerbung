import * as THREE from "/modules/three/build/three.module.js";
import { _VS, _FS } from "/modules/creators/customWhiteShader.js";

let chestTexture = [
  new THREE.TextureLoader().load(
    "/static/3Dmodels/chest/textures/material_0_baseColor.png"
  ),
  new THREE.TextureLoader().load(
    "/static/3Dmodels/chest/textures/material_0_baseColor2.png"
  ),
];
let chestMaterial = new THREE.MeshLambertMaterial({
  map: chestTexture[1],
  side: THREE.DoubleSide,
  // vertexShader: _VS,
  // fragmentShader: _FS,
  depthTest: true,
  needsUpdate: true,
});

export { chestMaterial, chestTexture };
