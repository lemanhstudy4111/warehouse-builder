import GUI from "lil-gui";
import { loadAddon } from "./raycaster";
import { scaleWallX, scaleWallY, scaleWallZ } from "./modelScale";

export const createPanel = () => {
	const gui = new GUI();
	const dashboard = {
		addWindow: function () {
			loadAddon();
		},
	};

	//Scale
	const sliders = {
		x: 20,
		y: 20,
		z: 20,
	};

	const folderScale = gui.addFolder("Building Dimensions");

	folderScale.add(sliders, "x", 1, 50, 1).onChange(scaleWallX);
	folderScale.add(sliders, "y", 1, 50, 1).onChange(scaleWallY);
	folderScale.add(sliders, "z", 1, 50, 1).onChange(scaleWallZ);

	//Button add window
	const folderAddon = gui.addFolder("Load Extra Model");
	folderAddon.add(dashboard, "addWindow");
};
