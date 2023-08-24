import { Raycaster, Vector2, Vector3, Matrix3, BufferGeometry } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { warehouse } from "./modelLoader";
import { DragControls } from "three/addons/controls/DragControls.js";
import { controls } from "./scene/orbitControl";
import camera from "./scene/camera";
import { scene } from "./main";
import { renderer, render } from "./scene/renderer";
import {
	Evaluator,
	Operation,
	OperationGroup,
	GridMaterial,
	ADDITION,
	SUBTRACTION,
} from "three-bvh-csg";

var raycaster = new Raycaster();
var mouse = new Vector2();
var intersects;
var normalMatrix = new Matrix3();
var worldNormal = new Vector3();
var lookAtVector = new Vector3();
var dragging = false;
var _window;
const extraObj = [];

const params = {
	snap: true,
	wireframe: false,
	displayControls: true,
	transparentBrushes: true,
	display: "OVERLAY",
};

//load extra model
export const loadAddon = () => {
	console.log("add window button clicked!");
	//extra model
	const swindowURL = "models/swindow/swindow.gltf";
	const addonLoader = new GLTFLoader();
	addonLoader.load(swindowURL, (gltf) => {
		console.log("window loading...");
		const model = gltf.scene.clone();
		model.name = gltf.scene.children[0].name[0];
		model.position.set(0, 2, 15);
		extraObj.push(model);
		// _window = model;
		scene.add(model);
		// document.addEventListener("pointermove", onMouseMove);
		window.addEventListener("mousemove", onMouseMove, false);
		window.addEventListener("mousedown", onMouseDown, false);
		window.addEventListener("mouseup", onMouseUp, false);
		console.log("window", model);
	});
};

function onMouseDown(event) {
	if (intersects.length > 0) {
		controls.enableRotate = false;
		dragging = true;
	}
}

function onMouseUp(event) {
	controls.enableRotate = true;
	dragging = false;
}

function onMouseMove(event) {
	mouse.set(
		(event.clientX / window.innerWidth) * 2 - 1,
		-(event.clientY / window.innerHeight) * 2 + 1
	);
	raycaster.setFromCamera(mouse, camera);
	intersects = raycaster.intersectObjects([warehouse]);

	if (
		intersects.length == 0 ||
		intersects[0].object.name[0] !== "w" ||
		!dragging
	)
		return;
	console.log(intersects);
	normalMatrix.getNormalMatrix(intersects[0].object.matrixWorld);
	worldNormal
		.copy(intersects[0].face.normal)
		.applyMatrix3(normalMatrix)
		.normalize();
	if (intersects[0].object.name[0] == "w")
		extraObj[0].position.copy(intersects[0].point); // -0.5 = bottom of the wall - half height of the window
	extraObj[0].lookAt(lookAtVector.copy(intersects[0].point).add(worldNormal));
}
