import * as THREE from "three";
import * as CANNON from "cannon-es";

class ThreeScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Setup Cannon.js world
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;

    // Setup Three.js scene
    this.scene.add(new THREE.AmbientLight(0xffffff));
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 0);
    this.scene.add(light);

    // Start the animation loop
    this.animate();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.world.step(1 / 60);
    this.updatePhysics();
    this.render();
  }

  add(object) {
    if (object instanceof THREE.Object3D) {
      this.scene.add(object);
    } else if (object instanceof CANNON.Body) {
      this.world.addBody(object);
    }
  }

  updatePhysics() {
    const timeStep = 1 / 60;
    this.world.step(timeStep);
    this.scene.traverse((object) => {
      if (object.userData.physicsBody) {
        object.position.copy(object.userData.physicsBody.position);
        object.quaternion.copy(object.userData.physicsBody.quaternion);
      }
    });
  }
}

const myScene = new ThreeScene();

// Create ground plane
const groundMaterialPhy = new CANNON.Material();
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({ mass: 0, material: groundMaterialPhy });
groundBody.addShape(groundShape);
myScene.add(groundBody);

// Create Three.js ground plane
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
myScene.add(groundMesh);

// Create sphere
const sphereShape = new CANNON.Sphere(1);
const sphereBody = new CANNON.Body({ mass: 5 });
sphereBody.addShape(sphereShape);
sphereBody.position.set(0, 10, 0);
myScene.add(sphereBody);

// Create Three.js sphere
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
myScene.add(sphereMesh);

myScene.camera.position.z = 20;

myScene.animate();
