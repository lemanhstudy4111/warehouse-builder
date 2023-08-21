import { warehouse } from "./modelLoader";
import { renderer } from "./main";

//TODO: fix
//Scale model
export const scaleWallX = (value) => {
	warehouse.scale.x = parseInt(value) * 0.05;
	warehouse.children[0].material.map.repeat.set(parseInt(value), 1);
	renderer.render(scene, camera);
};

export const scaleWallY = (value) => {
	warehouse.scale.y = parseInt(value) * 0.05;
	renderer.render(scene, camera);
};

export const scaleWallZ = (value) => {
	warehouse.scale.z = parseInt(value) * 0.05;
	API.zRepeat = parseInt(value);
	renderer.render(scene, camera);
};
