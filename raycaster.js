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
		// extraObj.push(model);
		_window = model;
		scene.add(model);
		// document.addEventListener("pointermove", onMouseMove);
		window.addEventListener("mousemove", onMouseMove, false);
		window.addEventListener("mousedown", onMouseDown, false);
		window.addEventListener("mouseup", onMouseUp, false);
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

	if (intersects.length == 0 || !dragging) return;

	normalMatrix.getNormalMatrix(intersects[0].object.matrixWorld);
	worldNormal
		.copy(intersects[0].face.normal)
		.applyMatrix3(normalMatrix)
		.normalize();
	if (intersects[0].object.name[0] == "w")
		_window.position.copy(intersects[0].point); // -0.5 = bottom of the wall - half height of the window
	_window.lookAt(lookAtVector.copy(intersects[0].point).add(worldNormal));
}

const hoverOnCallback = (event) => {
	startColor = event.object.material.color.getHex();
	event.object.material.color.setHex(0x000000);
	console.log("event", event);
	// render();
};

const hoverOffCallback = (event) => {
	event.object.material.color.setHex(startColor);
};

const dragStart = (event) => {
	// controls.enabled = !controls.enabled;
	// const newRaycast = event.target.getRaycaster();
	// const intersects = newRaycast.intersectObjects(
	// 	[...extraObj, ...Object.values(warehouse.children)],
	// 	true
	// );
	// controls.enabled = false;
	// if (intersects.length > 1) {
	// 	const parentWorldPosition = new Vector3();
	// 	intersects[1].object.getWorldPosition(parentWorldPosition);
	// 	intersects[0].object.position.copy(parentWorldPosition);
	// 	intersects[1].object.add(intersects[0].object);
	// 	console.log("child", intersects[0].object);
	// }
	// console.log("intersects drag", intersects);

	//enable dragging, disable controls
	dragging = true;
	controls.enabled = !dragging;
};

const dragEnd = (event) => {
	// controls.enabled = !controls.enabled;
	// event.object.material.color.setHex(startColor);
	// dragControl.enabled = !dragControl.enabled;

	//disable dragging, enable controls
	dragging = false;
	controls.enabled = !dragging;
};

/*
export const dragStartCallback = (event) => {
	// event.preventDefault();
	raycaster.setFromCamera(pointer, camera);

	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

	const intersects = raycaster.intersectObjects(
		[...extraObj, ...Object.values(warehouse.children)],
		true
	);
	console.log("intersects after click", intersects);
	if (intersects.length > 0) {
		const pair = findPair(intersects);
		console.log("pair", pair);
		if (pair[1] && pair[1].name[0] == "w") {
			console.log("enable drag");
			pair[1].attach(pair[0]);
			controls.enabled = false;
		} else if (!pair[1] || pair[1].name[0] != "w") {
			console.log("end drag");
			controls.enabled = true;
			event.target.enabled = false;
		}
	}
};

const updatePointer = (event) => {
	raycaster.setFromCamera(pointer, camera);

	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};



const findPair = (arr) => {
	const res = [];
	let i = 0;
	while (res.length <= 2) {
		if (arr[i].object.name[0] == "s" || arr[i].object.name[0] == "w")
			res.push(arr[i]);
	}
	return res;
};

const findIntersects = (arr, recursive) => {
	const intersects = raycaster.intersectObjects(arr, recursive);
	return intersects;
};

export const onMouseMove = (event) => {
	event.preventDefault();
	raycaster.setFromCamera(pointer, camera);

	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
	//TODO: bug
	const intersects = findIntersects(extraObj, false);
	if (intersects.length > 0) {
		console.log("intersects on hover", intersects);
		//what is this line for?
		//set the color back?
		selected = intersects[0].object;
		if (selected) selected.material.emissive.setHex(selected.currentHex);
		selected.currentHex = selected.material.emissive.getHex();
		selected.material.emissive.setHex(0xd36582);
	} else {
		if (selected) selected.material.emissive.setHex(selected.currentHex);
		INTERSECTED = null;
	}
	render();
};
*/
