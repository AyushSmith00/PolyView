import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, 800/500, 9, 50000);
camera.position.set(0, 500, 1000);

// Mouse tracking
let mouseX = 400;
let mouseY = 250;

// Global object
let object;
let controls;
const objToRender = "lamboCar";

// Renderer
const container = document.getElementById("container3D");
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Load 3D model
const loader = new GLTFLoader();
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.scale.set(5, 5, 5);
    scene.add(object);

    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

// Lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(100, 200, 100);
dirLight.castShadow = true;
scene.add(dirLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
scene.add(ambientLight);

// OrbitControls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Animate
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  if (object) {
    object.rotation.y = -3 + (mouseX / container.clientWidth) * 3;
    object.rotation.x = -1.2 + (mouseY * 2.5) / container.clientHeight;
  }

  renderer.render(scene, camera);
}

// Start animation immediately
animate();

// Resize
window.addEventListener("resize", function () {
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
});

// Mouse move
document.onmousemove = (e) => {
  mouseX = e.clientX - container.getBoundingClientRect().left;
  mouseY = e.clientY - container.getBoundingClientRect().top;
};

// Music controls
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const bgAudio = document.getElementById("bgAudio");
bgAudio.loop = true;

// Start music
startBtn.addEventListener("click", () => {
  bgAudio.play().catch((err) => console.log("Audio playback failed:", err));
});

// Stop music
stopBtn.addEventListener("click", () => {
  bgAudio.pause();
  bgAudio.currentTime = 0; // reset to beginning
});
