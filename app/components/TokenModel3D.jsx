"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import useSound from 'use-sound';
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { createParticleSystem, createHolographicMaterial } from "../utils/threeUtils";

function TokenModel3D() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const tokenRef = useRef(null);
  const composerRef = useRef(null);
  const frameIdRef = useRef(null);
  const particlesRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const [playRotate] = useSound('/sounds/whoosh.mp3', { volume: 0.3 });
  const [playHum] = useSound('/sounds/hum.mp3', { 
    volume: 0.2,
    loop: true
  });

  const { scrollYProgress } = useScroll();
  const angle = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);
  const float = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0]);

  useEffect(() => {
    playHum();
    return () => playHum.stop();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(new THREE.Color(0x000020), 0.02);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const blueLight = new THREE.PointLight(0x0066ff, 1, 10);
    blueLight.position.set(2, 2, 2);
    scene.add(blueLight);
    const purpleLight = new THREE.PointLight(0x9900ff, 1, 8);
    purpleLight.position.set(-2, 1, -2);
    scene.add(purpleLight);

    const geometry = new THREE.CylinderGeometry(2, 2, 0.3, 64, 4, true);
    const loader = new TextureLoader();
    const holographicMaterial = createHolographicMaterial();

    loader.load(
      "/token.svg",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        holographicMaterial.uniforms.baseTexture.value = texture;
      },
      undefined,
      (error) => {
        console.warn("No se pudo cargar la textura del token, usando fallback.", error);
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext("2d");
        context.fillStyle = "black";
        context.fillRect(0, 0, 512, 512);
        context.strokeStyle = "#0066ff";
        context.lineWidth = 20;
        context.beginPath();
        context.arc(256, 256, 200, 0, Math.PI * 2);
        context.stroke();
        context.font = "bold 120px Arial";
        context.fillStyle = "#0066ff";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("DHB", 256, 256);
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        holographicMaterial.uniforms.baseTexture.value = texture;
      }
    );

    const token = new THREE.Mesh(geometry, holographicMaterial);
    token.rotation.x = Math.PI / 2;
    scene.add(token);
    tokenRef.current = token;

    const particles = createParticleSystem();
    scene.add(particles);
    particlesRef.current = particles;

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);
    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.uniforms.amount.value = 0.0015;
    composer.addPass(rgbShiftPass);
    const filmPass = new FilmPass(0.35, 0.025, 1440, false);
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);
    const glitchPass = new GlitchPass();
    glitchPass.goWild = false;
    glitchPass.enabled = false;
    composer.addPass(glitchPass);

    const container = containerRef.current;
    container.style.cursor = "pointer";
    const handleMouseMove = (event) => {
      if (!container || !tokenRef.current) return;
      const rect = container.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const targetRotationX = mouseY * 0.5;
      const targetRotationY = mouseX * 0.5;
      tokenRef.current.rotation.x = Math.PI / 2 + targetRotationX * 0.3;
      tokenRef.current.rotation.y += (targetRotationY - tokenRef.current.rotation.y) * 0.1;
    };
    container.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = performance.now() * 0.001;
      if (tokenRef.current && tokenRef.current.material) {
        tokenRef.current.material.uniforms.time.value = elapsedTime;
      }
      if (particlesRef.current && particlesRef.current.material) {
        particlesRef.current.material.uniforms.time.value = elapsedTime;
        particlesRef.current.rotation.y += 0.001;
      }
      if (tokenRef.current) {
        tokenRef.current.rotation.y += 0.005;
        if (Math.abs(tokenRef.current.rotation.y % (Math.PI * 2)) < 0.01) {
          playRotate();
        }
      }
      float.get((value) => {
        tokenRef.current.position.y = value;
      });
      angle.get((value) => {
        tokenRef.current.rotation.y = value;
      });
      composer.render();
    };
    frameIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
      composer.dispose();
    };
  }, [isHovering]);

  useEffect(() => {
    const camera = cameraRef.current;
    const token = tokenRef.current;
    if (!camera || !token) return;
    const radius = 5;
    const height = 2;
    const updateCameraPosition = (latest) => {
      const currentAngle = latest;
      camera.position.x = radius * Math.cos(currentAngle);
      camera.position.z = radius * Math.sin(currentAngle);
      camera.position.y = height + float.get();
      camera.lookAt(token.position);
    };
    const unsub = angle.on("change", updateCameraPosition);
    updateCameraPosition(angle.get());
    return () => unsub();
  }, [angle, float]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[600px] relative rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-0" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center flex-col text-center pointer-events-none z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovering ? 1 : 0,
          y: isHovering ? 0 : 20,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-black/40 p-6 rounded-2xl backdrop-blur-lg max-w-md">
          <h3 className="text-white text-3xl font-bold mb-3">DHB Token</h3>
          <p className="text-blue-300 text-lg mb-4">Potencia todo el ecosistema</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <div className="font-bold text-white">Total Supply</div>
              <div className="text-blue-200">100M</div>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <div className="font-bold text-white">Staking APY</div>
              <div className="text-blue-200">12.5%</div>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <div className="font-bold text-white">Utility</div>
              <div className="text-blue-200">Governance</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TokenModel3D;