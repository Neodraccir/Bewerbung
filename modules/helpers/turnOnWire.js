import * as THREE from "/modules/three/build/three.module.js";

var turnOnWire = function (model) {
  if (/mesh/i.test(model.type)) {
    // Setup our wireframe
    const wireframeGeometry = new THREE.WireframeGeometry(model.geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );

    wireframe.name = "wireframe";
    model.add(wireframe);
  }
  model.children.forEach((m) => turnOnWire(m));
};

export { turnOnWire };
