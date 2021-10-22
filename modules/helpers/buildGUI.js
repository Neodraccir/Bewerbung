import { GUI } from "/modules/three/examples/jsm/libs/dat.gui.module.js";
import {  fairyParams, fairyBloomPass } from "/modules/creators/renderBloom.js";
import {  worldParams, worldBloomPass } from "/modules/creators/renderWorldBloom.js";

import { scene, camera, renderer, renderPass } from "/modules/settingUpScene.js";


const gui = new GUI();
const folder = gui.addFolder("Bloom Fairy Parameters");
const folder2 = gui.addFolder("Bloom World Parameters");

function buildGUI() {
  folder.add(fairyParams, "exposure", 0.01, 1).onChange(function (value) {
    renderer.toneMappingExposure = Math.pow(value, 4.0);
  });

  folder
    .add(fairyParams, "bloomThreshold", 0.0, 1.0)
    .onChange(function (value) {
      fairyBloomPass.threshold = Number(value);
    });

  folder.add(fairyParams, "bloomStrength", 0.0, 3.0).onChange(function (value) {
    fairyBloomPass.strength = Number(value);
  });

  folder
    .add(fairyParams, "bloomRadius", 0.0, 1.0)
    .step(0.01)
    .onChange(function (value) {
      fairyBloomPass.radius = Number(value);
    });

  folder2.add(worldParams, "exposure", 0.01, 1).onChange(function (value) {
    renderer.toneMappingExposure = Math.pow(value, 4.0);
  });

  folder2
    .add(worldParams, "bloomThreshold", 0.0, 1.0)
    .onChange(function (value) {
      worldBloomPass.threshold = Number(value);
    });

  folder2
    .add(worldParams, "bloomStrength", 0.0, 3.0)
    .onChange(function (value) {
      worldBloomPass.strength = Number(value);
    });

  folder2
    .add(worldParams, "bloomRadius", 0.0, 1.0)
    .step(0.01)
    .onChange(function (value) {
      worldBloomPass.radius = Number(value);
    });
}
export {buildGUI}