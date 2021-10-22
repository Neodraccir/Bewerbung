let circleSkyAround = (skyWorld) => {
    let target = skyWorld,
      hasChildren = (target) => target?.children?.length > 0,
      counter = 1;
    while (hasChildren(target)) {
      if (target?.rotation) {
        target.rotation.y += 0.0001 * Math.random() * counter;
        target.rotation.x += 0.00001 * Math.random() * counter;
        target.rotation.z += 0.00001 * Math.random() * counter;
      }
      target = target?.children[0];
      counter++;
    }
  };

  export {circleSkyAround}