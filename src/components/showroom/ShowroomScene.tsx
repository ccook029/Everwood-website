"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Vector3, MathUtils } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  showroomProducts,
  showroomScene,
  ShowroomProduct,
  productHref,
} from "../../lib/showroom-config";
import { formatPrice } from "../../lib/formatPrice";
import ProductPanel from "./ProductPanel";
import SpinViewer from "./SpinViewer";

interface Station {
  product: ShowroomProduct;
  position: [number, number, number];
  rotationY: number;
  camera: [number, number, number];
  lookAt: [number, number, number];
}

function buildStations(): Station[] {
  const r = showroomScene.ringRadius;
  const n = showroomProducts.length;
  return showroomProducts.map((p, i) => {
    if (p.position) {
      const [x, , z] = p.position;
      const ry = p.rotationY ?? Math.atan2(-x, -z);
      return {
        product: p,
        position: p.position,
        rotationY: ry,
        camera: [x * 0.55, 1.8, z * 0.55] as [number, number, number],
        lookAt: [x, 1.6, z] as [number, number, number],
      };
    }
    const angle = (i / n) * Math.PI * 2;
    const x = Math.sin(angle) * r;
    const z = Math.cos(angle) * r;
    // Cameras sit inside the ring, looking outward at each cabin
    const cx = Math.sin(angle) * (r - 3.5);
    const cz = Math.cos(angle) * (r - 3.5);
    return {
      product: p,
      position: [x, 0, z],
      rotationY: angle + Math.PI, // face inward toward centre
      camera: [cx, 1.6, cz],
      lookAt: [x, 1.05, z], // cabin mid-height
    };
  });
}

