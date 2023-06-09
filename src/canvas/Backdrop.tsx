import React, { useRef } from "react";
import {
  AccumulativeShadows,
  AccumulativeShadowsProps,
  RandomizedLight,
} from "@react-three/drei";

type Props = {};

const Backdrop = (props: Props) => {
  const shadows = useRef<any>();

  return (
    <AccumulativeShadows
      ref={shadows}
      frames={60}
      position={[0, 0, -0.14]}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      alphaTest={0.85} // set transparency of shadows
      temporal // smooth out the edges of shadows over time
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
