"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Group, MathUtils } from "three";
import {
  ShowroomPanelProduct,
  productHref,
  showroomScene,
} from "../../lib/showroom-config";
import { useImageTexture } from "./useImageTexture";

interface Props {
  product: ShowroomPanelProduct;
  position: [number, number, number];
  rotationY?: number;
  /** Index used to phase-offset the floating animation */
  index?: number;
  /** Called when the user hovers this panel (so the scene can update its overlay) */
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
  const texture = useImageTexture(product.image);

  const aspect = product.aspect ?? 4 / 5;
  const panelW = showroomScene.panelWidth;
  const panelH = panelW / aspect;
  const baseY = position[1];

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const float = Math.sin(t * 0.6 + index * 0.7) * 0.04;
    const targetY = baseY + float + (hovered ? 0.15 : 0);
    group.current.position.y = MathUtils.lerp(group.current.position.y, targetY, 0.08);
    const targetScale = hovered ? 1.05 : 1;
    const s = MathUtils.lerp(group.current.scale.x, targetScale, 0.1);
    group.current.scale.set(s, s, s);
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

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Pedestal />
      <group ref={group} position={[0, showroomScene.panelHeight, 0]}>
        {/* Outer frame */}
        <RoundedBox
          args={[panelW + 0.14, panelH + 0.14, 0.08]}
          radius={0.04}
          smoothness={4}
          castShadow
        >
          <meshStandardMaterial
            color={showroomScene.cedar}
            roughness={0.6}
            metalness={0.05}
            emissive={showroomScene.cedar}
            emissiveIntensity={hovered ? 0.35 : 0.08}
          />
        </RoundedBox>
        {/* Photo plane */}
        <mesh
          position={[0, 0, 0.05]}
          onClick={handleClick}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
          <planeGeometry args={[panelW, panelH]} />
          {texture ? (
            <meshStandardMaterial
              map={texture}
              roughness={0.4}
              metalness={0}
              emissiveMap={texture}
              emissive="#ffffff"
              emissiveIntensity={hovered ? 0.5 : 0.25}
              toneMapped
            />
          ) : (
            <meshStandardMaterial
              color={showroomScene.forest}
              roughness={0.7}
              emissive={showroomScene.cedar}
              emissiveIntensity={0.1}
            />
          )}
        </mesh>

      </group>
    </group>
  );
}

function Pedestal() {
  return (
    <group>
      {/* warm under-glow */}
      <pointLight
        position={[0, 0.4, 0]}
        color={showroomScene.warmLight}
        intensity={1.2}
        distance={3.5}
        decay={2}
      />
      <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.1, 32]} />
        <meshStandardMaterial
          color={showroomScene.forest}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.5, 0.9, 24]} />
        <meshStandardMaterial
          color={showroomScene.cedar}
          roughness={0.7}
        />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}
