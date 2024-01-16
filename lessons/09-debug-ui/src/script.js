import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

import GUI from "lil-gui";

//Debugging
const gui = new GUI({ title: "Debug UI", width: 300 });
const cubeTweaks = gui.addFolder("Cube");
const debugObject = {};
debugObject.color = "#3a6ea6";

// gui.hide();

window.addEventListener("keydown", (e) => {
  if (e.key === "d") {
    gui.show(gui._hidden);
  }
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: debugObject.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

cubeTweaks.add(material, "wireframe");
cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
cubeTweaks.add(mesh, "visible");
cubeTweaks.addColor(debugObject, "color").onChange((value) => {
  material.color.set(debugObject.color);
});

debugObject.spinBox = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  gsap.to(mesh.scale, {
    duration: 0.5,
    x: 1.5,
    y: 1.5,
    z: 1.5,
  });
  gsap.to(mesh.scale, {
    duration: 0.5,
    delay: 0.5,
    x: 1,
    y: 1,
    z: 1,
  });
};
cubeTweaks.add(debugObject, "spinBox");

debugObject.subdivisions = 2;
cubeTweaks
  .add(debugObject, "subdivisions")
  .min(0)
  .max(10)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivisions,
      debugObject.subdivisions,
      debugObject.subdivisions
    );
  });

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
