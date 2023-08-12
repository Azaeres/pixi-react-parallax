import { useEffect, useCallback, useContext, useState } from 'react'
import PIXI from 'pixi.js'
import { ParallaxCamera } from './parallax-camera/ParallaxCamera.js'
import { ParallaxCameraContext } from './ParallaxCameraProvider.js'

export function useParallaxCameraTarget(camera?: ParallaxCamera) {
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
