import * as THREE from "three";

export const createParticleSystem = () => {
  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const layer = Math.floor(Math.random() * 3);
    const angle = Math.random() * Math.PI * 2;
    let radius, height;

    if (layer === 0) {
      radius = 2.2 + Math.random() * 0.3;
      height = (Math.random() - 0.5) * 0.3;
    } else if (layer === 1) {
      radius = 2.8 + Math.random() * 0.4;
      height = (Math.random() - 0.5) * 0.6;
    } else {
      radius = 3.2 + Math.random() * 0.8;
      height = (Math.random() - 0.5) * 1.0;
    }

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = height;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    if (Math.random() > 0.7) {
      colors[i * 3] = 0.0;
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 2] = 1.0;
    } else if (Math.random() > 0.4) {
      colors[i * 3] = 0.5 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.0;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    } else {
      colors[i * 3] = 0.1;
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }

    sizes[i] = Math.random() * 0.03 + 0.01;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pointTexture: {
        value: new THREE.TextureLoader().load(
          "/particle.png",
          undefined,
          undefined,
          () => {
            const canvas = document.createElement("canvas");
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext("2d");
            const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, 64, 64);
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            material.uniforms.pointTexture.value = texture;
          }
        ),
      },
    },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      uniform float time;
      
      void main() {
        vColor = color;
        vec3 pos = position;
        pos.y += sin(time + position.x * 2.0) * 0.1;
        pos.x += cos(time + position.z * 2.0) * 0.1;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
      }
    `,
    blending: THREE.AdditiveBlending,
    transparent: true,
    vertexColors: true,
  });

  return new THREE.Points(geometry, material);
};

export const createGlowEffect = (mesh) => {
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null },
      color: { value: new THREE.Color(0x0066ff) },
      coefficient: { value: 0.5 },
      power: { value: 2.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float coefficient;
      uniform float power;
      varying vec2 vUv;
      void main() {
        float dist = length(vUv - vec2(0.5));
        float glow = pow(1.0 - dist, power) * coefficient;
        gl_FragColor = vec4(color, glow);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  
  const glowMesh = new THREE.Mesh(
    mesh.geometry.clone(),
    glowMaterial
  );
  glowMesh.scale.multiplyScalar(1.1);
  mesh.add(glowMesh);
  
  return glowMesh;
};

export const createHolographicMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseTexture: { value: null },
      color: { value: new THREE.Color(0x3498db) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        vec3 newPosition = position;
        float wave = sin(position.x * 10.0 + time) * cos(position.z * 8.0 + time * 0.8) * 0.02;
        newPosition += normal * wave;
        newPosition += normal * sin(time * 2.0) * 0.02;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      uniform vec3 color;
      uniform sampler2D baseTexture;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      void main() {
        float line = sin(vUv.y * 100.0 + time * 2.0) * 0.03 + 0.97;
        float scanLine = step(0.99, fract(vUv.y * 50.0 - time));
        float dataLine = step(0.95, fract(vUv.x * 30.0 + time * 0.5));
        vec3 baseColor = color;
        baseColor.r += sin(time * 0.2) * 0.2;
        baseColor.g += sin(time * 0.3 + 2.0) * 0.1;
        baseColor.b += cos(time * 0.3) * 0.2;
        float dataEffect = step(0.98, random(vUv + time * 0.1));
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0,0.0,1.0)), 3.0);
        vec3 fresnelColor = vec3(0.4, 0.8, 1.0) * fresnel;
        vec2 distortedUV = vUv;
        distortedUV.x += sin(vUv.y * 10.0 + time) * 0.02;
        vec4 texColor = texture2D(baseTexture, distortedUV);
        vec3 finalColor = baseColor * line;
        finalColor += vec3(1.0) * scanLine * 0.3;
        finalColor += vec3(0.5, 0.8, 1.0) * dataLine * 0.2;
        finalColor += fresnelColor;
        finalColor += vec3(0.0, 0.5, 1.0) * dataEffect;
        if (texColor.a > 0.0) {
          finalColor = mix(finalColor, texColor.rgb, 0.7);
        }
        float glitch = step(0.98, sin(time * 10.0));
        finalColor *= mix(1.0, random(vUv + time), glitch * 0.2);
        gl_FragColor = vec4(finalColor, 0.85);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });
};