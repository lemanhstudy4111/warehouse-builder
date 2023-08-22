import { Raycaster, Vector2 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { warehouse } from "./modelLoader";
import camera from "./camera";
import { DragControls } from "three/addons/controls/DragControls.js";

const raycaster = new Raycaster();
const pointer = new Vector2();
const objects = [];


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
        objects.push(model);
		warehouse.add(model);
		console.log("window model", model);
	});
};

const dragControl = new DragControls(objects, );


const onMouseMove = (event) => {
	event.preventDefault();
	pointer.set(
		(event.clientX / window.innerWidth) * 2 - 1,
		-(event.clientY / window.innerHeight) * 2 + 1
	);
	raycaster.setFromCamera(pointer, camera);
	if (intersects.length == 0 || !dragging) return;
};

const onMouseDown = (event) => {
	event.preventDefault();
	raycaster.setFromCamera(pointer, camera);
	const intersection = raycaster.intersectObjects;
};
