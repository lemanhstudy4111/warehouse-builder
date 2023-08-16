import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';
import { Group } from 'three';
import { LoadingManager } from 'three';

//TODO: Optimize/refactor so that objects are not mutated
//Set necessary variables
const cameraz = 100;
const API = {
    xRepeat: 20,
    yRepeat: 20,
}
// const house = {};
// const groups = {
//     f: [],
//     r: [],
//     w: [],
//     v: [],
//     h: [],
//     t: [],
// }

//create warehouse model group
const warehouse = new Group();

//create new texture loader for later use
const textureLoader = new TextureLoader();


//create scene
const scene = new THREE.Scene();


//Set camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0, 10, 20 );

//Set light
var light = new THREE.PointLight( 0xffffff, 0.9 );
camera.add( light );

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
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


//Load model (deprecated)
// const modelLoader = new GLTFLoader();
// modelLoader.load('models/warehouse_rename_nolight/warehouse_rename.gltf', (gltf) => {
//     const model = gltf.scene;

//     // debugger
//     //Loading Texture based on groups
//     model.children.forEach((child) => {
//         const cGroup = child.name[0];
//         groups[cGroup].push(child);
//     })
//     //uniform texture loader (deprecated)

//     // const textureLoader = new TextureLoader();
//     // textureLoader.load('models/textures/brick_copy.png', (texture) => {
//     //     console.log('texture', texture);
//     // globalTexture = texture; //turn this to object for multiple texture(? - uncertain solution)
//     // applyTexture(model, texture, groups);
//     //})
    
//     // scene.add(model);

//     //Add 3d objects into groups
//     //TODO: Optimize this code so that it does not rely on hardcoded order of array
//     //Meaning the walls, roofs, floor, and beams must be created exactly this way to render correctly
//     const walls = createGroup(groups.w, 'walls', wallTextureURL);
//     const roofs = createGroup(groups.r, 'roofs', roofTextureURL);
//     const floor = createGroup(groups.f, 'floor', floorTextureURL);
//     const verts = createGroup(groups.v, 'verts', beamsTextureURL);
//     const hors = createGroup(groups.h, 'hors', beamsTextureURL);
//     const tris = createGroup(groups.t, 'tris', beamsTextureURL);
    

//     warehouse.add(...Object.values(house));
//     scene.add(warehouse);
//     console.log('warehouse', warehouse);

//     applyWhole(warehouse, texturesURL)

//     console.log('walls', walls);
//     console.log('roofs', roofs);
//     console.log('verts', verts);
//     console.log('hors', hors);
//     console.log('tris', tris);
//     console.log('floor', floor);

// }, undefined, (error) => console.log('Something is wrong!', error))





//TODO: load multiple models
const modelsURL = {
    w: 'models/test_category/test_category/walls.gltf',
    f: 'models/test_category/test_category/floor.gltf',
    r: 'models/test_category/test_category/roofs.gltf',
    h: 'models/test_category/test_category/horizontals.gltf',
    v: 'models/test_category/test_category/verticals.gltf',
    t: 'models/test_category/test_category/triangles.gltf',
}

const gltfLoader = new GLTFLoader();
Object.values(modelsURL).forEach((url) => {
    gltfLoader.load(url, (gltf) => {
        const model = gltf.scene.clone();
        model.name = gltf.scene.children[0].name[0];
        // applyTexture(model, textureURL[model.name])
        console.log(model);
        warehouse.add(model);
        console.log('warehouse added', model.name);   
        applyTexture(model, textureURL[model.name]);     
    }, undefined, (error) => console.log('Something went wrong', error));
    warehouse.name = 'warehouse';
    console.log('warehouse', warehouse);

})

//Textures
//Create textures URL
const textureURL = {
    w: 'models/textures/metal_wall_1_panel-min.jpg',
    f: 'models/textures/brick_copy-min.png',
    r: 'models/textures/metal_roof_1_panel-min.jpg',
    h: 'models/textures/wood.jpg',
    v: 'models/textures/wood.jpg',
    t: 'models/textures/wood.jpg',
}
//Apply texture
const applyTexture = (model, textureURL) => {
    // debugger;
    console.log('model traverse', model);
    console.log('texture', textureURL);
    const newTexture = new TextureLoader();
    newTexture.load(textureURL, (texture) => {
        const textureS = texture.clone();
        textureS.wrapS = THREE.RepeatWrapping;
        textureS.wrapT = THREE.RepeatWrapping;
        //TODO: some change on repeat setting for different types of textures
        textureS.repeat.set(API.yRepeat, 1);
        textureS.flipY = false;
        // debugger;
        model.traverse((child) => {
            // debugger;
            if (child.isMesh || child.isPoint) {

                if (child.material.map) {
                    child.material.map.dispose();
                }
                const newMaterial = child.material.clone();


                newMaterial.map = textureS;
                newMaterial.needsUpdate = true;

                child.material = newMaterial;
            }
        })
        // renderer.render( scene, camera );
    }, undefined, (error) => console.log('something went wrong', error))
}

//Apply texture to whole model
const applyWhole = (modelObj, textures) => {
    modelObj.children.forEach(child => {
        applyTexture(modelObj, textureURL);
    })
}

// debugger
//Add to scene
scene.add(warehouse);


//Scale model
const scaleWallX = (value) => {
    warehouse.scale.x = parseInt(value) * 0.05;
    API.xRepeat = parseInt(value);
    //TODO: Refactor
    // applyTexture(warehouse.children[0], texturesURL[0]);
    // applyTexture(warehouse.children[1], texturesURL[1]);
    // applyTexture(warehouse.children[2], texturesURL[2]);
    renderer.render(scene, camera);
}

const scaleWallY = (value) => {
    warehouse.scale.y = parseInt(value) * 0.05;
    API.yRepeat = parseInt(value);
    //TODO: Refactor
    // applyTexture(warehouse.children[0], texturesURL[0]);
    // applyTexture(warehouse.children[1], texturesURL[1]);
    renderer.render(scene, camera);
}


//Add child to different groups
const createGroup = (arr, name, textureURL) => {
    const group = new Group();
    arr.forEach(obj3d => group.add(obj3d));
    group.name = name;
    // debugger;
    house[name] = group.clone();
    // applyTexture(house[name], textureURL)
    // scene.add(house[name]);
    return house[name];
}

//handle each group
// const applyTextureOnGroup = (group, textureURL) => {
//     // const textureLoader =  new TextureLoader();
//     // debugger;
//     // textureLoader.load(textureURL, (textureOb) => {
//         applyTexture(group, textureURL);
//     // },() => console.log(`loading ${textureOb}`),(error) => console.log('something happened', error));
// }

//events
const sliderX = document.getElementById('warehouseRangeX');
const sliderY = document.getElementById('warehouseRangeY')
const outputX = document.getElementById('displayNumberX');
const outputY = document.getElementById('displayNumberY');

outputX.innerHTML = sliderX.value;
sliderX.addEventListener('input', (event) => {
    outputX.innerHTML = event.target.value;
    API.xRepeat = event.target.value;
    scaleWallX(event.target.value);
})
outputY.innerHTML = sliderY.value;
sliderY.addEventListener('input', (event) => {
    outputY.innerHTML = event.target.value;
    API.yRepeat = event.target.value;
    scaleWallY(event.target.value);
})

// //experiment
// let clock = new THREE.Clock();

//animate
function animate() {
	requestAnimationFrame( animate );
    
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );
    // let t = clock.getElapsedTime();
}

animate();
