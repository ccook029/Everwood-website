"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Group, MathUtils } from "three";
import {
  ShowroomSpinProduct,
  productHref,
  showroomScene,
} from "../../lib/showroom-config";
import { useSequenceTextures } from "./useImageTexture";

interface Props {
  product: ShowroomSpinProduct;
  position: [number, number, number];
  rotationY?: number;
  index?: number;
  onFocus?: () => void;
}

function buildSpinUrls(p: ShowroomSpinProduct): string[] {
  const ext = p.extension ?? "jpg";
  const pad = p.pad ?? 2;
  const folder = p.spinFolder.replace(/\/$/, "");
  return Array.from({ length: p.frameCount }, (_, i) => {
    const n = String(i + 1).padStart(pad, "0");
    return `${folder}/${n}.${ext}`;
  });
}

export default function SpinViewer({
  product,
  position,
  rotationY = 0,
  index = 0,
  onFocus,
}: Props) {
  const router = useRouter();
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);
  const dragRef = useRef<{ active: boolean; startX: number; startFrame: number; moved: boolean }>(
    { active: false, startX: 0, startFrame: 0, moved: false },
  );

  const urls = useMemo(() => buildSpinUrls(product), [product]);
  const textures = useSequenceTextures(urls);
  const activeTexture = textures[frame] ?? textures.find((t) => t) ?? null;

  const aspect = product.aspect ?? 1;
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

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startFrame: frame,
      moved: false,
    };
  };
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    const sensitivity = 6; // pixels per frame step
    const delta = Math.round(dx / sensitivity);
    const next = ((dragRef.current.startFrame + delta) % product.frameCount + product.frameCount)
      % product.frameCount;
    if (next !== frame) setFrame(next);
  };
  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    const wasDrag = dragRef.current.moved;
    dragRef.current.active = false;
    if (!wasDrag) {
      router.push(productHref(product));
    }
  };
  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onFocus?.();
    document.body.style.cursor = "grab";
  };
  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Pedestal />
      <group ref={group} position={[0, showroomScene.panelHeight, 0]}>
        <RoundedBox
          args={[panelW + 0.14, panelH + 0.14, 0.08]}
          radius={0.04}
          smoothness={4}
          castShadow
        >
          <meshStandardMaterial
            color={showroomScene.cedar}
            roughness={0.6}
            emissive={showroomScene.cedar}
            emissiveIntensity={hovered ? 0.4 : 0.1}
          />
        </RoundedBox>
        <mesh
          position={[0, 0, 0.05]}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
          <planeGeometry args={[panelW, panelH]} />
          {activeTexture ? (
            <meshStandardMaterial
              map={activeTexture}
              roughness={0.4}
              emissiveMap={activeTexture}
              emissive="#ffffff"
              emissiveIntensity={hovered ? 0.5 : 0.25}
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
      <pointLight
        position={[0, 0.4, 0]}
        color={showroomScene.warmLight}
        intensity={1.2}
        distance={3.5}
        decay={2}
      />
      <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.1, 32]} />
        <meshStandardMaterial color={showroomScene.forest} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.5, 0.9, 24]} />
        <meshStandardMaterial color={showroomScene.cedar} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}
