"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const getRandomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    let frameId: number | null = null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    camera.add(pointLight);
    scene.add(camera);

    const vertexShader = `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float displacement = sin(length(position.xy) * 2.0 + time) * 2.0;
        pos += normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      varying vec2 vUv;
      void main() {
        vec3 color = vec3(vUv, 1.0);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        mouse: { value: new THREE.Vector2() },
      },
      vertexShader,
      fragmentShader,
      wireframe: true,
    });

    const geometry = new THREE.IcosahedronGeometry(
      getRandomInRange(40, 100),
      1
    );
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    camera.position.y = 35;

    const animate = () => {
      shaderMaterial.uniforms.time.value += getRandomInRange(0.005, 0.05);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", handleResize);
      disposeScene(scene);
      renderer.dispose();
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const disposeScene = (scene: THREE.Scene) => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        (object as THREE.Mesh).geometry.dispose();

        const material = (object as THREE.Mesh).material;
        if (Array.isArray(material)) {
          material.forEach((mat) => cleanMaterial(mat));
        } else {
          cleanMaterial(material);
        }
      }
    });
  };

  const cleanMaterial = (material: THREE.Material) => {
    if ("dispose" in material) {
      material.dispose();
    }

    [
      "map",
      "lightMap",
      "bumpMap",
      "normalMap",
      "displacementMap",
      "specularMap",
      "envMap",
    ].forEach((prop) => {
      const texture = (material as any)[prop];
      if (texture instanceof THREE.Texture) {
        texture.dispose();
      }
    });
  };

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    />
  );
};

export default ThreeBackground;
