import { Raycaster, Vector2 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { warehouse } from "./modelLoader";
import { DragControls } from "three/addons/controls/DragControls.js";
import camera from "./scene/camera";
import { renderer, render } from "./scene/renderer";

const raycaster = new Raycaster();
const pointer = new Vector2();
const extraObj = [];
let INTERSECTED = [];
let selected;
let enableSelection = false;
const dragControl = new DragControls(extraObj, camera, renderer.domElement);

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
		model.position.set(0, 2, 18);
		extraObj.push(model);
		warehouse.add(model);
		document.addEventListener("pointermove", onMouseMove);
		document.addEventListener("click", onMouseClick);
		console.log("window model", model);
	});
};

export const onMouseMove = (event) => {
	event.preventDefault();
	raycaster.setFromCamera(pointer, camera);

	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

	const intersects = raycaster.intersectObjects(extraObj, true);
	if (intersects.length > 0) {
		enableSelection = true;
		//what is this line for?
		//set the color back?
		if (selected) selected.material.emissive.setHex(selected.currentHex);
		selected = intersects[0].object;
		selected.currentHex = selected.material.emissive.getHex();
		selected.material.emissive.setHex(0xd36582);
	} else {
		if (selected) selected.material.emissive.setHex(selected.currentHex);
		INTERSECTED = null;
	}
	render();
};

export const onMouseClick = (event) => {
	let pair = [];
	event.preventDefault();
	raycaster.setFromCamera(pointer, camera);

	console.log("extraObj", extraObj);

	const intersects = raycaster.intersectObjects(
		[...extraObj, ...Object.values(warehouse.children)],
		true
	);
	console.log("intersects after click", intersects);
	if (intersects.length > 0) {
		//set position back
		//can i hard code?
		let i = 0;
		let min = Number.MAX_SAFE_INTEGER;
		while (pair.length < 2) {}
	}
};
