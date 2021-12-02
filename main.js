//Stop people from using no desktop devices
let is_coarse = matchMedia("(pointer:coarse)").matches;
if (is_coarse) {
  window.ajaxEnabled = false;
  window.stop();
  document.querySelector(".loader").remove();
  document.querySelector("main").remove();
  throw new Error("Incompatible device! Please use a different device.");
}

//play video on mouseover

const profileVid = document.querySelector("#bewerbungsbild");
profileVid.pause();
profileVid.onmouseenter = function () {
  profileVid.play();
};
profileVid.onmouseleave = function () {
  profileVid.pause();
};

//three modules
import * as THREE from "/modules/three/build/three.module.js";
var bar = new ldBar("#progressbar");
var barElem = document.querySelector("#progressbar").ldBar;
var loadProgress = 0;
(function () {
  let skyLoaded = false,
    chestLoaded = false,
    fairiesLoaded = false,
    passBarrierRemoved = false;
  function setProgress(lastLoad) {
    let maxProgress = 0;
    if (skyLoaded) maxProgress = maxProgress + 27;
    if (chestLoaded) maxProgress = maxProgress + 27;
    if (fairiesLoaded) maxProgress = maxProgress + 27;
    if (passBarrierRemoved) maxProgress = maxProgress + 10;
    if (lastLoad) maxProgress = 100;
    if (maxProgress == 0) maxProgress = 10;
    for (loadProgress; loadProgress <= maxProgress; ++loadProgress) {
      setTimeout(
        () => {
          bar.set(loadProgress);
          if (loadProgress >= 90 && loadProgress < 100) {
            setTimeout(() => setProgress(true), 1000);
          }
          if (loadProgress >= 99) {
            let divPassBarrier = document.querySelector("div.passBarrier");
            if (notPlayingYet) window.scrollTo(0, 0);
            if (notPlayingYet)
              document.querySelector("#achievements").style.opacity = 0;
            let cover = document.querySelector(".cover");
            let changer = document.querySelector(".changeDevice");
            if (cover) cover.remove();
            if (changer) changer.remove();
            if (divPassBarrier) divPassBarrier.remove();
          }
        },
        lastLoad ? 40 : 15 * loadProgress
      );
    }
  }
  document.addEventListener("loadedSky", () => {
    skyLoaded = true;
    setProgress();
  });
  document.addEventListener("loadedChest", () => {
    chestLoaded = true;
    setProgress();
  });
  document.addEventListener("createdAllFairies", () => {
    fairiesLoaded = true;
    setProgress();
  });
  document.addEventListener("removedPassBarrier", () => {
    passBarrierRemoved = true;
    setProgress();
  });
})();

//setup
import { scene, camera, renderer } from "/modules/settingUpScene.js";
import { render } from "/modules/render.js";

//helper functions
import { logCameraChanges } from "/modules/helpers/logCameraChanges.js";
import { rerenderAfterResize } from "/modules/helpers/rerenderAfterResize.js";
import { getAllObjectsIn3dModel } from "/modules/helpers/getAllObjectsIn3dModel.js";
import { setLightAndGridHelper } from "/modules/helpers/setLightAndGridHelper.js";
import { OrbitControls } from "/modules/three/examples/jsm/controls/OrbitControls.js";

//camera
import { smoothCamMouseMove } from "/modules/camera/smoothCamMouseMove.js";

//builder
import { buildText } from "/bTxt";
import { _VS, _FS } from "/modules/creators/customWhiteShader.js";
import { createLights } from "/modules/creators/createLights.js";
import { buildManySpheres } from "/modules/creators/buildManySpheres.js";
import { buildManyFairies } from "/modules/creators/buildManyFairies.js";

//loader
import { loadSky } from "/modules/loaders/loadSky.js";
import { loadChest } from "/modules/loaders/loadChest.js";

//animations
import { circleSkyAround } from "/modules/animations/circleSkyAround.js";
import { turnOnWire } from "/modules/helpers/turnOnWire.js";
import { moveBalls } from "/modules/animations/moveBalls.js";
import { moveChest } from "/modules/animations/moveChest.js";
import { moveLightInCircle } from "/modules/animations/moveLightInCircle.js";
import {
  onPointerDown,
  onPointerMove,
} from "/modules/animations/mouseAction.js";

//actualy loading Sky into the scene
var skyWorld;
loadSky("static/3Dmodels/FantasySky/scene.gltf", scene);
document.addEventListener("loadedSky", (e) => (skyWorld = e.detail));
let [ballArray, ballProp] = buildManySpheres(scene); //adding "stars" or "white balls"

var chest;
loadChest("/static/3Dmodels/chest/scene.gltf", scene);
document.addEventListener("loadedChest", (e) => {
  chest = e.detail;
});

let fairyArray, fairyProp;
let allFairesLoaded = false;
document.addEventListener("createdAllFairies", (e) => {
  fairyArray = e.detail.fairyArray;
  fairyProp = e.detail.fairyProp;
  allFairesLoaded = true;
  // console.log(allFairesLoaded);
  // console.log(fairyArray, fairyProp);
});

buildManyFairies(scene);
let [pointLight, ambientLight, dirLight] = createLights(scene);
let speedArray = [0];

let notPlayingYet =
  sessionStorage.getItem("notPlayingYet") == "false" ? false : true;
sessionStorage.setItem("notPlayingYet", notPlayingYet);
if (notPlayingYet == false) {
  document.querySelector("#achievements").style.opacity = 1;
}
if (notPlayingYet == false)
  document.querySelector("#restartGame").classList.remove("invisible");

