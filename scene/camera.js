import { PerspectiveCamera } from "three";

//Set necessary variables
const cameraz = 100;

//Set camera
const camera = new PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 10, 20);

export default camera;
