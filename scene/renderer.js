import { WebGLRenderer } from "three";
import { scene } from "../main";
import camera from "./camera";

//renderer
export const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const render = () => renderer.render(scene, camera);

export default renderer;
