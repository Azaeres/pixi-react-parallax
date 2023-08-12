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

Example: [Here's the source for the Parallax Demo](https://github.com/Azaeres/etherion-lab/blob/main/src/components/scenes/Experiment1/index.tsx)


## API

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
