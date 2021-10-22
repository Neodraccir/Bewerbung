import { bloomLayer } from "/modules/creators/bloomLayers.js";
import * as THREE from "/modules/three/build/three.module.js";
import { EffectComposer } from "/modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "/modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { scene, camera, renderer } from "/modules/settingUpScene.js";
import { RenderPass } from "/modules/three/examples/jsm/postprocessing/RenderPass.js";

const renderPass2 = new RenderPass(scene, camera);

//adding bloom fairy
const fairyBloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);

const fairyParams = {
  exposure: 1,
  bloomStrength: 3,
  bloomThreshold: 0,
  bloomRadius: 0,
};

function setFairyBloomValues() {
  fairyBloomPass.threshold = fairyParams.bloomThreshold;
  fairyBloomPass.strength = fairyParams.bloomStrength;
  fairyBloomPass.radius = fairyParams.bloomRadius;
}

const materials = {};
const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });

function renderBloom() {
  setFairyBloomValues();
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
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

const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(renderPass2);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(fairyBloomPass);

export { renderBloom, bloomComposer, fairyParams, fairyBloomPass };
