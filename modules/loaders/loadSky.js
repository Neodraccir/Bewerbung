import { GLTFLoader } from "/modules/three/examples/jsm/loaders/GLTFLoader.js";
import { skyMaterial } from "/modules/loaders/skyMaterial.js";

const loader = new GLTFLoader();
async function loadSky(src, scene) {
  loader.load(
    src,
    function doIt(gltf) {
      let sky = gltf.scene;
      sky.position.y = 11;
      scene.add(gltf.scene);
      sky.name = "sky";

      let target = sky,
        hasChildren = (target) => target?.children?.length > 0;

      function setAttributes(target) {
        target.name = "sky_" + target.name;
        target.material = skyMaterial;
        target.sky = true;
        for (let vector in target.scale) {
          target.scale[vector] = 2.1;
        }
        if (hasChildren(target)) {
          target.children.forEach((t) => setAttributes(t));
        }
      }
      setAttributes(target);

      let finishedLoading = new CustomEvent("loadedSky", { detail: sky });
      document.dispatchEvent(finishedLoading);
    },
    function (xhr) {
      //console.log((xhr.loaded / xhr.total) * 100 + "% of Sky loaded");
    },
    function (error) {
      console.error(error);
    }
  );
}
export { loadSky };
