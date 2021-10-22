import * as THREE from "/modules/three/build/three.module.js";
import { GLTFLoader } from "/modules/three/examples/jsm/loaders/GLTFLoader.js";
import { chestMaterial } from "/modules/loaders/chestMaterial.js";

const loader = new GLTFLoader();
async function loadChest(src, scene) {
  loader.load(
    src,
    function doIt(gltf) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());

      let chest = gltf.scene;
      chest.position.y = 11;
      scene.add(gltf.scene);

      chest.name = "chest";
      chest.position.set(0, -660, 50);

      chest.receiveShadow = true;
      chest.castShadow = true;

      chest.traverse(function (node) {
        node.material = chestMaterial;
        node.chest = true;
      });
      for (let vector in chest.scale) {
        chest.scale[vector] = 0.7;
      }

      chest.traverse(function (node) {
        node.name = "chest_" + node.name;
        node.bloomMode = false;
      });
      chest.material.transparent = true;
      chest.material.opacity = 0.05;

      gltf.scene.position.x += gltf.scene.position.x - center.x;
      gltf.scene.position.y += gltf.scene.position.y - center.y;
      gltf.scene.position.z += gltf.scene.position.z - center.z;

      let finishedLoading = new CustomEvent("loadedChest", {
        detail: chest,
      });
      document.dispatchEvent(finishedLoading);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% of chest loaded");
    },
    function (error) {
      console.error(error);
    }
  );
}
export { loadChest };
