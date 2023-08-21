import { warehouse } from "./modelLoader";
import { renderer } from "./main";

//Scale model
export const scaleWallX = (value) => {
	let changeValue = parseInt(value);
	warehouse.scale.x = changeValue * 0.05;
	warehouse.children[0].children.forEach((wall) => {
		if (
			wall.name[wall.name.length - 1] == "n" ||
			wall.name[wall.name.length - 1] == "s"
		)
			wall.material.map.repeat.set(changeValue, 1);
	});
	warehouse.children[1].children[0].material.map.repeat.set(changeValue, 1);
};

//TODO: fix
export const scaleWallY = (value) => {
	let changeValue = parseInt(value);
	warehouse.scale.y = changeValue * 0.05;
};

//TODO: fix
export const scaleWallZ = (value) => {
	let changeValue = parseInt(value);
	warehouse.scale.z = changeValue * 0.05;
	// warehouse.children[0].material.map.repeat.set(parseInt(value), 1);
	warehouse.children[0].children.forEach((wall) => {
		if (
			wall.name[wall.name.length - 1] == "e" ||
			wall.name[wall.name.length - 1] == "w"
		)
			wall.material.map.repeat.set(changeValue, 1);
	});
};
