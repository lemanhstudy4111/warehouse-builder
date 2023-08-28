import { GridHelper } from "three";

//scene plane
const gridSize = 100; // Number of grid cells in each axis (total grid size will be gridSize x gridSize)
const gridSpacing = 1; // Each grid cell represents 1 meter
const gridColor = 0x888888;

const gridHelper = new GridHelper(
	gridSize * gridSpacing,
	gridSize,
	gridColor,
	gridColor
);

gridHelper.position.set(6, 0, 0);

export default gridHelper;
