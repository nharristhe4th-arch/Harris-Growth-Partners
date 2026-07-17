"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SectionVariant = {
  id: string;
  tint: [number, number, number];
  speed: number;
};

// Same dark-navy/gold family everywhere, just a gentle shift in tint
// and drift speed per section so each part of the page feels subtly
// distinct without breaking the overall brand.
const SECTION_VARIANTS: SectionVariant[] = [
  { id: "top", tint: [0.4, 0.48, 0.68], speed: 1.0 },
  { id: "services", tint: [0.46, 0.54, 0.62], speed: 1.15 },
  { id: "process", tint: [0.62, 0.52, 0.4], speed: 0.85 },
  { id: "about", tint: [0.42, 0.47, 0.58], speed: 1.0 },
  { id: "contact", tint: [0.66, 0.54, 0.38], speed: 1.1 },
];

// --- Motion tuning -----------------------------------------------------
// Ambient pace at rest: time accumulates ~60/frame-sec, so a full pulse
// cycle takes roughly 1 / (60 * BASE_TIME_SCALE) seconds. At 0.0025 that's
// ~6.7s per cycle -- calm and barely-there, versus the old 0.035 (~0.5s
// per cycle, close to strobe territory).
const BASE_TIME_SCALE = 0.0025;
// While actively scrolling, speed is boosted by up to this fraction
// (0.25 = +25%, a subtle lift, not a dramatic speed change).
const SCROLL_SPEED_BOOST = 0.25;
// Per-frame exponential decay of the scroll "energy" that drives the
// boost above. ~0.965 means it settles back to baseline over roughly
// 1-1.5s after scrolling stops -- an ease-out, not an instant snap.
const SCROLL_ENERGY_DECAY = 0.965;
// How strongly the ring's phase is skewed by angle-around-the-circle,
// turning a uniform outward pulse into a wave that travels around the
// circumference as it expands.
const ROTATION_STRENGTH = 0.35;
// Frequency of the slow sine drift that shifts the travel direction
// between clockwise and counter-clockwise. ~0.0015 is a full
// clockwise -> counter-clockwise -> clockwise cycle roughly every 70s,
// so the direction change itself is never perceptible as motion, only
// felt as an organic drift over time.
const ROTATION_DRIFT_FREQ = 0.0015;

const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform vec2 mouse;
  uniform vec3 tint;
  uniform float speed;
  uniform float quality;
  uniform float rotation;

  float random(float x) {
    return fract(sin(x) * 1e4);
  }

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

    // Angle around the circle (-0.5..0.5), used to skew phase so the
    // pulse becomes a traveling/rotating wave rather than a uniform
    // "heartbeat" expanding evenly in all directions at once.
    float angle = atan(uv.y, uv.x) / 6.2831853;

    float t = time * ${BASE_TIME_SCALE} * speed + random(uv.x) * 0.4;
    float lineWidth = 0.00016;

    int iCount = quality > 0.5 ? 5 : 3;
    int jCount = quality > 0.5 ? 3 : 2;

    vec3 color = vec3(0.0);
    for (int j = 0; j < 3; j++) {
      if (j >= jCount) break;
      for (int i = 0; i < 5; i++) {
        if (i >= iCount) break;
        float phase = t - 0.01 * float(j) + float(i) * 0.01 + angle * rotation;
        color[j] += lineWidth * float(i * i) / abs(fract(phase) - length(uv));
      }
    }

    // Soft glow that follows the cursor -- additive, so it never
    // punches a hard hole in the pattern, just a gentle local lift.
    vec2 mouseUv = (mouse * resolution * 2.0 - resolution) / min(resolution.x, resolution.y);
    float distToMouse = length(uv - mouseUv);
    float mouseGlow = smoothstep(0.7, 0.0, distToMouse) * 0.12;

    vec3 finalColor = color.b * tint + color.g * tint * 0.75 + color.r * tint * 0.55;
    finalColor += mouseGlow * tint;
    finalColor = min(finalColor, vec3(0.55));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced-motion visitors get the plain dark background from
    // globals.css and nothing else -- no canvas mounted at all, so
    // there's nothing animated to pause or disable.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const geometry = new THREE.PlaneGeometry(2, 2);

    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const tint = new THREE.Vector3(...SECTION_VARIANTS[0].tint);
    const targetTint = new THREE.Vector3(...SECTION_VARIANTS[0].tint);
    let targetSpeed = SECTION_VARIANTS[0].speed;
    let sectionSpeedSmoothed = SECTION_VARIANTS[0].speed;
    let scrollEnergy = 0;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2() },
      mouse: { value: mouse },
      tint: { value: tint },
      speed: { value: SECTION_VARIANTS[0].speed },
      quality: { value: isMobile ? 0 : 1 },
      rotation: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.75));
    container.appendChild(renderer.domElement);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
      );
    }
    resize();
    window.addEventListener("resize", resize);

    function onPointerMove(e: PointerEvent) {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    }
    window.addEventListener("pointermove", onPointerMove);

    const sectionEls = SECTION_VARIANTS
      .map((v) => ({ v, el: document.getElementById(v.id) }))
      .filter((s): s is { v: SectionVariant; el: HTMLElement } => s.el !== null);

    function updateActiveSection() {
      if (sectionEls.length === 0) return;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closest = sectionEls[0];
      let closestDist = Infinity;
      for (const s of sectionEls) {
        const rect = s.el.getBoundingClientRect();
        const center = rect.top + window.scrollY + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = s;
        }
      }
      targetTint.set(...closest.v.tint);
      targetSpeed = closest.v.speed;
    }

    let scrollTicking = false;
    function onScroll() {
      // Scrolling nudges the "energy" that drives the subtle speed
      // boost straight up; onScroll fires repeatedly while the user is
      // actively scrolling, so it stays near its ceiling the whole
      // time. Once scroll events stop arriving, SCROLL_ENERGY_DECAY in
      // the render loop eases it back down on its own -- no timer, no
      // instant snap.
      scrollEnergy = 1;
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        scrollTicking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();

    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      uniforms.time.value += 1;

      mouse.lerp(targetMouse, 0.06);
      tint.lerp(targetTint, 0.02);

      // Two independent eased quantities combine into the final speed:
      // a slow lerp toward whichever section is active, times a small
      // scroll-driven boost that decays exponentially on its own.
      sectionSpeedSmoothed += (targetSpeed - sectionSpeedSmoothed) * 0.02;
      scrollEnergy *= SCROLL_ENERGY_DECAY;
      uniforms.speed.value = sectionSpeedSmoothed * (1 + scrollEnergy * SCROLL_SPEED_BOOST);

      // Rotation direction drifts slowly between clockwise and
      // counter-clockwise via a very low-frequency sine wave, rather
      // than spinning one way forever.
      uniforms.rotation.value = Math.sin(uniforms.time.value * ROTATION_DRIFT_FREQ) * ROTATION_STRENGTH;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20"
    >
      {/* Universal scrim between the shader and page content so text
          always has a contrast floor, regardless of what the pattern
          is doing underneath at any given moment. */}
      <div className="pointer-events-none absolute inset-0 bg-paper/45" />
    </div>
  );
}
