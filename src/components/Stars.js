import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Stars(props) {
  const starsMarkup = Array(props.nStars)
    .fill("")
    .map((list, index) => {
      return (
        <mesh
          scale={1}
          key={index}
          position={[
            THREE.MathUtils.randFloatSpread(props.spread),
            THREE.MathUtils.randFloatSpread(props.spread),
            THREE.MathUtils.randFloatSpread(props.spread),
          ]}
        >
          <sphereGeometry args={[0.25, 24, 24]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
      );
    });
  return starsMarkup;
}
