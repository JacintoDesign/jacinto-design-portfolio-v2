"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ShaderDevPanel } from "@/components/shader-dev-panel";

/**
 * Full-screen nebula shader behind the hero — slow drift of indigo, violet
 * and magenta clouds over the near-black void, cyan catching the cloud
 * edges, faint stars behind, a soft glow at the centre. Time and resolution
 * are the only animated inputs; there is no cursor interaction.
 *
 * Every tunable value is a uniform so the dev-only panel can adjust them
 * live. The material holds the uniforms object by reference, so mutating
 * a `.value` here or in the panel reaches the GPU on the next frame.
 */

export type NebulaUniforms = {
  uTime: { value: number };
  uResolution: { value: THREE.Vector2 };
  uPointer: { value: THREE.Vector2 };
  uParallax: { value: number };
  // Consumed on the CPU side (pointer easing rate), not in GLSL.
  uDamping: { value: number };
  uSpeed: { value: number };
  uDrift: { value: number };
  uScale: { value: number };
  uTurbulence: { value: number };
  uGlow: { value: number };
  uEdge: { value: number };
  uStars: { value: number };
  uGrain: { value: number };
  uBg: { value: THREE.Vector3 };
  uIndigo: { value: THREE.Vector3 };
  uViolet: { value: THREE.Vector3 };
  uMagenta: { value: THREE.Vector3 };
  uCyan: { value: THREE.Vector3 };
};

export function hexToVec3(hex: string): THREE.Vector3 {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255,
  );
}

// Palette comes from the CSS tokens so the shader can never drift from them.
function tokenVec3(name: string): THREE.Vector3 {
  return hexToVec3(
    getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
  );
}

