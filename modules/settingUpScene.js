import * as THREE from "/modules/three/build/three.module.js";
import { EffectComposer } from "/modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/modules/three/examples/jsm/postprocessing/RenderPass.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  105,
  ((window.innerWidth * 1.2) / window.innerHeight) * 1.2,
  0.1,
  6000
);
camera.name = "Main Cam";
camera.position.x = 4.2445112777750476;
camera.position.y = 41.020833900473804;
camera.position.z = -77.97654415835622;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = Math.pow(0.9, 4.0);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const renderPass = new RenderPass(scene, camera);

export { scene, camera, renderer, renderPass };
