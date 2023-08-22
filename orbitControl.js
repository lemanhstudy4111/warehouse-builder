import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import camera from "./camera";
import { renderer } from "./renderer";

//orbit control
export const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
