import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import PIXI, { DisplayObject } from 'pixi.js'
import { ParallaxCamera } from './parallax-camera/ParallaxCamera.ts'
import { ParallaxCameraContext } from './ParallaxCameraProvider.tsx'

export function useParallaxCameraRef(): [
  React.MutableRefObject<unknown>,
  (displayObject?: DisplayObject | null) => void,
] {
  const setCameraTarget = useParallaxCameraTarget()
  const cameraTargetRef = useRef<unknown>()

  const setCameraTargetRef = useCallback(
    (displayObject?: DisplayObject | null) => {
      cameraTargetRef.current = displayObject
      setCameraTarget(displayObject)
    },
    [setCameraTarget]
  )

  useEffect(() => {
    return () => {
      // Release the camera target upon cleanup.
      cameraTargetRef.current = undefined
      setCameraTarget(undefined)
    }
  }, [setCameraTarget])
  return [cameraTargetRef, setCameraTargetRef]
}

function useParallaxCameraTarget(camera?: ParallaxCamera) {
  const contextCamera = useContext(ParallaxCameraContext)
  const _camera = contextCamera || camera
  const [cameraTarget, setCameraTarget] = useState<PIXI.DisplayObject>()
  useEffect(() => {
    if (_camera) {
      cameraTarget && _camera.setTarget(cameraTarget)
    }
  }, [_camera, cameraTarget])

  const _setCameraTarget = useCallback(
    (newTarget?: PIXI.DisplayObject | null) => {
      _camera?.setTarget(newTarget === null ? undefined : newTarget)
      setCameraTarget(newTarget === null ? undefined : newTarget)
    },
    [_camera]
  )

  return _setCameraTarget
}
