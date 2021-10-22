import { fairyBaseMaterial } from "/modules/loaders/fairyMaterial.js";
import * as THREE from "/modules/three/build/three.module.js";
import { GLTFLoader } from "/modules/three/examples/jsm/loaders/GLTFLoader.js";
import { BLOOM_SCENE } from "/modules/creators/bloomLayers.js";

const theFairy = new GLTFLoader();
async function loadFairy(src, scene, id) {
  theFairy.load(
    src,
    function (gltf) {
      let fairy = gltf.scene;
      let name = "fairy" + id;
      fairy.clock = new THREE.Clock();
      fairy.mixer = new THREE.AnimationMixer(fairy);
      gltf.animations.forEach((clip) => {
        fairy.mixer.clipAction(clip).play();
      });
      scene.add(fairy);
      fairy.name = name;
      let namedFairy = new CustomEvent("namedFairy" + id);
      document.dispatchEvent(namedFairy);
    },
    function onLoaded(xhr) {
      console.log(
        (xhr.loaded / xhr.total) * 100 + "% of fairy" + id + " loaded"
      );
      document.addEventListener("namedFairy" + id, () => {
        let fairy = scene.getObjectByName("fairy" + id);
        let size = Math.random();
        let nOp = Math.random() > 0.5 ? -1 : 1;
        fairy.scale.x = size;
        fairy.scale.y = size;
        fairy.scale.z = size;
        let hasChildren = (target) => target?.children?.length > 0;
        function setAttributes(target) {
          if (target.name == "fairy_reference_001_fairy_navi_0") {
            target.material = fairyBaseMaterial;
            target.layers.enable(BLOOM_SCENE);
          }
          if (hasChildren(target)) {
            target.children.forEach((t) => setAttributes(t));
          }
        }
        setAttributes(fairy);
        let finishedLoading = new CustomEvent("loadedFairy" + id, {
          detail: {
            name: "fairy" + id,
            fairy: fairy,
            mixer: fairy.mixer,
            clock: fairy.clock,
          },
        });
        document.dispatchEvent(finishedLoading);
      });
    },
    function (error) {
      console.error(error);
    }
  );
}

export { loadFairy };
