import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import styles from "./styles.module.css";
import OrbitControls from "three-orbitcontrols";

const colors = {
  clear: "#263238",
  mesh: "#0F0",
};

export class ThreeScene extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(colors.clear);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 20;
    this.camera.position.y = 5;
    this.controls.autoRotate = true;

    const lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    lights.forEach((singleLight) => this.scene.add(singleLight));

    //Simple Box with WireFrame
    this.addModels();

    this.renderScene();
    this.start();
  }

  addModels() {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({
      color: colors.mesh,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    new THREE.TextureLoader().load(
      "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      (texture) => {
        this.cube.material.map = texture;
        this.cube.material.needsUpdate = true;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      },
    );

    const mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl("./assets/");
    mtlLoader.load("freedom.mtl", (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "./assets/freedom.obj",
        (object) => {
          this.freedomMesh = object;
          this.freedomMesh.position.setY(3);
          this.freedomMesh.scale.set(0.02, 0.02, 0.02);
          this.scene.add(this.freedomMesh);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (loadingError) => {
          console.log(loadingError);
        },
      );
    });
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
      this.controls.update();
    }
  };
  stop = () => cancelAnimationFrame(this.frameId);
  animate = () => {
    if (this.cube) {
      this.cube.rotation.y += 0.02;
    }
    if (this.freedomMesh) {
      this.freedomMesh.rotation.y += 0.02;
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () =>
    this.renderer && this.renderer.render(this.scene, this.camera);
  handleClick = () => {
    this.cube.userData = {
      email: "yes",
    };
    console.log(this.cube.userData);
  };

  render() {
    return (
      <div
        onClick={() => this.handleClick()}
        className={styles.container}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