let solvedMysteries = {
  hitFairy: sessionStorage.getItem("hitFairy") ? true : false,
  pumpedStar: sessionStorage.getItem("pumpedStar") ? true : false,
  explodedStar: sessionStorage.getItem("explodedStar") ? true : false,
  foundChest: sessionStorage.getItem("foundChest") ? true : false,
  chestColor: sessionStorage.getItem("chestColor") ? true : false,
};

let currentState = 0;
var wonWavSrc = "/static/sound/won.wav";
var wonWav = new Audio(wonWavSrc);
wonWav.preload = "auto";
wonWav.volume = 0.5;

function showSolvedMysteries() {
  let mysteryCounter = 0;
  for (let mystery in solvedMysteries) {
    let myteryElement = document.querySelector(`#${mystery}`);

    if (solvedMysteries[mystery]) {
      mysteryCounter++;
      if (myteryElement.classList.contains("invisible")) {
        myteryElement.classList.remove("invisible");
        document.querySelector("#achievements").classList.add("pulse");
        setTimeout(
          () =>
            document.querySelector("#achievements").classList.remove("pulse"),
          1300
        );
      }
    }
    if (solvedMysteries[mystery] == false) {
      if (!myteryElement.classList.contains("invisible")) {
        myteryElement.classList.add("invisible");
      }
    }
  }
  document.querySelector("#solvedMysteries").innerHTML = mysteryCounter;
  if (mysteryCounter == Object.keys(solvedMysteries).length) {
    if (document.querySelector("#congrats").classList.contains("invisible")) {
      document.querySelector("#congrats").classList.remove("invisible");
    }
  } else {
    document.querySelector("#congrats").classList.add("invisible");
  }
  if (currentState == 4 && mysteryCounter == 5) wonWav.play();
  currentState = mysteryCounter;
}

showSolvedMysteries();

document.addEventListener("mysteryEvent", (event) => {
  solvedMysteries[event.detail] = true;
  sessionStorage.setItem(event.detail, true);
  if (notPlayingYet) {
    notPlayingYet = false;
    document.querySelector("#restartGame").classList.remove("invisible");
    sessionStorage.setItem("notPlayingYet", false);
    document.querySelector("#achievements").style.opacity = 1;
  }

  // console.log(event.detail);
  showSolvedMysteries();
});

document.addEventListener("restartGame", () => {
  // console.log("And here we go again!");
  document.querySelector("#restartGame").classList.add("invisible");
  let achievementStyle = document.querySelector("#achievements").style;
  // console.log("restartGame");
  window.scrollTo(0, 0);
  achievementStyle.opacity = 0;
  currentState = 0;
  document.querySelector("#solvedMysteries").innerHTML = currentState;
  // console.log(achievementStyle.opacity);
  sessionStorage.clear();
  notPlayingYet = true;
  sessionStorage.setItem("notPlayingYet", notPlayingYet);
  for (let myst in solvedMysteries) {
    solvedMysteries[myst] = false;
  }
  scene.traverse((obj) => {
    if (/chest/gi.test(obj.name) && obj.type == "Mesh") {
      obj.material.transparent = true;
      obj.material.opacity = 0.05;
    }
  });
  scene.traverse((obj) => {
    if (/fairy/gi.test(obj.name) && obj.type == "SkinnedMesh") {
      // console.log(obj);
      obj.material.color.setRGB(255, 255, 255);
    }
  });
  showSolvedMysteries();
  // console.log(solvedMysteries);
});

//Hier muss eine Async Version entstehen
function getPassLength() {
  let passLengthXML = new XMLHttpRequest();
  passLengthXML.open("GET", "passLength");
  passLengthXML.send();
  return passLengthXML.responseText;
}
async function passingit() {
  let length = await getPassLength();
  // console.log(await length);
}

passingit();

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#passw");

password.value = localStorage.getItem("pass");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye / eye slash icon
  this.classList.toggle("bi-eye");
});

password.focus();

function sendPassword(password) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "sendPass");
  xhr.setRequestHeader("Content-Type", "application/json");
  let pass = password ? password : document.querySelector("#passw").value;
  xhr.send(JSON.stringify({ pass: pass }));
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (JSON.parse(xhr.response).successfullLoad == "true") {
        var animation = JSON.parse(xhr.response).animation;
        // console.log(animation);
        animate = function () {
          eval(animation);
        };
        document.querySelector("#container").style.display = "block";
        document.querySelector(".passBarrier").remove();
        window.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        localStorage.setItem("pass", pass);
        buildText(JSON.parse(xhr.response).content);
        let removedPassBarrier = new CustomEvent("removedPassBarrier");
        document.dispatchEvent(removedPassBarrier);
        const restartGame = new CustomEvent("restartGame");
        document.querySelector("#restartGame").onclick = () =>
          document.dispatchEvent(restartGame);
      }
      if (JSON.parse(xhr.response).successfullLoad == false) {
        // console.log("neeeey");
      }
    }
  };
}
let input = document.querySelector("#passw");
input.onkeyup = () => {
  // console.log(input.value.length);
  if (input.value.length >= 3) {
    sendPassword(false);
  }
};
if (localStorage.getItem("pass") ? true : false)
  sendPassword(localStorage.getItem("pass"));

function animate() {
  //most of this function gets added when passBarrier was removed
  //it is located in loadBehindPass.json
  requestAnimationFrame(animate);
}

animate();

window.onresize = () => rerenderAfterResize(camera, scene, renderer); //makes content more responsive

//debugging helpers
window.getAll3d = getAllObjectsIn3dModel; //helps to debug by making it easier to inspect the modules
window.turnOnWire = turnOnWire; // helps setting preference by turning on the wire of an 3d
// let [lightHelper, lightHelper2, gridHelper] = setLightAndGridHelper(
//   scene,
//   pointLight,
//   dirLight
// );
// const controls = new OrbitControls(camera, renderer.domElement);
