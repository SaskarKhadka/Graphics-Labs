import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import simplex from "perlin-simplex";

import dirtTexture from "../assets/dirt.png";
import dirt2Texture from "../assets/dirt2.jpg";
import sandTexture from "../assets/sand.jpg";
import grassTexture from "../assets/grass.jpg";
import waterTexture from "../assets/water.jpg";
import stoneTexture from "../assets/stone.png";
import snowTexture from "../assets/snow2.png";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffeecc");

const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(-17, 40, 40);
// camera.position.set(0, 0, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace.outputColorSpace = THREE.SRGBColorSpace;
// renderer.useLegacyLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(
  new THREE.Color("#FFCB8E").convertSRGBToLinear(),
  2,
  200
);
light.position.set(10, 20, 10);

light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.dampingFactor = 0.05;
controls.enableDamping = true;

const hdrTextureURL = new URL("../assets/envmap.hdr", import.meta.url);
let envMap;

const MAX_HEIGHT = 10;
const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;

(async function () {
  let pmrem = new THREE.PMREMGenerator(renderer);
  let envMapTexture = await new RGBELoader()
    .setDataType(THREE.FloatType)
    .loadAsync(hdrTextureURL);
  envMap = pmrem.fromEquirectangular(envMapTexture).texture;

  const textureLoader = new THREE.TextureLoader();

  const textures = {
    dirt: textureLoader.load(dirtTexture),
    dirt2: textureLoader.load(dirt2Texture),
    grass: textureLoader.load(grassTexture),
    sand: textureLoader.load(sandTexture),
    water: textureLoader.load(waterTexture),
    stone: textureLoader.load(stoneTexture),
    snow: textureLoader.load(snowTexture),
  };

  for (let i = -15; i <= 15; i++) {
    for (let j = -15; j <= 15; j++) {
      let position = tileToPosition(i, j);

      if (position.length() > 16) continue;
      //   const noise2D = createNoise2D();
      const myNoise = new simplex();
      let noise = (myNoise.noise(i * 0.1, j * 0.1) + 1) * 0.55;
      noise = Math.pow(noise, 1.5);
      makeHex(noise * MAX_HEIGHT, position);
    }
  }

  let stoneMesh = hexMesh(stoneGeometries, textures.stone);
  let grassMesh = hexMesh(grassGeometries, textures.grass);
  let dirt2Mesh = hexMesh(dirt2Geometries, textures.dirt2);
  let dirtMesh = hexMesh(dirtGeometries, textures.dirt);
  let sandMesh = hexMesh(sandGeometries, textures.sand);
  //   scene.add(stoneMesh, grassMesh, dirt2Mesh, dirtMesh, sandMesh);

  let seaMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(17, 17, MAX_HEIGHT * 0.2, 50),
    new THREE.MeshPhysicalMaterial({
      envMap: envMap,
      color: new THREE.Color("#74ccf4").convertSRGBToLinear().multiplyScalar(3),
      ior: 1.4,
      transmission: 1,
      transparent: true,
      thickness: 1.5,
      envMapIntensity: 0.2,
      roughness: 1,
      metalness: 0.025,
      roughnessMap: textures.water,
      metalnessMap: textures.water,
    })
  );

  seaMesh.receiveShadow = true;
  seaMesh.position.set(0, MAX_HEIGHT * 0.1, 0);
  //   scene.add(seaMesh);

  let mapContainer = new THREE.Mesh(
    new THREE.CylinderGeometry(17.1, 17.1, MAX_HEIGHT * 0.25, 50, 1, true),
    new THREE.MeshPhysicalMaterial({
      envMap: envMap,
      map: textures.dirt,
      envMapIntensity: 0.2,
      side: THREE.DoubleSide,
    })
  );

  mapContainer.receiveShadow = true;
  mapContainer.position.set(0, MAX_HEIGHT * 0.125, 0);
  //   scene.add(mapContainer);

  let mapFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(18.5, 18.5, MAX_HEIGHT * 0.1, 50),
    new THREE.MeshPhysicalMaterial({
      envMap: envMap,
      map: textures.dirt2,
      envMapIntensity: 0.1,
      side: THREE.DoubleSide,
    })
  );

  mapFloor.receiveShadow = true;
  mapFloor.position.set(0, -MAX_HEIGHT * 0.05, 0);
  //   scene.add(mapFloor);

  const cloudMesh = clouds();

  const meshesToAdd = [
    mapFloor,
    mapContainer,
    seaMesh,
    dirt2Mesh,
    sandMesh,
    dirtMesh,
    grassMesh,
    stoneMesh,
    cloudMesh,
  ];
  for (let i = 0; i < meshesToAdd.length; i++) {
    scene.add(meshesToAdd[i]);
    await new Promise((resolve) =>
      setTimeout(() => {
        // signalOff();
        resolve();
      }, 1000)
    );
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
})();

