import state from "@store/index";
import { easing } from "maath";
import React, { ReactNode, useRef } from "react";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";

type Props = {
  children: ReactNode;
};

const CameraRig = ({ children }: Props) => {
  const group = useRef<any>();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set the initial position of the model
    let targetPosition: [x: number, y: number, z: number] = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Set model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
