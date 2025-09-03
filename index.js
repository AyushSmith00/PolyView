import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.159.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.159.0/examples/jsm/loaders/GLTFLoader.js';
import { Loader } from 'three/src/Three.Core.js';

const scene = new THREE.scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;

let objToRender = "lambo";

const loader = new GLTFLoader();

loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    
    function(xhr){
        console.log((xhr.loader / xhr.total * 100) + "% loaded");
    },
    function(error) {
        console.error(error)
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);