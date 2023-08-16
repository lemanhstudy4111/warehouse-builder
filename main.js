import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextureLoader } from "three";
import { Group } from "three";
import { LoadingManager } from "three";

//Set necessary variables
const cameraz = 100;

//create warehouse model group
const warehouse = new Group();

//create new texture loader for later use
const textureLoader = new TextureLoader();

//create scene
const scene = new THREE.Scene();

//Set camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 10, 20);

//Set light
var light = new THREE.PointLight(0xffffff, 0.9);
camera.add(light);

let light0 = new THREE.DirectionalLight(0xffffff, 1.0);
light0.position.set(camera.position.x, camera.position.y, camera.position.z); // this light is at the camera
scene.add(light0);

let light1 = new THREE.DirectionalLight(0xffffff, 1.0); // red light
light1.position.set(-1, 1, 0);
scene.add(light1);

let light2 = new THREE.DirectionalLight(0xffffff, 1.0); // blue light
light2.position.set(1, 1, 0);
scene.add(light2);

let ambientlight = new THREE.AmbientLight(0xffffff); // ambient light
scene.add(ambientlight);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//scene plane
const gridSize = 100; // Number of grid cells in each axis (total grid size will be gridSize x gridSize)
const gridSpacing = 1; // Each grid cell represents 1 meter
const gridColor = 0x888888;

const gridHelper = new THREE.GridHelper(
	gridSize * gridSpacing,
	gridSize,
	gridColor,
	gridColor
);

gridHelper.position.set(6, 0, 0);
scene.add(gridHelper);

//orbit control
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

//TODO: load multiple models
const modelsURL = "models/test_collection";

const gltfLoader = new GLTFLoader();
Object.values(modelsURL).forEach((url) => {
	gltfLoader.load(
		url,
		(gltf) => {
			const model = gltf.scene.clone();
			model.name = gltf.scene.children[0].name[0];
			// applyTexture(model, textureURL[model.name])
			console.log(model);
			warehouse.add(model);
			console.log("warehouse added", model.name);
			applyTextureFirst(model, textureURL[model.name]);
		},
		undefined,
		(error) => console.log("Something went wrong", error)
	);
	warehouse.name = "warehouse";
	console.log("warehouse", warehouse);
});

//Textures
//Create textures URL
const textureURL = {
	w: "models/textures/metal_wall_1_panel-min.jpg",
	f: "models/textures/brick_copy-min.png",
	r: "models/textures/metal_roof_1_panel-min.jpg",
	h: "models/textures/wood.jpg",
	v: "models/textures/wood.jpg",
	t: "models/textures/wood.jpg",
};
//Apply texture
const applyTextureFirst = (model, textureURL, load_arg) => {
	const loader = load_arg ? load_arg : new TextureLoader();
	loader.load(
		textureURL,
		(texture) => {
			const textureS = texture.clone();
			console.log("textureS", textureS);
			textureS.wrapS = THREE.RepeatWrapping;
			textureS.wrapT = THREE.RepeatWrapping;
			//TODO: some change on repeat setting for different types of textures
			textureS.repeat.set(20, 1);
			textureS.flipY = false;
			model.traverse((child) => {
				// debugger;
				if (child.isMesh || child.isPoint) {
					if (child.material.map) {
						child.material.map.dispose();
					}
					if (child.name[0] == "w") textureS.rotation = 1.5708;
					const newMaterial = child.material.clone();

					newMaterial.map = textureS;
					newMaterial.needsUpdate = true;

					child.material = newMaterial;
				}
			});
			// renderer.render( scene, camera );
		},
		undefined,
		(error) => console.log("texture something went wrong", error)
	);
};

//Apply texture after scale

//Add to scene
scene.add(warehouse);

//Scale model
const scaleWallX = (value) => {
	warehouse.scale.x = parseInt(value) * 0.05;
	renderer.render(scene, camera);
};

const scaleWallY = (value) => {
	warehouse.scale.y = parseInt(value) * 0.05;
	renderer.render(scene, camera);
};

const scaleWallZ = (value) => {
	warehouse.scale.z = parseInt(value) * 0.05;
	API.zRepeat = parseInt(value);
	renderer.render(scene, camera);
};

//events
const sliderX = document.getElementById("warehouseRangeX");
const sliderY = document.getElementById("warehouseRangeY");
const outputX = document.getElementById("displayNumberX");
const outputY = document.getElementById("displayNumberY");

outputX.innerHTML = sliderX.value;
sliderX.addEventListener("input", (event) => {
	outputX.innerHTML = event.target.value;
	API.xRepeat = event.target.value;
	scaleWallX(event.target.value);
});
outputY.innerHTML = sliderY.value;
sliderY.addEventListener("input", (event) => {
	outputY.innerHTML = event.target.value;
	API.yRepeat = event.target.value;
	scaleWallY(event.target.value);
});

//animate
function animate() {
	requestAnimationFrame(animate);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render(scene, camera);
}

animate();
