import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const group = new THREE.Group();

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);

cube2.position.x = -2;

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);

cube3.position.x = 2;

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.position.y = 1;
scene.add(group);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
