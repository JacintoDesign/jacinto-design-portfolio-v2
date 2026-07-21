"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Full-screen nebula shader behind the hero — slow drift of indigo, violet
 * and magenta clouds over the near-black void, cyan catching the cloud
 * edges, faint stars behind, a soft glow at the centre. Time and resolution
 * are the only animated inputs; there is no cursor interaction.
 */

// Palette comes from the CSS tokens so the shader can never drift from them.
function tokenVec3(name: string): THREE.Vector3 {
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255,
  );
}

const vertexShader = /* glsl */ `
  // Fullscreen quad — bypass the camera entirely.
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uBg;
  uniform vec3 uIndigo;
  uniform vec3 uViolet;
  uniform vec3 uMagenta;
  uniform vec3 uCyan;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p = rot * p * 2.03;
      amp *= 0.5;
    }
    return v;
  }

  float stars(vec2 frag, float t) {
    // Sparse grid of single-pixel points, drifting very slowly.
    vec2 p = frag / 2.5 + vec2(t * 1.5, t * 0.6);
    vec2 cell = floor(p);
    float rnd = hash(cell);
    float star = step(0.997, rnd);
    // Fade each point by its distance to the cell centre so it stays small.
    float d = length(fract(p) - 0.5);
    return star * smoothstep(0.5, 0.0, d) * (0.3 + 0.7 * hash(cell + 7.31));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

    float t = uTime * 0.045;
    // Clouds run on their own, faster clock; stars keep the slow one.
    float tc = uTime * 0.075;

    // Domain-warped fbm for the cloud field, warped twice for turbulence.
    vec2 q = vec2(
      fbm(p * 1.3 + vec2(tc, -tc * 0.7)),
      fbm(p * 1.3 + vec2(-tc * 0.4, tc * 0.6) + 3.7)
    );
    vec2 r = vec2(
      fbm(p * 1.4 + 2.2 * q + vec2(tc * 0.8, tc * 0.4) + 1.7),
      fbm(p * 1.4 + 2.2 * q + vec2(-tc * 0.5, tc * 0.9) + 8.3)
    );
    float f = fbm(p * 1.5 + 2.2 * r + vec2(tc * 0.5, -tc * 0.3));

    vec3 col = uBg;
    col = mix(col, uIndigo, smoothstep(0.25, 0.9, f) * 0.9);
    col = mix(col, uViolet, smoothstep(0.5, 1.0, f) * 0.65);
    col = mix(col, uMagenta, smoothstep(0.55, 1.05, f * q.y + 0.35 * q.x) * 0.45);

    // Cyan catches the light where cloud density falls off.
    float edge = smoothstep(0.12, 0.0, abs(f - 0.58)) * smoothstep(0.3, 0.7, q.x);
    col += uCyan * edge * 0.10;

    // Soft glow at the centre.
    float glow = exp(-dot(p, p) * 1.6);
    col += (uViolet * 0.30 + uMagenta * 0.12) * glow;

    // Faint stars behind the clouds — dimmed where the field is dense.
    col += vec3(0.9, 0.92, 1.0) * stars(gl_FragCoord.xy, t) * 0.35 * (1.0 - smoothstep(0.45, 0.75, f));

    // Settle the corners back into the void.
    float vignette = smoothstep(1.9, 0.4, length(p * vec2(0.85, 1.0)));
    col = mix(uBg, col, vignette);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function NebulaPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBg: { value: tokenVec3("--bg") },
      uIndigo: { value: tokenVec3("--indigo") },
      uViolet: { value: tokenVec3("--violet") },
      uMagenta: { value: tokenVec3("--magenta") },
      uCyan: { value: tokenVec3("--accent") },
    }),
    [],
  );

  useFrame(({ clock, size, viewport }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uResolution.value.set(
      size.width * viewport.dpr,
      size.height * viewport.dpr,
    );
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} gl={{ antialias: false }} frameloop="always">
        <NebulaPlane />
      </Canvas>
    </div>
  );
}
