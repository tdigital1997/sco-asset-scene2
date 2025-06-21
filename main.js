import * as THREE from 'https://cdn.skypack.dev/three@0.148.0';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Load texture
const textureLoader = new THREE.TextureLoader();
const rockTexture = textureLoader.load('textures/rock_wall.jpg');

// Cave geometry using textured spheres
for (let i = 0; i < 20; i++) {
  const geometry = new THREE.IcosahedronGeometry(Math.random() * 1.5 + 0.5, 1);
  const material = new THREE.MeshStandardMaterial({ map: rockTexture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20
  );
  scene.add(mesh);
}

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x88ccff, 1, 100);
pointLight.position.set(5, 10, 15);
scene.add(pointLight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();