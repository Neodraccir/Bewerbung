import * as THREE from "/modules/three/build/three.module.js";

const ENTIRE_SCENE = 0,
  BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

export {BLOOM_SCENE, ENTIRE_SCENE, bloomLayer}
