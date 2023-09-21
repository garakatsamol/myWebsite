<script setup lang="ts">
import {
  OrbitControls,
  MouseParallax,
  Backdrop,
  useGLTF,
  useAnimations,
} from '@tresjs/cientos';
import { Object3D, Vector2, Vector3 } from 'node_modules/@types/three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const {
  nodes,
  scene: knight,
  animations,
} = await useGLTF('src/assets/fairy__the_legend_of_zelda_botw/scene.gltf', {
  draco: true,
});

const fairy = nodes['RootNode'];

const fairy1 = clone(fairy);

console.log("fairy",fairy)
const fairyAnim = animations[0]
const fairyAnim1 = animations[0]



const { actions: action1, mixer: mixer1 } = useAnimations([fairyAnim], fairy)
const { actions: action2, mixer: mixer2 } = useAnimations([fairyAnim1], fairy1)


let currentAction1 = action1.idle
let currentAction2 = action2.idle

console.log(fairyAnim, fairyAnim1);
currentAction1.play()
mixer1.timeScale = .5
currentAction2.play()

const onClick = (intersection, pointerEvent) => console.log('click', intersection, pointerEvent);


</script>

<template>

  :object="fairy" 
  :position="[-2, 2, 0]" 
  :scale="[0.2, 0.2, 0.2]" />

  <primitive :object="fairy1" :position="[2, 3, -1]" :scale="[0.2, 0.2, 0.2]" />
</template>
