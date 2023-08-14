import React, { useEffect, useContext } from 'react'
import { PixiComponent } from '@pixi/react'
import { ParallaxLayer as ParallaxLayerContainer } from './parallax-camera/ParallaxLayer.ts'
import { ParallaxCameraContext } from './ParallaxCameraProvider.tsx'

export interface ParallaxLayerProps {
  zIndex?: number
  children?: React.ReactNode
}

export function ParallaxLayer(props: ParallaxLayerProps) {
  const layerRef = React.useRef<ParallaxLayerContainer>(null)
  const camera = useContext(ParallaxCameraContext)
  useEffect(() => {
    const layer = layerRef.current
    if (layer) {
      if (props.zIndex !== undefined) {
        layer.pz = props.zIndex
      }
      camera?.addLayer(layer)
    }
    return () => {
      layer && camera?.removeLayer(layer)
    }
  }, [camera, props.zIndex, layerRef])
  return <CustomParallaxLayer ref={layerRef} {...props} />
}

const CustomParallaxLayer = PixiComponent('ParallaxLayer', {
  create: (props: ParallaxLayerProps) => {
    return new ParallaxLayerContainer(props.zIndex)
  },
})
