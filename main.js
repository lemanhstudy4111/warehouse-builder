import * as THREE from "three";
import camera from "./camera";
import { light, light0, light1, light2, ambientlight } from "./light";
import gridHelper from "./plane";
// import { scaleWallX, scaleWallY, scaleWallZ } from "./modelScale";
import { warehouse } from "./modelLoader";
import { createPanel } from "./gui";
import { controls } from "./orbitControl";
import { renderer } from "./renderer";

//create scene
const scene = new THREE.Scene();

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

//animate
function animate() {
	requestAnimationFrame(animate);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render(scene, camera);
}

animate();
