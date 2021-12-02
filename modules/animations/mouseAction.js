import * as THREE from "/modules/three/build/three.module.js";
import { BLOOM_SCENE } from "/modules/creators/bloomLayers.js";
import { scene, camera } from "/modules/settingUpScene.js";
import { chestTexture } from "/modules/loaders/chestMaterial.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const wavSrc = (fileName) => `/static/sound/${fileName}.wav`;
const sounds = [
  new Audio(wavSrc("click")),
  new Audio(wavSrc("explosion")),
  new Audio(wavSrc("pump")),
  new Audio(wavSrc("foundChest")),
  new Audio(wavSrc("fairy")),
  new Audio(wavSrc("fairyHit")),
];
sounds.forEach((audio) => {
  audio.preload = "auto";
  audio.volume = 0.25;
});
const mysteryEvents = {
  hitFairy: new CustomEvent("mysteryEvent", { detail: "hitFairy" }),
  pumpedStar: new CustomEvent("mysteryEvent", { detail: "pumpedStar" }),
  explodedStar: new CustomEvent("mysteryEvent", { detail: "explodedStar" }),
  foundChest: new CustomEvent("mysteryEvent", { detail: "foundChest" }),
  chestColor: new CustomEvent("mysteryEvent", { detail: "chestColor" }),
};
var chestClick = 0;

document.addEventListener("removedPassBarrier", ()=>{
  //console.log("remoooovedddd")
  function highlightSecretBox() {
    //console.log("addClaaaasssy")
    document.querySelector("#achievements").classList.add("pulse");
    setTimeout(
      () => document.querySelector("#achievements").classList.remove("pulse"),
      1300
    );
  }

  let secrets = document.querySelector("#secrets");
  secrets.addEventListener("mouseover", highlightSecretBox);
})


document.addEventListener("restartGame", () => (chestClick = 0));

function onPointerDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const object = intersects[0].object;
    if (/fairy/gi.test(object.name)) {
      document.dispatchEvent(mysteryEvents.hitFairy);
      sounds[5].play();
      setTimeout(() => sounds[4].play(), 100);
      let randomDirection = () => {
          let value = Math.random();
          if (value < 0.333) return ["x", Math.random() / 3];
          if (value < 0.666) return ["y", Math.random() / 3];
          if (value < 1.001) return ["z", Math.random() / 3];
        },
        c = () => Math.random();
      //console.log(object);
      object.material.color.setRGB(c(), c(), c());

      let d1 = randomDirection();
      let d2 = randomDirection();
      let d3 = randomDirection();
      for (let i = 0; i < 200; i++) {
        if (i < 190) {
          setTimeout(() => (object.parent.position[d1[0]] += d1[1]), 7 + i);
          setTimeout(() => (object.parent.position[d2[0]] += d2[1]), 15 + i);
          setTimeout(() => (object.parent.position[d3[0]] += d3[1]), 10 + i);
        }
        if (i >= 150) {
          setTimeout(() => (object.parent.position[d3[0]] -= d1[1]), 3 + i);
          setTimeout(() => (object.parent.position[d1[0]] -= d2[1]), 8 + i);
          setTimeout(() => (object.parent.position[d2[0]] -= d3[1]), 4 + i);
        }
      }
    }
    if (/ball/gi.test(object.name)) {
      document.dispatchEvent(mysteryEvents.pumpedStar);
      sounds[2].play();
      if (object.scale.x < 4 && object.scale.y < 4 && object.scale.z < 4) {
        for (let i = 0; i < 200; i++) {
          setTimeout(() => object.scale.addScalar(0.004), 7 + i);
        }
      }
      if (object.scale.x >= 4 || object.scale.y >= 4 || object.scale.z >= 4) {
        document.dispatchEvent(mysteryEvents.explodedStar);
        setTimeout(()=>sounds[1].play(),200);
        for (let i = 0; i < 200; i++) {
          if (i < 190) {
            setTimeout(() => object.scale.addScalar(1.01), 7 + i);
          }
          if (i >= 190) {
            setTimeout(() => {
              setTimeout(() => {
                object.scale.set(
                  10 - (i - 190),
                  10 - (i - 190),
                  10 - (i - 190)
                );
              }, 5);
            }, 207);
          }
        }
      }
    }
    if (/chest/gi.test(object.name)) {
      if (chestClick == 0) {
        document.dispatchEvent(mysteryEvents.foundChest);
        sounds[3].play();
      }
      if (chestClick == 1) {
        document.dispatchEvent(mysteryEvents.chestColor);
        sounds[0].play();
      }
      if (chestClick > 1) sounds[0].play();
      //console.log(chestClick);
      chestClick++;

      object.traverse(function (node) {
        //console.log(object);
        node.bloomMode = true;
        node.layers.toggle(BLOOM_SCENE);
        setTimeout(() => node.layers.toggle(BLOOM_SCENE), 100);
        if (node.material) {
          if (node.material.opacity < 1) {
            node.material.opacity = 1;
            node.material.transparent = false;
          }
          if (node.material.map == chestTexture[0]) {
            node.material.map = chestTexture[1];
          } else if (node.material.map == chestTexture[1]) {
            node.material.map = chestTexture[0];
          }
        }
      });
    }
  }
}

function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const object = intersects[0].object;
    if (
      /fairy/gi.test(object.name) ||
      /ball/gi.test(object.name) ||
      /chest/gi.test(object.name)
    ) {
      document.body.classList.add("pointerOnObject");
      if (object.material.opacity < 0.5) {
        object.material.opacity += 0.01;
        setTimeout(() => {
          object.material.opacity -= 0.01;
        }, 300);
      }
    } else if (document.body.classList.contains("pointerOnObject")) {
      document.body.classList.remove("pointerOnObject");
    }
  }
}

export { onPointerDown, onPointerMove };