function createUniforms(): NebulaUniforms {
  return {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uParallax: { value: 0.1 },
    uDamping: { value: 1.5 },
    uSpeed: { value: 0.045 },
    uDrift: { value: 0.075 },
    uScale: { value: 3.0 },
    uTurbulence: { value: 2.2 },
    uGlow: { value: 1.0 },
    uEdge: { value: 0.05 },
    uStars: { value: 1.0 },
    uGrain: { value: 0.04 },
    uBg: { value: tokenVec3("--bg") },
    uIndigo: { value: tokenVec3("--indigo") },
    uViolet: { value: tokenVec3("--violet") },
    uMagenta: { value: tokenVec3("--magenta") },
    uCyan: { value: tokenVec3("--accent") },
  };
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
  uniform vec2 uPointer;
  uniform float uParallax;
  uniform float uSpeed;
  uniform float uDrift;
  uniform float uScale;
  uniform float uTurbulence;
  uniform float uGlow;
  uniform float uEdge;
  uniform float uStars;
  uniform float uGrain;
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

  // hash() breaks down at the large coordinates stars feed it — fp32 fract
  // quantizes and the points snap into rows. This one stays stable there.
  float starHash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float stars(vec2 frag, float t) {
    // Sparse scatter of single-pixel points, drifting very slowly.
    vec2 p = frag / 2.5 + vec2(t * 1.5, t * 0.6);
    vec2 cell = floor(p);
    float rnd = starHash(cell);
    float star = step(0.99775, rnd);
    // Jitter each point inside its cell, fading by distance so it stays small.
    vec2 offset = vec2(starHash(cell + 17.0), starHash(cell + 43.0));
    float d = length(fract(p) - offset);
    return star * smoothstep(0.5, 0.0, d) * (0.3 + 0.7 * starHash(cell + 7.31));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

    // Stars keep the slow master clock; clouds run on their own, faster one.
    float t = uTime * uSpeed;
    float tc = uTime * uDrift;

    // The whole field drifts toward the (already eased) pointer.
    vec2 sp = (p - uPointer * uParallax) * uScale;

    // Domain-warped fbm for the cloud field, warped twice for turbulence.
    vec2 q = vec2(
      fbm(sp * 1.3 + vec2(tc, -tc * 0.7)),
      fbm(sp * 1.3 + vec2(-tc * 0.4, tc * 0.6) + 3.7)
    );
    vec2 r = vec2(
      fbm(sp * 1.4 + uTurbulence * q + vec2(tc * 0.8, tc * 0.4) + 1.7),
      fbm(sp * 1.4 + uTurbulence * q + vec2(-tc * 0.5, tc * 0.9) + 8.3)
    );
    float f = fbm(sp * 1.5 + uTurbulence * r + vec2(tc * 0.5, -tc * 0.3));

    vec3 col = uBg;
    col = mix(col, uIndigo, smoothstep(0.25, 0.9, f) * 0.9);
    col = mix(col, uViolet, smoothstep(0.5, 1.0, f) * 0.65);
    col = mix(col, uMagenta, smoothstep(0.55, 1.05, f * q.y + 0.35 * q.x) * 0.45);

    // Cyan catches the light where cloud density falls off.
    float edge = smoothstep(0.12, 0.0, abs(f - 0.58)) * smoothstep(0.3, 0.7, q.x);
    col += uCyan * edge * uEdge;

    // Soft glow at the centre, leaning a little further toward the pointer.
    vec2 gp = p - uPointer * uParallax * 1.6;
    float glow = exp(-dot(gp, gp) * 1.6);
    col += (uViolet * 0.30 + uMagenta * 0.12) * glow * uGlow;

    // Faint stars behind the clouds — dimmed where the field is dense.
    col += vec3(0.9, 0.92, 1.0) * stars(gl_FragCoord.xy, t) * uStars * (1.0 - smoothstep(0.45, 0.75, f));

    // Settle the corners back into the void.
    float vignette = smoothstep(1.9, 0.4, length(p * vec2(0.85, 1.0)));
    col = mix(uBg, col, vignette);

    // Fine animated grain — breaks up banding in the flat void.
    float grain = hash(gl_FragCoord.xy + vec2(fract(uTime) * 61.7, fract(uTime * 0.731) * 47.3));
    col += (grain - 0.5) * uGrain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function NebulaPlane({ uniforms }: { uniforms: NebulaUniforms }) {
  const gl = useThree((state) => state.gl);
  // Raw pointer target; uPointer eases toward it in useFrame.
  const pointerTarget = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointerTarget.current.set(
        THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1),
        THREE.MathUtils.clamp(-(((e.clientY - rect.top) / rect.height) * 2 - 1), -1, 1),
      );
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [gl]);

  // Built imperatively so the material keeps this exact uniforms object —
  // the dev panel mutates the same entries.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
      }),
    [uniforms],
  );

  useEffect(() => () => material.dispose(), [material]);

  // Per-frame writes go through the mesh ref — uniforms are three.js state,
  // not React state, and the frozen-props rule only exempts refs.
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, size, viewport }, delta) => {
    const mat = meshRef.current?.material as THREE.ShaderMaterial | undefined;
    if (!mat) return;
    const u = mat.uniforms as unknown as NebulaUniforms;
    u.uTime.value = clock.elapsedTime;
    u.uResolution.value.set(
      size.width * viewport.dpr,
      size.height * viewport.dpr,
    );
    // Lag behind the cursor and settle — frame-rate independent damping.
    u.uPointer.value.lerp(
      pointerTarget.current,
      1 - Math.exp(-delta * u.uDamping.value),
    );
  });

  return (
    <mesh ref={meshRef} frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

const subscribeNever = () => () => {};

export function ShaderBackground() {
  // Uniform defaults read the CSS tokens, so creation waits for the client;
  // the false server snapshot keeps hydration consistent without an effect.
  const isClient = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const uniforms = useMemo(
    () => (isClient ? createUniforms() : null),
    [isClient],
  );

  if (!uniforms) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Canvas dpr={[1, 2]} gl={{ antialias: false }} frameloop="always">
          <NebulaPlane uniforms={uniforms} />
        </Canvas>
      </div>
      {process.env.NODE_ENV !== "production" && (
        <ShaderDevPanel uniforms={uniforms} />
      )}
    </>
  );
}
