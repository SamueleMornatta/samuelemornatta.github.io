import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  useAnimations,
  useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Intro({ ...props }) {
  const scroll = useScroll();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/test.glb");
  const { actions } = useAnimations(animations, group);
  const [hovered, hover] = useState(false);
  //Empty.001Action
  useLayoutEffect(() =>
    Object.values(nodes).forEach(
      (node) => (node.receiveShadow = node.castShadow = true)
    )
  );
  useEffect(
    () => void (actions["Empty.001Action"].play().paused = true),
    [actions]
  );
  useFrame((state, delta) => {
    const action = actions["Empty.001Action"];
    const offset = scroll.offset;
    action.time = THREE.MathUtils.damp(
      action.time,
      action.getClip().duration * offset,
      100,
      delta
    );
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group
          name="Empty001"
          position={[11, 0, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.26}
        >
          <group name="Camera" scale={3.78}>
            <PerspectiveCamera
              makeDefault={true}
              far={1000}
              near={0.1}
              fov={22.9}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
        <mesh
          geometry={nodes.Text001.geometry}
          material={materials["Material.001"]}
          position={[-13.21, -1.27, 3.59]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.24}
        >
          <meshStandardMaterial color={"rgb(160,160,160)"} />
        </mesh>
        <mesh
          geometry={nodes.Text002.geometry}
          material={materials["Material.001"]}
          position={[0, 0, 3.37]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.24}
        >
          <meshStandardMaterial color={"rgb(160,160,160)"} />
        </mesh>
        <mesh
          geometry={nodes.Text003.geometry}
          material={materials["Material.001"]}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
          position={[-43.71, 11.79, 15.86]}
          rotation={[1.46, -0.29, -1.95]}
          scale={2.57}
        >
          <meshStandardMaterial color={hovered ? "orange" : "rgb(160,160,160)"} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/test.glb");
