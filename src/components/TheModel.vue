<script setup lang="ts">
import { Ref, onMounted, ref, watch, watchEffect } from 'vue';
import { TresCanvas, useRenderLoop, useTexture } from '@tresjs/core';
import { reactive, shallowRef } from 'vue';
import Fairy from './Fairy.vue';
import {
  OrbitControls,
  MouseParallax,
  Backdrop,
  useTweakPane,
  useGLTF,
  useAnimations,
  Stars
} from '@tresjs/cientos';
const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,

});
const cameraRef: Ref = ref(null);

// Create a plain JavaScript object to hold the camera position
const cameraPosition = { x: 0, y: 0, z: -0 };

watchEffect(() => {
  if (cameraRef.value) {
    const position = cameraRef.value.position;
    cameraPosition.x = position.x;
    cameraPosition.y = position.y;
    cameraPosition.z = position.z;
  }
});

const {
  nodes,
  scene: knight,
  animations,
} = await useGLTF('src/assets/fairy__the_legend_of_zelda_botw/scene.gltf', {
  draco: true,
});



const knightRef = ref(null);
const knightRef1 = ref(null);

const knight1 = knight.clone();

watchEffect(() => {
  console.log({
    fairy1: knightRef.value,
    fairy2: knightRef1.value,
  });
});
</script>

<template>
  <TresCanvas ref="canvasRef" preset="realistic" v-bind="state">
     <MouseParallax :ease="1" :factor="1" />

    <TresPerspectiveCamera ref="cameraRef" :position="[0, 3, 10]" />
    <!-- <OrbitControls /> -->

    <TresGroup :position="0">
      <primitive
        ref="knightRef"
        :object="knight"
        :key="'instance1'"
        :scale="1"
        :position="[0, 5, -2]"
      ></primitive>
      <primitive
        ref="knightRef1"
        :object="knight1"
        :key="'instance2'"
        :scale="2"
        :position="[1, 2, -2]"
      ></primitive>
    </TresGroup>
    <TresAmbientLight :intensity="1" :color="0xffffff" />

    <TresDirectionalLight
      :position="[0, 1, 10]"
      :intensity="0.1"
      :color="0xffffff"
      cast-shadow
    />
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>