function tileToPosition(tileX, tileY) {
  return new THREE.Vector2((tileX + (tileY % 2) * 0.5) * 1.77, tileY * 1.535);
}

let sandGeometries = new THREE.BoxGeometry(0, 0, 0);
let grassGeometries = new THREE.BoxGeometry(0, 0, 0);
let dirtGeometries = new THREE.BoxGeometry(0, 0, 0);
let dirt2Geometries = new THREE.BoxGeometry(0, 0, 0);
let stoneGeometries = new THREE.BoxGeometry(0, 0, 0);

function hexGeometry(height, position) {
  let geo = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
  geo.translate(position.x, height * 0.5, position.y);

  return geo;
}

function makeHex(height, position) {
  let geo = hexGeometry(height, position);
  if (height > STONE_HEIGHT) {
    stoneGeometries = mergeGeometries([geo, stoneGeometries]);
    if (Math.random() > 0.8) {
      stoneGeometries = mergeGeometries([
        stone(height, position),
        stoneGeometries,
      ]);
    }
  } else if (height > DIRT_HEIGHT) {
    dirtGeometries = mergeGeometries([geo, dirtGeometries]);
    if (Math.random() > 0.8) {
      grassGeometries = mergeGeometries([
        tree(height, position),
        grassGeometries,
      ]);
    }
  } else if (height > GRASS_HEIGHT) {
    grassGeometries = mergeGeometries([geo, grassGeometries]);
  } else if (height > SAND_HEIGHT) {
    sandGeometries = mergeGeometries([geo, sandGeometries]);
    if (Math.random() > 0.8 && stoneGeometries) {
      stoneGeometries = mergeGeometries([
        stone(height, position),
        stoneGeometries,
      ]);
    }
  } else if (height > DIRT2_HEIGHT) {
    dirt2Geometries = mergeGeometries([geo, dirt2Geometries]);
  }
}

function hexMesh(geo, map) {
  let mat = new THREE.MeshPhysicalMaterial({
    envMap: envMap,
    envMapIntensity: 0.135,
    // envMapIntensity: 1,
    flatShading: true,
    map,
  });

  let mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

function stone(height, position) {
  const px = Math.random() * 0.4;
  const pz = Math.random() * 0.4;

  const geo = new THREE.SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  geo.translate(position.x + px, height, position.y + pz);
  return geo;
}

function tree(height, position) {
  const treeHeight = Math.random() * 1 + 1.25;

  const geo = new THREE.CylinderGeometry(0, 1.5, treeHeight, 3);
  geo.translate(position.x, height + treeHeight * 0 + 1, position.y);

  const geo2 = new THREE.CylinderGeometry(0, 1.5, treeHeight, 3);
  geo2.translate(position.x, height + treeHeight * 0.6 + 1, position.y);

  const geo3 = new THREE.CylinderGeometry(0, 1.5, treeHeight, 3);
  geo3.translate(position.x, height + treeHeight * 1.25 + 1, position.y);

  return mergeGeometries([geo, geo2, geo3]);
}

function clouds() {
  let geo = new THREE.SphereGeometry(0, 0, 0);
  let count = Math.floor(Math.random() * 4 + 1);

  for (let i = 0; i < count; i++) {
    const puff1 = new THREE.SphereGeometry(1.2, 7, 7);
    const puff2 = new THREE.SphereGeometry(1.5, 7, 7);
    const puff3 = new THREE.SphereGeometry(0.9, 7, 7);

    puff1.translate(-1.85, Math.random() * 0.3, 0);
    puff2.translate(0, Math.random() * 0.3, 0);
    puff3.translate(1.85, Math.random() * 0.3, 0);

    const cloudGeo = mergeGeometries([puff1, puff2, puff3]);

    const yTranslation = Math.random() * 10 + 10;
    cloudGeo.translate(
      Math.random() * 20 - 10,
      yTranslation < 12 ? 15 : yTranslation,
      Math.random() * 20 - 10
    );
    cloudGeo.rotateY(Math.random() * Math.PI * 2);
    // let scaleFactor = Math.random() + 0.5;
    // cloudGeo.scale(scaleFactor, scaleFactor, scaleFactor);

    geo = mergeGeometries([geo, cloudGeo]);
  }

  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      envMap: envMap,
      envMapIntensity: 0.75,
      flatShading: true,
    })
  );
  return mesh;
}
