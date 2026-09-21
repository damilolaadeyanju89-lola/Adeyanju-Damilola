import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrbitalScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 8.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ball = new THREE.Group();
    ball.scale.setScalar(1.15);
    ball.position.set(container.clientWidth < 800 ? 0 : 1.8, 0.2, 0);
    scene.add(ball);

    const fieldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(45 / 2)) * camera.position.z;
    const fieldWidth = fieldHeight * camera.aspect;
    const scatterPoint = (spread = 1) => ({
      x: (Math.random() - 0.5) * fieldWidth * spread - ball.position.x,
      y: (Math.random() - 0.5) * fieldHeight * spread - ball.position.y,
      z: (Math.random() - 0.5) * 2.4 - ball.position.z,
    });

    const rows = 112;
    const columns = 116;
    const count = rows * columns;
    const radius = 1.68;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const scatterPositions = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let row = 0; row < rows; row += 1) {
      const latitude = (row / (rows - 1)) * Math.PI - Math.PI / 2;
      const latitudeRadius = Math.cos(latitude);

      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        const longitude = (column / columns) * Math.PI * 2;
        const noise =
          Math.sin(longitude * 4.2 + latitude * 7.5) * 0.1 +
          Math.sin(longitude * 8.5 - latitude * 3.2) * 0.045 +
          Math.sin(latitude * 13) * 0.035;
        const pointRadius = radius + noise;
        const pointIndex = index * 3;
        const x = Math.cos(longitude) * latitudeRadius * pointRadius;
        const y = Math.sin(latitude) * pointRadius;
        const z = Math.sin(longitude) * latitudeRadius * pointRadius;

        positions[pointIndex] = x;
        positions[pointIndex + 1] = y;
        positions[pointIndex + 2] = z;
        basePositions[pointIndex] = x;
        basePositions[pointIndex + 1] = y;
        basePositions[pointIndex + 2] = z;
        const scatteredPoint = scatterPoint(1.08);
        scatterPositions[pointIndex] = scatteredPoint.x;
        scatterPositions[pointIndex + 1] = scatteredPoint.y;
        scatterPositions[pointIndex + 2] = scatteredPoint.z;

        const brightness = 0.58 + (z / radius + 1) * 0.16;
        color.setHSL(0.61 + brightness * 0.035, 0.25, brightness * 0.68);
        colors[pointIndex] = color.r;
        colors[pointIndex + 1] = color.g;
        colors[pointIndex + 2] = color.b;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    ball.add(particles);

    const innerRows = 58;
    const innerColumns = 64;
    const innerCount = innerRows * innerColumns;
    const innerPositions = new Float32Array(innerCount * 3);
    const innerColors = new Float32Array(innerCount * 3);
    const innerRadius = 1.05;
    const innerBasePositions = new Float32Array(innerCount * 3);
    const innerScatterPositions = new Float32Array(innerCount * 3);

    for (let row = 0; row < innerRows; row += 1) {
      const latitude = (row / (innerRows - 1)) * Math.PI - Math.PI / 2;
      const latitudeRadius = Math.cos(latitude);

      for (let column = 0; column < innerColumns; column += 1) {
        const index = row * innerColumns + column;
        const longitude = (column / innerColumns) * Math.PI * 2;
        const pointIndex = index * 3;
        const pulse = 1 + Math.sin(longitude * 5 + latitude * 8) * 0.06;
        innerPositions[pointIndex] = Math.cos(longitude) * latitudeRadius * innerRadius * pulse;
        innerPositions[pointIndex + 1] = Math.sin(latitude) * innerRadius * pulse;
        innerPositions[pointIndex + 2] = Math.sin(longitude) * latitudeRadius * innerRadius * pulse;
        innerBasePositions[pointIndex] = innerPositions[pointIndex];
        innerBasePositions[pointIndex + 1] = innerPositions[pointIndex + 1];
        innerBasePositions[pointIndex + 2] = innerPositions[pointIndex + 2];
        const scatteredPoint = scatterPoint(0.92);
        innerScatterPositions[pointIndex] = scatteredPoint.x;
        innerScatterPositions[pointIndex + 1] = scatteredPoint.y;
        innerScatterPositions[pointIndex + 2] = scatteredPoint.z;
        color.setHSL(0.59 + (column / innerColumns) * 0.06, 0.3, 0.42 + (row / innerRows) * 0.2);
        innerColors[pointIndex] = color.r;
        innerColors[pointIndex + 1] = color.g;
        innerColors[pointIndex + 2] = color.b;
      }
    }

    const innerGeometry = new THREE.BufferGeometry();
    innerGeometry.setAttribute("position", new THREE.BufferAttribute(innerPositions, 3));
    innerGeometry.setAttribute("color", new THREE.BufferAttribute(innerColors, 3));
    const innerMaterial = new THREE.PointsMaterial({
      size: 0.034,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const innerParticles = new THREE.Points(innerGeometry, innerMaterial);
    innerParticles.position.set(0, 0.03, 0.08);
    ball.add(innerParticles);

    const ambientCount = 360;
    const ambientPositions = new Float32Array(ambientCount * 3);
    const ambientColors = new Float32Array(ambientCount * 3);
    for (let index = 0; index < ambientCount; index += 1) {
      const pointIndex = index * 3;
      ambientPositions[pointIndex] = (Math.random() - 0.5) * 12;
      ambientPositions[pointIndex + 1] = (Math.random() - 0.5) * 8;
      ambientPositions[pointIndex + 2] = (Math.random() - 0.5) * 3.2 - 0.8;
      const ambientBrightness = 0.38 + Math.random() * 0.38;
      color.setHSL(0.6 + Math.random() * 0.08, 0.25, ambientBrightness);
      ambientColors[pointIndex] = color.r;
      ambientColors[pointIndex + 1] = color.g;
      ambientColors[pointIndex + 2] = color.b;
    }
    const ambientGeometry = new THREE.BufferGeometry();
    ambientGeometry.setAttribute("position", new THREE.BufferAttribute(ambientPositions, 3));
    ambientGeometry.setAttribute("color", new THREE.BufferAttribute(ambientColors, 3));
    const ambientMaterial = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const ambientParticles = new THREE.Points(ambientGeometry, ambientMaterial);
    scene.add(ambientParticles);

    const glow = new THREE.PointLight(0xdce8ff, 4, 7);
    glow.position.set(-2, 2, 4);
    scene.add(glow);
    scene.add(new THREE.AmbientLight(0x202838, 0.7));

    let animationId = 0;
    let elapsed = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      elapsed += 0.016;
      const assembleProgress = Math.min(elapsed / 2.4, 1);
      const assembleEase = 1 - Math.pow(1 - assembleProgress, 3);
      ball.rotation.y = elapsed * 0.16;
      ball.rotation.x = Math.sin(elapsed * 0.35) * 0.08;
      ball.position.y = Math.sin(elapsed * 0.8) * 0.08;
      innerParticles.rotation.y = -elapsed * 0.28;
      innerParticles.rotation.z = Math.sin(elapsed * 0.55) * 0.06;
      ambientParticles.rotation.y = elapsed * 0.035;
      ambientParticles.position.y = Math.sin(elapsed * 0.28) * 0.08;
      const positionAttribute = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let index = 0; index < count; index += 1) {
        const pointIndex = index * 3;
        const pulse = 1 + Math.sin(elapsed * 1.2 + index * 0.015) * 0.018;
        positionAttribute.array[pointIndex] = THREE.MathUtils.lerp(scatterPositions[pointIndex], basePositions[pointIndex] * pulse, assembleEase);
        positionAttribute.array[pointIndex + 1] = THREE.MathUtils.lerp(scatterPositions[pointIndex + 1], basePositions[pointIndex + 1] * pulse, assembleEase);
        positionAttribute.array[pointIndex + 2] = THREE.MathUtils.lerp(scatterPositions[pointIndex + 2], basePositions[pointIndex + 2] * pulse, assembleEase);
      }
      positionAttribute.needsUpdate = true;
      const innerPositionAttribute = innerGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let index = 0; index < innerCount; index += 1) {
        const pointIndex = index * 3;
        innerPositionAttribute.array[pointIndex] = THREE.MathUtils.lerp(innerScatterPositions[pointIndex], innerBasePositions[pointIndex], assembleEase);
        innerPositionAttribute.array[pointIndex + 1] = THREE.MathUtils.lerp(innerScatterPositions[pointIndex + 1], innerBasePositions[pointIndex + 1], assembleEase);
        innerPositionAttribute.array[pointIndex + 2] = THREE.MathUtils.lerp(innerScatterPositions[pointIndex + 2], innerBasePositions[pointIndex + 2], assembleEase);
      }
      innerPositionAttribute.needsUpdate = true;
      glow.intensity = 3.6 + Math.sin(elapsed * 1.5) * 0.8;
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
      particleGeometry.dispose();
      particleMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="orbital-scene" />;
}