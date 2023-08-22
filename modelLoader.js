import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextureLoader } from "three";
import { Group } from "three";

//object og stats
const objStats = {};

//TODO: load multiple models
const modelsURL = {
	w: "models/test_category/test_category/walls.gltf",
	f: "models/test_category/test_category/floor.gltf",
	r: "models/test_category/test_category/roofs.gltf",
	h: "models/test_category/test_category/horizontals.gltf",
	v: "models/test_category/test_category/verticals.gltf",
	t: "models/test_category/test_category/triangles.gltf",
};
const mainLoader = new GLTFLoader();

//create warehouse model group
export const warehouse = new Group();
const loadModel = () =>
	Object.values(modelsURL).forEach((url) => {
		mainLoader.load(
			url,
			(gltf) => {
				const model = gltf.scene.clone();
				// console.log("model", model);
				model.name = gltf.scene.children[0].name[0];
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
//load model
loadModel();

//Textures
//create new texture loader for later use
const textureLoader = new TextureLoader();
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
const applyTextureFirst = (model, textureURL) => {
	textureLoader.load(
		textureURL,
		(texture) => {
			const textureS = texture.clone();
			// console.log("textureS", textureS);
			textureS.wrapS = THREE.RepeatWrapping;
			textureS.wrapT = THREE.RepeatWrapping;
			textureS.repeat.set(20, 1);
			textureS.flipY = false;
			model.traverse((child) => {
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
		},
		undefined,
		(error) => console.log("texture something went wrong", error)
	);
};