export default function ShowroomScene() {
  const stations = useMemo(buildStations, []);
  // Start on the first station that actually has a photo so the loaded
  // texture is visible on initial render instead of a placeholder.
  const firstWithImage = useMemo(() => {
    const idx = stations.findIndex(
      (s) =>
        (s.product.mode === "panel" && !!s.product.image) ||
        s.product.mode === "spin",
    );
    return idx === -1 ? 0 : idx;
  }, [stations]);
  const [activeStation, setActiveStation] = useState(firstWithImage);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Drive station index from page scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sceneRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const progress = MathUtils.clamp(-rect.top / total, 0, 1);
        const idx = Math.min(
          stations.length - 1,
          Math.floor(progress * stations.length),
        );
        setActiveStation(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stations.length]);

  return (
    <div
      ref={sceneRef}
      className="relative"
      style={{ height: `${Math.max(stations.length, 4) * 75}vh` }}
    >
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          shadows
          dpr={[1, showroomScene.maxDpr]}
          camera={{ position: stations[firstWithImage].camera, fov: 55, near: 0.1, far: 60 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          style={{ background: showroomScene.background }}
        >
          <color attach="background" args={[showroomScene.background]} />
          <fog
            attach="fog"
            args={[
              showroomScene.fogColor,
              showroomScene.fogNear,
              showroomScene.fogFar,
            ]}
          />

          <Suspense fallback={null}>
            <Lights />
            <Room />
            {stations.map((s, i) =>
              s.product.mode === "spin" ? (
                <SpinViewer
                  key={s.product.slug}
                  product={s.product}
                  position={s.position}
                  rotationY={s.rotationY}
                  index={i}
                  onFocus={() => setActiveStation(i)}
                />
              ) : (
                <ProductPanel
                  key={s.product.slug}
                  product={s.product}
                  position={s.position}
                  rotationY={s.rotationY}
                  index={i}
                  onFocus={() => setActiveStation(i)}
                />
              ),
            )}
            <CameraRig
              stations={stations}
              activeStation={activeStation}
            />
            <Preload all />
            <BakeShadows />
          </Suspense>

          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom
              intensity={0.6}
              luminanceThreshold={0.55}
              luminanceSmoothing={0.2}
              mipmapBlur
            />
          </EffectComposer>

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>

        <ActiveStationCard product={stations[activeStation]?.product} />

        {/* Subtle scroll hint */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
          style={{
            fontFamily:
              'DM Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            color: showroomScene.cream,
            opacity: 0.55,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Scroll to explore · drag to look around
        </div>

        {/* Accessibility: every product reachable via keyboard, hidden visually */}
        <ul className="sr-only">
          {stations.map((s) => (
            <li key={s.product.slug}>
              <Link
                href={productHref(s.product)}
                aria-label={`${s.product.name}, ${s.product.collection}, ${formatPrice(s.product.price)}. View product details.`}
              >
                {s.product.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ActiveStationCard({ product }: { product?: ShowroomProduct }) {
  if (!product) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-6 z-10 flex justify-center px-4 sm:left-auto sm:right-8 sm:top-1/2 sm:-translate-y-1/2 sm:justify-end">
      <div
        className="pointer-events-auto w-full max-w-sm rounded-lg p-5 backdrop-blur-md sm:w-80"
        style={{
          background: "rgba(43,43,43,0.7)",
          border: "1px solid rgba(166,124,82,0.35)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.25em]"
          style={{ color: showroomScene.cedar }}
        >
          {product.collection}
        </div>
        <h2
          className="mt-2 font-heading text-2xl"
          style={{ color: showroomScene.cream }}
        >
          {product.name}
        </h2>
        <div className="mt-1 text-sm" style={{ color: showroomScene.cream, opacity: 0.8 }}>
          {formatPrice(product.price)}
          {product.mode === "spin" && (
            <span className="ml-2 inline-block rounded-full bg-cedar/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cream">
              360° · drag
            </span>
          )}
        </div>
        <Link
          href={productHref(product)}
          aria-label={`View ${product.name} product details`}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-cedar px-4 py-2 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
        >
          View Product →
        </Link>
      </div>
    </div>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} color={showroomScene.cream} />
      <hemisphereLight
        args={[showroomScene.cedar, "#000000", 0.25]}
      />
      {/* Central warm ember */}
      <pointLight
        position={[0, 3, 0]}
        color={showroomScene.warmLight}
        intensity={showroomScene.warmLightIntensity}
        distance={14}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[0, 5.5, 0]}
        color={showroomScene.cedar}
        intensity={1.5}
        distance={20}
        decay={2}
      />
    </>
  );
}

function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial
          color="#1a120c"
          roughness={0.95}
          metalness={0}
        />
      </mesh>
      {/* Cedar-lined cylindrical walls (inside) */}
      <mesh position={[0, 4, 0]} receiveShadow>
        <cylinderGeometry args={[12, 12, 8, 64, 1, true]} />
        <meshStandardMaterial
          color={showroomScene.cedar}
          roughness={0.85}
          metalness={0.05}
          side={1 /* BackSide */}
        />
      </mesh>
      {/* Ceiling cap */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial color="#15100a" roughness={1} />
      </mesh>
    </group>
  );
}

function CameraRig({
  stations,
  activeStation,
}: {
  stations: Station[];
  activeStation: number;
}) {
  const { camera } = useThree();
  const initial = stations[activeStation] ?? stations[0];
  const target = useRef(new Vector3(...initial.lookAt));
  const desiredCam = useRef(new Vector3(...initial.camera));
  const orbitRef = useRef<OrbitControlsImpl | null>(null);
  const snappedRef = useRef(false);

  useFrame(() => {
    const s = stations[activeStation];
    if (!s) return;
    desiredCam.current.set(...s.camera);
    target.current.set(...s.lookAt);
    if (!snappedRef.current) {
      // Snap on the first frame so users see the first station immediately
      camera.position.copy(desiredCam.current);
      if (orbitRef.current) {
        orbitRef.current.target.copy(target.current);
        orbitRef.current.update();
      }
      snappedRef.current = true;
      return;
    }
    camera.position.lerp(desiredCam.current, 0.04);
    if (orbitRef.current) {
      orbitRef.current.target.lerp(target.current, 0.06);
      orbitRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={orbitRef}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      minPolarAngle={Math.PI / 2.6}
      maxPolarAngle={Math.PI / 1.85}
    />
  );
}
