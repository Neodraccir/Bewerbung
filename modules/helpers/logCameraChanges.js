let cameraPosBefore;

function logCameraChanges(camera, newCam) {
  if (newCam == undefined && cameraPosBefore != undefined) {
    return logCameraChanges(cameraPosBefore, camera);
  }

  if (cameraPosBefore == undefined) {
    cameraPosBefore = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
  }

  let cameraPosAfter = newCam
    ? {
        x: newCam.position.x,
        y: newCam.position.y,
        z: newCam.position.z,
      }
    : {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };

  let camStatesAreEqual = (one, two) => {
    let isEqual = true;
    for (let value in cameraPosAfter) {
      if (one[value] != two[value]) {
        isEqual = false;
      }
    }
    return isEqual;
  };

  let logIfEqual = (equal) => {
    if (!equal) {
      //console.log(`Current Position of Camera "${newCam.name}":`, cameraPosAfter);
      cameraPosBefore = cameraPosAfter;
    }
  };

  logIfEqual(camStatesAreEqual(cameraPosBefore, cameraPosAfter));
  return cameraPosAfter
}

export { logCameraChanges };
