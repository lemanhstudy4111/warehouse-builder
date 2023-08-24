import * as THREE from "three";
import camera from "./scene/camera";
import { renderer, render } from "./scene/renderer";
import { light, light0, light1, light2, ambientlight } from "./scene/light";
import gridHelper from "./scene/plane";
// import { scaleWallX, scaleWallY, scaleWallZ } from "./modelScale";
import { warehouse } from "./modelLoader";
import { createPanel } from "./gui";
import { controls } from "./scene/orbitControl";
// import { onMouseMove } from "./raycaster";

//create scene
export const scene = new THREE.Scene();

//add lights
camera.add(light);
scene.add(light0);
scene.add(light1);
scene.add(light2);
scene.add(ambientlight);

scene.add(gridHelper);

//Add to scene
scene.add(warehouse);

createPanel();

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();
}

window.addEventListener("resize", onWindowResize);

//animate
function animate() {
	requestAnimationFrame(animate);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	render();
}

animate();
