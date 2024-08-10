import React, {
  useCallback,
  useMemo,
  useState,
  createContext,
} from "react";
import { Container, useApp, useTick } from "@pixi/react";
import PIXI from "pixi.js";
import { ParallaxCamera } from "./parallax-camera/index.ts";

export const ParallaxCameraContext = createContext<ParallaxCamera | null>(null)

export type ParallaxCameraProps = {
  children?: React.ReactNode
  focalLength?: number
  movementDamping?: number
}

export function ParallaxCameraProvider(props: ParallaxCameraProps) {
  const { focalLength = 300, movementDamping = 10 } = props
  const { view, renderer } = useApp()
  const [baseContainer, setBaseContainer] = useState<PIXI.Container<PIXI.DisplayObject> | null>()

  const camera = useMemo(() => {
    if (baseContainer) {
      return new ParallaxCamera(view, renderer, baseContainer, focalLength, movementDamping)
    } else {
      return null
    }
  }, [baseContainer, view, renderer, focalLength, movementDamping])

  const animate = useCallback(() => {
    try {
      camera?.update()
    } catch (error) {
      console.error('Error updating camera: ', error)
    }
  }, [camera])
  useTick(animate)

  return (
    <Container ref={setBaseContainer} {...props}>
      <ParallaxCameraContext.Provider value={camera}>
        {props.children}
      </ParallaxCameraContext.Provider>
    </Container>
  )
}
