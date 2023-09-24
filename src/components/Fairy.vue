<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTresContext, useRaycaster } from '@tresjs/core'
import {
  Sphere,
  Box,
  OrbitControls,
  MouseParallax,
  Backdrop,
  useGLTF,
  useAnimations,
} from '@tresjs/cientos';
import { Object3D, Vector2, Vector3 } from 'node_modules/@types/three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Ref } from 'vue';

const {
  nodes,
  scene: knight,
  animations,
} = await useGLTF('src/assets/fairy__the_legend_of_zelda_botw/scene.gltf', {
  draco: true,
});
const context = useTresContext()

const fairy = nodes['RootNode'];

const fairy1 = clone(fairy);
const fairyRef = ref(null)
const fairyRef1 = ref(null)
const sphereRef = ref(null)
onMounted(() => {
  
  if (fairyRef.value && fairyRef1.value) {
    const boundingContainer= sphereRef.value
  console.log('fairyObject', boundingContainer);
    //const fairyObjects = ref<Object3D<Event>[]>([fairyRef.value.object, fairyRef1.value.object]);

    //const raycaster = useRaycaster(fairyObjects, context);


   
  }
});
const fairyAnim = animations[0]
const fairyAnim1 = animations[0]



const { actions: action1, mixer: mixer1 } = useAnimations([fairyAnim], fairy)
const { actions: action2, mixer: mixer2 } = useAnimations([fairyAnim1], fairy1)


let currentAction1 = action1.idle
let currentAction2 = action2.idle

currentAction1.play()
mixer1.timeScale = .5
currentAction2.play()

let currentColor = '#008080'



const onClick = (intersection, pointerEvent) => {
  let newColor = currentColor == '#FFFFFF' ? '#008080' : '#FFFFFF'
  

  intersection.object.material.color.set(newColor)

  currentColor = newColor

  const fairyInter = intersection.object.animations
  console.log('click', intersection.object, fairyInter);

      if (fairyInter) {
        // Perform the animation on the fairy
        // Note: replace this with your actual animation logic
        currentAction2.stop();
      }


}


</script>

<template>
  <primitive  ref="fairyRef" :cast-shadow="true" :object="fairy" :position="[-2, 2, 0]" :scale="[0.2, 0.2, 0.2]" />
 
  <!-- <TresMesh :position="[2, 3, -1]">
    <TresSphereGeometry :args="[1, 10, 10]" />
 
  </TresMesh> -->
  <Sphere @click="onClick" ref="sphereRef" :position="[2, 3, -1]" :args="[1, 10, 10]">
  <primitive   ref="fairyRef1" :object="fairy1"  :scale="[0.2, 0.2, 0.2]" />
</Sphere>
  <Box :args="[1, 1, 1]" position="[-2, 2, 0]" color="orange" />
  <TresMesh @click="onClick">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshToonMaterial color="#008080" />
  </TresMesh>
</template>
