<script setup lang="ts">
import { Ref, onMounted, ref, watch, watchEffect } from 'vue';
import { TresCanvas, useRenderLoop, useTexture,  } from '@tresjs/core';
import { reactive, shallowRef,  } from 'vue';
//import Fairy from './Fairy.vue';
import SingleFairy from './SingleFairy.vue';
import {
  OrbitControls,
  MouseParallax,
  
  useTweakPane,
  useGLTF,
  useAnimations,
  Stars,
  Smoke
} from '@tresjs/cientos';
import gsap from 'gsap'
const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,

});
const cameraRef=shallowRef<PerspectiveCamera>()
const orbitRef = ref(null);

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

const moveCamera=( fairyPosition:Vector3)=>{
console.log(fairyPosition)
gsap.to(cameraRef.value.position,
{x:fairyPosition[0],
  y:fairyPosition[1],
  z:fairyPosition[2]+4,
  
}

)

}

</script>

<template>
  <TresCanvas ref="canvasRef" preset="realistic" v-bind="state">
    <MouseParallax :ease="1" :factor="1" />

    <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, 10]" />
 <!--    <OrbitControls ref="orbitRef" /> -->

    <TresGroup :position="[0, 0, 0]">
      <Stars />
      <Suspense>
        <SingleFairy 
        :fairyNodes="nodes" 
        :fairyScene="knight" 
        :fairyAnimations="animations" 
        :fairyPosition="[0, 3, 1]" 
        @fairyClicked=moveCamera
        
        />


      </Suspense>
      <Suspense>
        <SingleFairy @fairyClicked=moveCamera :fairyNodes="nodes" :fairyScene="knight" :fairyAnimations="animations" :fairyPosition="[-2, -3, -0]" />

      </Suspense>
      <Suspense>
        <SingleFairy @fairyClicked=moveCamera :fairyNodes="nodes" :fairyScene="knight" :fairyAnimations="animations" :fairyPosition="[2, 1, -1]" />
      </Suspense>

    </TresGroup>
    <TresAmbientLight :intensity=".1" :color="0xffffff" />

    <TresDirectionalLight :position="[0, 1, 10]" :intensity="0.1" :color="0xffffff" cast-shadow />
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>
