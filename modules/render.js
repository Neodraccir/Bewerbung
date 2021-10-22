import * as THREE from "/modules/three/build/three.module.js";
import { EffectComposer } from "/modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "/modules/three/examples/jsm/postprocessing/ShaderPass.js";
import { renderer, renderPass } from "/modules/settingUpScene.js";
import {
  vertexShader,
  fragmentShader,
} from "/modules/creators/customWhiteShader.js";
// import { buildGUI } from "/modules/helpers/buildGUI.js";
import { renderBloom, bloomComposer } from "./creators/renderBloom.js";
import {
  renderWorldBloom,
  bloomWorldComposer,
} from "./creators/renderWorldBloom.js";

const finalPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: bloomWorldComposer.renderTarget2.texture },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    defines: {},
  }),
  "baseTexture"
);
finalPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderPass);
finalComposer.addPass(finalPass);
//finalComposer.addPass(worldBloomPass);

function render() {
  renderBloom();
  renderWorldBloom();
  finalComposer.render();
}

// buildGUI();

export { render };
