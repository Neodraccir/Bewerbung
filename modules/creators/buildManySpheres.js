import * as THREE from "/modules/three/build/three.module.js";
import { BLOOM_SCENE } from "/modules/creators/bloomLayers.js";
import { fairymate } from "/modules/animations/fairymate.js";
import { sphereBuilder } from "/modules/creators/sphereBuilder.js";
import {
  negaOrPosi,
  randomR,
  randomX,
  randomY,
} from "/modules/helpers/randomizePositions.js";
import { _VS, _FS } from "/modules/creators/customWhiteShader.js";
function buildManySpheres(scene) {
  let ballArray = [];
  let ballProp = [];
  let minSpeed = 0.00005;
  let maxSpeed = 0.001;
  for (let i = 0; i < 3400; i++) {
    let ball = sphereBuilder(THREE, scene, [_VS, _FS()]),
      r = randomR(0, 900),
      x = randomX(r),
      y = randomY(r);

    ball.position.set(x, y, randomR(40));
    ball.name = "ball";
    // ball.castShadow = true;
    ball.layers.enable(BLOOM_SCENE);
    ballArray.push(ball);
  }

  for (let i = 0; i < ballArray.length; i++) {
    ballProp.push({
      thetaX: ballArray[i].position.x,
      thetaY: ballArray[i].position.y,
      dtheta: minSpeed + maxSpeed * Math.random() * negaOrPosi(),
      r: 70 + 30 * Math.random(),
    });
  }
  return [ballArray, ballProp];
}

export { buildManySpheres };
