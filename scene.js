import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/controls/OrbitControls.js';

let scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 100);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const ambient = new THREE.AmbientLight(0x88ccff, 1);
scene.add(ambient);

const pointLight = new THREE.PointLight(0x66fcf1, 1.5, 30);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

// Ground
const groundGeo = new THREE.PlaneGeometry(100, 100, 64, 64);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x111e2f, side: THREE.DoubleSide, wireframe: false });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Cave tunnel entrance
const tunnelGeo = new THREE.TorusGeometry(3, 1.5, 16, 100, Math.PI);
const tunnelMat = new THREE.MeshStandardMaterial({ color: 0x0a1f2e });
const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
tunnel.rotation.x = Math.PI / 2;
tunnel.position.z = -2;
tunnel.position.y = 2;
scene.add(tunnel);

// Snow particles
let snowParticles = [];
const snowGeo = new THREE.SphereGeometry(0.05, 8, 8);
const snowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < 300; i++) {
  const p = new THREE.Mesh(snowGeo, snowMat);
  p.position.set((Math.random() - 0.5) * 40, Math.random() * 10 + 2, (Math.random() - 0.5) * 40);
  snowParticles.push(p);
  scene.add(p);
}

function animateSnow() {
  snowParticles.forEach(p => {
    p.position.y -= 0.02;
    if (p.position.y < 0) p.position.y = 10;
  });
}

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;

function animate() {
  requestAnimationFrame(animate);
  animateSnow();
  renderer.render(scene, camera);
}
animate();

function enterCave() {
  document.querySelector('#glyphs').style.display = 'none';
  document.querySelector('h1').style.display = 'block';
  setTimeout(() => {
    window.location.href = '/cave-map';
  }, 3000);
}
window.enterCave = enterCave;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});