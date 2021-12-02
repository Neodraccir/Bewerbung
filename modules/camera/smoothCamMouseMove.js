import { isMobile } from "/modules/helpers/checkForMobileBrowser.js";
import { makeStuffAppear } from "/modules/animations/makeStuffAppear.js";

var mouseCoordinates = { x: 0, y: 0, z: 0 };
var targetMouseCoordinates = { x: 0, y: 0, z: 0 };
var targetScrollstate = 0;
var fadeInValue = 0;
var fadeOutValue = 0;
var startValue = isMobile ? 300 : 300;
var changeValue = startValue;
var fps = 100;
var scrollstate = 0;
var latestChange = new Date().getTime();
var lastEvent = new MouseEvent(isMobile ? "touchmove" : "mousemove", {
  bubbles: true,
  cancelable: true,
});

function getMouseCoordinates(event) {
  lastEvent = event;
  targetMouseCoordinates = {
    x: isMobile ? Math.pow(event.targetTouches[0].pageX, 1.05) : event.clientX,
    y: isMobile ? Math.pow(event.targetTouches[0].pageY, 1.05) : event.clientY,
    z: isMobile
      ? Math.pow(
          (event.targetTouches[0].pageX + event.targetTouches[0].pageY) / 2,
          1.05
        )
      : (event.clientX + event.clientY) / 2,
  };
  targetScrollstate =
    -1320 *
    (1 -
      1 /
        Math.pow(
          Math.abs(document.body.getBoundingClientRect().top) / 60,
          1.00001
        ));
  if (targetScrollstate >= 0) targetScrollstate = 0;
  let thisChange = new Date().getTime();

  function smoothlyChange() {
    if (thisChange >= latestChange) {
      latestChange = thisChange;
      let thereIsADifference =
        mouseCoordinates.x != targetMouseCoordinates.x ||
        mouseCoordinates.y != targetMouseCoordinates.y ||
        mouseCoordinates.z != targetMouseCoordinates.z ||
        scrollstate != targetScrollstate;

      if (!thereIsADifference) {
        // //console.log("THE SAME");
        changeValue = startValue;
        mouseCoordinates = targetMouseCoordinates;
        scrollstate = targetScrollstate;
        return "no difference";
      }

      if (thereIsADifference && changeValue < 999) {
        changeValue = changeValue + 35;
        let fadeFormular = (x) => Math.pow(0.0252982 * Math.sqrt(x) + 0.2, 7);
        fadeInValue = fadeFormular(changeValue);
        fadeOutValue = 1 - fadeFormular(changeValue);

        mouseCoordinates.x =
          mouseCoordinates.x * fadeOutValue +
          targetMouseCoordinates.x * fadeInValue;
        mouseCoordinates.y =
          mouseCoordinates.y * fadeOutValue +
          targetMouseCoordinates.y * fadeInValue;
        mouseCoordinates.z =
          mouseCoordinates.z * fadeOutValue +
          targetMouseCoordinates.z * fadeInValue;
        scrollstate =
          scrollstate * fadeOutValue + targetScrollstate * fadeInValue;

        setTimeout(smoothlyChange, 1000 / fps);
      }
      if (changeValue >= 999) changeValue = startValue;
    }
    if (thisChange < latestChange) changeValue = startValue;
  }
  smoothlyChange();
}

document.addEventListener(
  isMobile ? "touchmove" : "mousemove",
  getMouseCoordinates
);

document.onscroll = () => {
  getMouseCoordinates(lastEvent);
  makeStuffAppear();
};

function smoothCamMouseMove(camera) {
  camera.quaternion.x =
    0.08 * Math.sin(mouseCoordinates.x * 0.001) * (isMobile ? 7 : 2);
  camera.quaternion.z =
    0.08 * Math.cos(mouseCoordinates.z * 0.001) * (isMobile ? 7 : 2);
  camera.quaternion.y =
    0.08 * Math.cos(mouseCoordinates.y * 0.001) * (isMobile ? 7 : 2);
  camera.position.x =
    30 * Math.sin(mouseCoordinates.x * 0.0005) + Math.cos(scrollstate * 0.0005);
  camera.position.y = 30 * Math.sin(mouseCoordinates.y * 0.0005) + scrollstate;
  camera.position.z = 30 * Math.sin(mouseCoordinates.z * 0.0005);
  camera.rotation.y = 30 * Math.cos(scrollstate * 0.0002);
}

export { smoothCamMouseMove };
