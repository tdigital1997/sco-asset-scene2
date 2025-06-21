const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00000f);
scene.fog = new THREE.Fog(0x000010, 10, 60);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

const ambientLight = new THREE.AmbientLight(0x222244, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 2, 30);
pointLight.position.set(0, 4, 0);
scene.add(pointLight);

const caveGeo = new THREE.SphereGeometry(40, 48, 48);
const caveMat = new THREE.MeshStandardMaterial({ color: 0x111111, side: THREE.BackSide, roughness: 1 });
const cave = new THREE.Mesh(caveGeo, caveMat);
scene.add(cave);

const glyphs = [];
const glyphMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.7 });
const glyphGeo = new THREE.PlaneGeometry(1, 1);
for (let i = 0; i < 20; i++) {
  const glyph = new THREE.Mesh(glyphGeo, glyphMat.clone());
  glyph.position.set(
    Math.random() * 20 - 10,
    Math.random() * 8,
    Math.random() * -15
  );
  glyph.rotation.y = Math.random() * Math.PI * 2;
  glyph.material.opacity = 0.4 + Math.random() * 0.4;
  scene.add(glyph);
  glyphs.push(glyph);
}

const glowMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.2 });
for (let i = 0; i < 10; i++) {
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), glowMat);
  glow.position.set(Math.random() * 20 - 10, Math.random() * 6 + 1, Math.random() * -20);
  const light = new THREE.PointLight(0x00ffcc, 1.2, 5);
  light.position.copy(glow.position);
  scene.add(glow);
  scene.add(light);
}

function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;
  glyphs.forEach((g, i) => {
    g.rotation.z = t + i;
    g.position.y += Math.sin(t + i) * 0.002;
  });
  renderer.render(scene, camera);
}

window.onload = () => {
  const overlay = document.getElementById('fadeOverlay');
  overlay.style.opacity = 0;
  setTimeout(() => overlay.remove(), 2000);
};

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
