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
    this.render();
  }

  add(object) {
    if (object instanceof THREE.Object3D) {
      this.scene.add(object);
    } else if (object instanceof CANNON.Body) {
      this.world.addBody(object);
    }
  }
}
