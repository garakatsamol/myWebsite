<script setup lang="ts">
import { Ref, onMounted, ref, watch, watchEffect } from 'vue';
import { TresCanvas, useRenderLoop, useTexture } from '@tresjs/core';
import { reactive, shallowRef } from 'vue';
//import Fairy from './Fairy.vue';
import SingleFairy from './SingleFairy.vue';
import {
  OrbitControls,
  MouseParallax,
  useTweakPane,
  useGLTF,
  useAnimations,
  Stars,
  Smoke,
} from '@tresjs/cientos';
import gsap from 'gsap';
import PointsFairy from './PointsFairy.vue';
const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
});
const cameraRef = shallowRef<PerspectiveCamera>();
const orbitRef = ref(null);
let menuClicked = false;
const cameraPosition = { x: 0, y: 0, z: -0 };
const cameraIdlePosition = [0, 0, 10];
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
  materials,
  scene: knight,
  animations,
} = await useGLTF('src/assets/fairy__the_legend_of_zelda_botw/scene.gltf', { //src/assets/fairyNoMaterial/fairyNoMaterial
  draco: true,

});
/* materials.fairy_navi.wireframe=true
materials.fairy_wings.wireframe=true */
//const pMaterial=new PointsMaterial( { color: "#ff0000", opacity:0.5, transparent:true, size:0.5, sizeAttenuation:false, vertexColors:true })
//delete materials[""]
//console.log(materials)
//materials.fairy_wings=pMaterial
//materials.fairy_navi=pMaterial


const moveCamera = (fairyPosition: Vector3) => {
  let newCameraPosition = menuClicked ? cameraIdlePosition : fairyPosition;
  let cameraOffset = menuClicked ? 0 : 4;

  gsap.to(cameraRef.value.position, {
    x: newCameraPosition[0],
    y: newCameraPosition[1],
    z: newCameraPosition[2] + cameraOffset,
  });
  menuClicked = !menuClicked;
};
</script>

<template>
  <TresCanvas ref="canvasRef" preset="realistic" v-bind="state">
    <!-- <MouseParallax :ease="1" :factor="1" /> -->

    <TresPerspectiveCamera ref="cameraRef" :position="cameraIdlePosition" />
       <OrbitControls ref="orbitRef" />

    <TresGroup :position="[0, 0, 0]">
      <!-- <Stars /> -->
      <Suspense>
        <PointsFairy
          :fairyNodes="nodes"
          :fairyScene="knight"
          :fairyAnimations="animations"
          :fairyPosition="[0, 3, 1]"
          :fairyMaterials="materials"
          @fairyClicked="moveCamera"
        />
      </Suspense>
      
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
