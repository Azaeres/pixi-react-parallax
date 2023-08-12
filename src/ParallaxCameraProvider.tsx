import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  createContext,
} from "react";
import {
  Container,
  useApp,
  useTick,
} from "@pixi/react";
import PIXI from "pixi.js";
import { ParallaxCamera } from "./parallax-camera/index.ts";

export const ParallaxCameraContext = createContext<ParallaxCamera | null>(null);

export type ParallaxCameraProps = {
  children?: React.ReactNode;
};

export function ParallaxCameraProvider(props: ParallaxCameraProps) {
  const { view, renderer, stage } = useApp();
  const [baseContainer, setBaseContainer] =
    useState<PIXI.Container<PIXI.DisplayObject> | null>();

  const camera = useMemo(() => {
    if (baseContainer) {
      return new ParallaxCamera(view, renderer, baseContainer, 300, 10);
    } else {
      return null;
    }
  }, [view, renderer, baseContainer]);

  useEffect(() => {
    baseContainer && stage.addChild(baseContainer);
    return () => {
      baseContainer && stage.removeChild(baseContainer);
    };
  }, [stage, camera, baseContainer]);

  const animate = useCallback(() => {
    try {
      camera?.update();
    } catch (error) {
      console.error("Error updating camera: ", error);
    }
  }, [camera]);
  useTick(animate);

  return (
    <Container ref={setBaseContainer} {...props}>
      <ParallaxCameraContext.Provider value={camera}>
        {props.children}
      </ParallaxCameraContext.Provider>
    </Container>
  );
}
