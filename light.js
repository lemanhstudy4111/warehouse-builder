import { PointLight, DirectionalLight, AmbientLight } from "three";
import camera from "./camera";

//Set light
export let light = new PointLight(0xffffff, 0.9);

export let light0 = new DirectionalLight(0xffffff, 1.0);
light0.position.set(camera.position.x, camera.position.y, camera.position.z); // this light is at the camera

export let light1 = new DirectionalLight(0xffffff, 1.0); // red light
light1.position.set(-1, 1, 0);

export let light2 = new DirectionalLight(0xffffff, 1.0); // blue light
light2.position.set(1, 1, 0);

export let ambientlight = new AmbientLight(0xffffff); // ambient light
