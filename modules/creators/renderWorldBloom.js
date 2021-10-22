import { bloomLayer } from "/modules/creators/bloomLayers.js";
import * as THREE from "/modules/three/build/three.module.js";
import { EffectComposer } from "/modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "/modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { scene, camera, renderer } from "/modules/settingUpScene.js";
import { RenderPass } from "/modules/three/examples/jsm/postprocessing/RenderPass.js";

const renderPass3 = new RenderPass(scene, camera);
const worldBloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  
  function setWorldBloomValues() {
    worldBloomPass.threshold = worldParams.bloomThreshold;
    worldBloomPass.strength = worldParams.bloomStrength;
    worldBloomPass.radius = worldParams.bloomRadius;
  }
  
  const worldParams = {
    exposure: 0.8,
    bloomStrength: 0.8,
    bloomThreshold: 0,
    bloomRadius: 0.8,
  };

const materials = {};
const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });

function renderWorldBloom() {
    setWorldBloomValues();
  scene.traverse(darkenNonBloomed);
  bloomWorldComposer.render();
  scene.traverse(restoreMaterial);
}

function darkenNonBloomed(obj) {
  if (obj.sky === true) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

const bloomWorldComposer = new EffectComposer(renderer);
bloomWorldComposer.addPass(renderPass3);
bloomWorldComposer.renderToScreen = false;
bloomWorldComposer.addPass(worldBloomPass);

export { renderWorldBloom, bloomWorldComposer, worldParams, worldBloomPass };
