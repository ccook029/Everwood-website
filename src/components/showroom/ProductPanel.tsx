"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Group, MathUtils, RepeatWrapping } from "three";
import {
  ShowroomPanelProduct,
  productHref,
  showroomScene,
} from "../../lib/showroom-config";
import { useImageTexture } from "./useImageTexture";

const DEFAULT_DIMS = { w: 1.2, h: 1.9, d: 1.05 };

interface Props {
  product: ShowroomPanelProduct;
  position: [number, number, number];
  rotationY?: number;
  index?: number;
  onFocus?: () => void;
}

export default function ProductPanel({
  product,
  position,
  rotationY = 0,
  index = 0,
  onFocus,
}: Props) {
  const router = useRouter();
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const baseTexture = useImageTexture(product.image);

  const dims = product.dimensions3d ?? DEFAULT_DIMS;

  // Clone the cached texture so per-product UV crops don't bleed across panels.
  const frontTexture = useMemo(() => {
    if (!baseTexture) return null;
    const t = baseTexture.clone();
    t.needsUpdate = true;
    t.wrapS = RepeatWrapping;
    t.wrapT = RepeatWrapping;
    const crop = product.frontCrop;
    if (crop) {
      t.offset.set(crop[0], crop[1]);
      t.repeat.set(crop[2], crop[3]);
    }
    return t;
  }, [baseTexture, product.frontCrop]);

  const sitY = dims.h / 2 + 0.1; // sit on top of pedestal cap

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Continuous slow auto-rotate so depth/3D-ness reads instantly
    const rotSpeed = hovered ? 0.55 : 0.18;
    group.current.rotation.y += rotSpeed * dt;
    // Subtle vertical float
    const float = Math.sin(t * 0.6 + index * 0.7) * 0.03;
    const targetY = sitY + float + (hovered ? 0.15 : 0);
    group.current.position.y = MathUtils.lerp(group.current.position.y, targetY, 0.08);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    router.push(productHref(product));
  };
  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onFocus?.();
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };

  const cedarRoughness = 0.85;
  const emissiveBoost = hovered ? 0.7 : 0.45;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Pedestal />
      <group ref={group} position={[0, sitY, 0]}>
        <mesh
          onClick={handleClick}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[dims.w, dims.h, dims.d]} />
          {/* Material order on a BoxGeometry: +X, -X, +Y, -Y, +Z (front), -Z */}
          <meshStandardMaterial
            attach="material-0"
            color={showroomScene.cedar}
            roughness={cedarRoughness}
          />
          <meshStandardMaterial
            attach="material-1"
            color={showroomScene.cedar}
            roughness={cedarRoughness}
          />
          <meshStandardMaterial
            attach="material-2"
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.2}
          />
          <meshStandardMaterial
            attach="material-3"
            color="#0a0a0a"
            roughness={0.95}
          />
          {frontTexture ? (
            <meshStandardMaterial
              attach="material-4"
              map={frontTexture}
              emissiveMap={frontTexture}
              emissive="#ffffff"
              emissiveIntensity={emissiveBoost}
              roughness={0.3}
            />
          ) : (
            <meshStandardMaterial
              attach="material-4"
              color={showroomScene.forest}
              roughness={0.7}
              emissive={showroomScene.cedar}
              emissiveIntensity={hovered ? 0.25 : 0.1}
            />
          )}
          <meshStandardMaterial
            attach="material-5"
            color={showroomScene.cedar}
            roughness={cedarRoughness}
          />
        </mesh>

        {/* Warm interior glow leaking from the front face */}
        {frontTexture && (
          <pointLight
            position={[0, 0, dims.d / 2 + 0.4]}
            color={showroomScene.warmLight}
            intensity={hovered ? 2.5 : 1.2}
            distance={3.5}
            decay={2}
          />
        )}
      </group>
    </group>
  );
}

function Pedestal() {
  return (
    <group>
      <pointLight
        position={[0, 0.4, 0]}
        color={showroomScene.warmLight}
        intensity={1.2}
        distance={3.5}
        decay={2}
      />
      <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.7, 0.8, 0.1, 32]} />
        <meshStandardMaterial
          color={showroomScene.forest}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.7, 24]} />
        <meshStandardMaterial color={showroomScene.cedar} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.65, 0.65, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}
