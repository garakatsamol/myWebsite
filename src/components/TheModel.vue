<script setup lang="ts">

import { Ref, onMounted, ref, watch, watchEffect } from 'vue'
import { TresCanvas, useRenderLoop, useTexture } from '@tresjs/core'
import { reactive, shallowRef } from 'vue'
import {ReinhardToneMapping, PCFSoftShadowMap, PCFShadowMap, BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import { OrbitControls, MouseParallax, Backdrop, Smoke, Stars,useTweakPane, useGLTF, useAnimations } from '@tresjs/cientos'
import { Scene } from 'three/src/Three.js'
import useObject3D from '/src/composables/useObject3D'
const { pane } = useTweakPane();
const cameraRef: Ref = ref(null);

// Create a plain JavaScript object to hold the camera position
const cameraPosition = { x: 0, y: 0, z: -0 };

watchEffect(() => {
  if (cameraRef.value) {
    const position = cameraRef.value.position;
    cameraPosition.x = position.x;
    cameraPosition.y = position.y;
    cameraPosition.z = position.z;
    pane.refresh()
  }
});

// Add the individual properties to Tweakpane
pane.addInput(cameraPosition, 'x', { label: 'Camera Position X' });
pane.addInput(cameraPosition, 'y', { label: 'Camera Position Y' });
pane.addInput(cameraPosition, 'z', { label: 'Camera Position Z' });

const { scene: knight, animations } = await useGLTF(
  'src/assets/fairy__the_legend_of_zelda_botw/scene.gltf',
  {
    draco: true,
  },
)

/* const { actions, mixer } = useAnimations(animations, knight)

let currentAction = actions.idle

currentAction.play() */



const akuAkuRef = ref(null);
const knightRef = ref(null);
const knightRef1 = ref(null);


const knight1 = knight.clone();

</script>

<template>

  <TresCanvas  ref="canvasRef" preset="realistic">
    
   <!--  <MouseParallax :ease="1" :factor="1" /> -->

    <TresPerspectiveCamera ref="cameraRef" :position="[0, 2, 10]" />
    <OrbitControls/>
 
  <TresGroup :position="0">
   
<!--     <primitive ref="akuAkuRef" :object="model" :scale="1"> </primitive> -->

<primitive  ref="knightRef" :object="knight" :key="'instance1'" :scale="1" :position="[0, 5, -2]"></primitive>
<primitive ref="knightRef1" :object="knight1" :key="'instance2'" :scale="2" :position="[1, 2, -2]"></primitive>

        
       
  
     
  </TresGroup>
  <TresAmbientLight  :intensity="1" :color="0xffffff"  />
   
  <TresDirectionalLight :position="[0, 1, 10]" :intensity=".1" :color="0xffffff" cast-shadow />
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>
