import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import camera from "./camera";
import { light, light0, light1, light2, ambientlight } from "./light";
import gridHelper from "./plane";
import { scaleWallX, scaleWallY, scaleWallZ } from "./modelScale";
import { warehouse } from "./modelLoader";

//create scene
const scene = new THREE.Scene();

//add lights
camera.add(light);
scene.add(light0);
scene.add(light1);
scene.add(light2);
scene.add(ambientlight);

//renderer
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(gridHelper);

//orbit control
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

//Add to scene
scene.add(warehouse);

//events
const sliderX = document.getElementById("warehouseRangeX");
const sliderY = document.getElementById("warehouseRangeY");
const sliderZ = document.getElementById("warehouseRangeZ");

const outputX = document.getElementById("displayNumberX");
const outputY = document.getElementById("displayNumberY");
const outputZ = document.getElementById("displayNumberZ");

outputX.innerHTML = sliderX.value;
sliderX.addEventListener("input", (event) => {
	outputX.innerHTML = event.target.value;
	scaleWallX(event.target.value);
});
outputY.innerHTML = sliderY.value;
sliderY.addEventListener("input", (event) => {
	outputY.innerHTML = event.target.value;
	scaleWallY(event.target.value);
});
outputZ.innerHTML = sliderZ.value;
sliderZ.addEventListener("input", (event) => {
	outputZ.innerHTML = event.target.value;
	scaleWallZ(event.target.value);
});

//animate
function animate() {
	requestAnimationFrame(animate);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render(scene, camera);
}

animate();
