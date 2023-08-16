# Pixi React Parallax

## Demo

[Head over to the Etherion Lab](https://lab.etherion.app/experiment1) for a demonstration of the parallax effect. The laboratory will be undergoing active development, but I'll commit to making sure a parallax demo is available at Experiment 1.

## Installation

This library requires React, @pixi/react, and Pixijs installed as Peer Dependencies.

NPM:

```bash
npm install --save pixi-react-parallax react @pixi/react pixi.js
```

Yarn:

```bash
yarn add pixi-react-parallax react @pixi/react pixi.js
```

## Usage

Stack ParallaxLayers in a declarative style. They must fall within the context of a ParallaxCameraProvider. Set the ParallaxLayer's `zIndex` prop to the distance from the camera. Arrange a scene within each ParallaxLayer. Scale the contents if you want.

Pay special attention to the use of `useParallaxCameraRef()`. This hook returns the camera's current target, and a function to set the target. Pass that setter function into the `ref` prop of a DisplayObject to "tag" it. The camera will now follow that target around!

Note that the camera target needs to move around to see the parallax effect.

Basic example with 3 parallax layers:

```ts
import {
  ParallaxCameraProvider,
  ParallaxLayer,
  useParallaxCameraRef,
} from "pixi-react-parallax";

function MyComponent() {
  const [, setCameraTargetRef] = useParallaxCameraRef()
  return (
    <ParallaxCameraProvider>
      <ParallaxLayer zIndex={-400}>
        <Text
          text="-400"
          x={200}
          y={200}
          scale={2}
        />
      </ParallaxLayer>
      <ParallaxLayer zIndex={0}>
        <Text
          text="100"
          x={200}
          y={200}
          scale={2}
          ref={setCameraTargetRef} // Tag the camera target like this.
          // Now when this DisplayObject moves, the camera will track it.
        />
      </ParallaxLayer>
      <ParallaxLayer zIndex={100}>
        <Text
          text="100"
          x={200}
          y={200}
          scale={2}
        />
      </ParallaxLayer>
    </ParallaxCameraProvider>
  );
}
```

The camera currently only supports tracking one target. The target must be a child of a ParallaxLayer, but that layer doesn't need to have a `zIndex` of 0.

Working example: [Here's the source for the Parallax Demo](https://github.com/Azaeres/etherion-lab/blob/main/src/components/scenes/Experiment1/index.tsx)

## API

### `<ParallaxCameraProvider>`

All ParallaxLayers must be children of a ParallaxCameraProvider.

#### Props:
- `movementDamping: number`: Greater values result in a camera that tracks more sluggishly. A value of 0 means tracking is instantaneous. Default: 10. 

- `focalLength: number`: The `zIndex` of the camera itself. All ParallaxLayers must be positioned in front of the camera, having 'zIndex' values less than the `focalLength`. Default: 300.

### `<ParallaxLayer>`

A container for the DisplayObjects that are positioned a given distance from the camera.

#### Props:

- `zIndex: number`: How far away the layer is. Lower values result in a layer that is farther away. Values must be less than the camera's `focalLength`. The contents of a ParallaxLayer are automatically scaled to give the illusion of distance. ParallaxLayers with a `zIndex` of 0 aren't scaled; negative `zIndex` is scaled down; positive scaled up. Objects very far away might be scaled to microscopic sizes, relatively speaking, so you might consider scaling up the contents to counter the scaling effect. The side-to-side parallax motion is unaffected by the scaling factor.

### `useParallaxCameraRef`

Hook that returns the camera target, and a setter that can be passed into a DisplayObject's `ref` prop to "tag" it to be tracked by the camera.

```ts
import { useParallaxCameraRef } from 'pixi-react-parallax'

const [cameraTargetRef, setCameraTargetRef] = useParallaxCameraRef()
```

### `ParallaxCameraContext`

The React context that contains the camera.

The camera currently supports a shaking effect with `camera.shake(strength: number, duration?: number)`.

```
  import { useContext } from 'react'
  import { ParallaxCameraContext } from 'pixi-react-parallax'

  const camera = useContext(ParallaxCameraContext);
  camera.shake(15, 0.2)

```

## Building

Install dependencies.

```
yarn install
```

Compile.

```
yarn build
```

Build the package locally (optional).

```
yarn pack
```

Then add the local dependency to your `package.json`.

```json
// package.json
{
  ...
  "dependencies": {
    "pixi-react-parallax": "file:/path/to/your/pixi-react-parallax/pixi-react-parallax-v1.0.10.tgz"
  }
}
```
