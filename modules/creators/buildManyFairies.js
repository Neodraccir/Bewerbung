import * as THREE from "/modules/three/build/three.module.js";

import { loadFairy } from "/modules/loaders/loadFairy.js";
import { fairymate } from "/modules/animations/fairymate.js";
import {
  negaOrPosi,
  randomR,
  randomX,
  randomY,
} from "/modules/helpers/randomizePositions.js";

async function buildManyFairies(scene) {
  THREE.Cache.enabled = true;

  let fairyArray = [];
  let fairyProp = [];
  let amountOfFairies = 5;

  let finishedCreating = new CustomEvent("createdAllFairies", {
    detail: { fairyArray: fairyArray, fairyProp: fairyProp },
  });

  for (let i = 0; i < amountOfFairies; i++) {
    let id = i;
    loadFairy("/static/3Dmodels/Fairy/scene.gltf", scene, id);
    var fairy, mixer, clock;
    document.addEventListener("loadedFairy" + id, (e) => {
      let name = e.detail.name;
      fairy = scene.getObjectByName(name, true);
      clock = e.detail.clock;
      mixer = e.detail.mixer;
      let r = randomR(30, 50),
        x = randomX(r),
        y = randomY(r),
        z = randomX(r);
      let minSpeed = 0.007;
      let maxSpeed = 0.01;

      fairy.position.set(x, y, z);
      fairymate(mixer, clock);
      fairyArray.push(fairy);

      function spreadPositionsWidely(array, calledNum) {
        let minDistance = 5;
        if (calledNum > 7) return;
        function differenceIsLessThan(prop1, prop2) {
          return Math.abs(prop1 - prop2) < minDistance;
        }
        function addToValue(x) {
          if (calledNum > 5) {
            if (x < 0) x -= calledNum;
            if (x >= 0) x += calledNum;
          }
        }
        for (let i = 0; i < array.length; i++) {
          if (differenceIsLessThan(array[i].position.x, x)) {
            addToValue(x);
            if (calledNum <= 5) x = randomX(r);
            return spreadPositionsWidely(array, ++calledNum);
          }
          if (differenceIsLessThan(array[i].position.y, y)) {
            addToValue(y);
            if (calledNum <= 5) y = randomY(r);
            return spreadPositionsWidely(array, ++calledNum);
          }
        }
      }
      spreadPositionsWidely(fairyArray, 1);
      fairyProp.push({
        thetaX: fairy.position.x,
        thetaY: fairy.position.y,
        thetaZ: fairy.position.z,
        dtheta: minSpeed + (maxSpeed * Math.random()) * negaOrPosi(),
        r: r,
      });

      if (id + 1 == amountOfFairies) {
        console.log("creating event...", i);
        console.log(finishedCreating);
        document.dispatchEvent(finishedCreating);
      }
    });
  }
}

export { buildManyFairies };
