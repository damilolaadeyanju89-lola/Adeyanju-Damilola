import { useEffect, useRef } from "react";
import * as THREE from "three";

const growthValues = [0.72, 1.05, 0.92, 1.55, 1.35, 2.45, 3.35];

export default function GrowthChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.6, 10.5);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const chartGroup = new THREE.Group();
    chartGroup.position.y = -0.05;
    scene.add(chartGroup);

    const chartWidth = 7.2;
    const spacing = chartWidth / (growthValues.length - 1);
    const xPosition = (index: number) => -chartWidth / 2 + index * spacing;

    const bars: THREE.Mesh[] = [];
    const barMaterial = new THREE.MeshStandardMaterial({
      color: 0xdce8ff,
      metalness: 0.1,
      roughness: 0.55,
      transparent: true,
      opacity: 0.78,
      emissive: 0x7186a8,
      emissiveIntensity: 1.35,
    });

    growthValues.forEach((_, index) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1, 0.7), barMaterial.clone());
      bar.position.set(xPosition(index), 0, 0);
      bar.scale.y = 0.02;
      bar.position.y = 0.01;
      chartGroup.add(bar);
      bars.push(bar);
    });

    const linePoints = growthValues.map(
      (value, index) => new THREE.Vector3(xPosition(index), value, 0.48)
    );
    const glowLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(linePoints),
      new THREE.LineBasicMaterial({ color: 0xdce8ff, transparent: true, opacity: 0.28 })
    );
    glowLine.scale.set(1.01, 1.01, 1.01);
    chartGroup.add(glowLine);
    const growthLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(linePoints),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    chartGroup.add(growthLine);

    const point = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    chartGroup.add(point);

    const activeLight = new THREE.PointLight(0xdce8ff, 7, 2.8);
    activeLight.position.set(0, 2, 0.9);
    chartGroup.add(activeLight);
    scene.add(new THREE.AmbientLight(0x202838, 1.6));
    const keyLight = new THREE.DirectionalLight(0xdce8ff, 2.5);
    keyLight.position.set(-4, 5, 5);
    scene.add(keyLight);

    let animationId = 0;
    let elapsed = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      elapsed += 0.016;

      bars.forEach((bar, index) => {
        const targetHeight = growthValues[index];
        const pulse = 1 + Math.sin(elapsed * 1.5 + index * 0.35) * 0.035;
        bar.scale.y += (targetHeight * pulse - bar.scale.y) * 0.04;
        bar.position.y = bar.scale.y / 2;
      });

      const progress = (elapsed * 0.18) % 1;
      const segment = progress * (linePoints.length - 1);
      const segmentIndex = Math.min(Math.floor(segment), linePoints.length - 2);
      const segmentProgress = segment - segmentIndex;
      point.position.lerpVectors(linePoints[segmentIndex], linePoints[segmentIndex + 1], segmentProgress);
      point.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.18);
      activeLight.position.copy(point.position);
      activeLight.intensity = 6 + Math.sin(elapsed * 3) * 1.5;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      barMaterial.dispose();
      glowLine.geometry.dispose();
      (glowLine.material as THREE.Material).dispose();
      growthLine.geometry.dispose();
      (growthLine.material as THREE.Material).dispose();
      point.geometry.dispose();
      (point.material as THREE.Material).dispose();
      bars.forEach((bar) => {
        bar.geometry.dispose();
        (bar.material as THREE.Material).dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="growth-chart" aria-label="Animated chart showing professional growth" />;
}
