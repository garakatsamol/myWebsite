<script setup lang="ts">
import { TresCanvas, useRenderLoop, useTexture } from '@tresjs/core'
import { reactive, shallowRef } from 'vue'
import {ReinhardToneMapping, PCFSoftShadowMap, PCFShadowMap, BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, MouseParallax, Backdrop, Smoke, Stars } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#000000',
  shadows: true,
  alpha: true,
  shadowMap: true,
  shadowMapType: PCFShadowMap ,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

//const { onLoop } = useRenderLoop()

const layer0Ref = shallowRef(null)
const bgRef = shallowRef(null)
const layer1Ref = shallowRef(null)
const layer2Ref = shallowRef(null)
//const texture = await useTexture(['/page4.svg'])

const { map: map0 } = await useTexture({
  map: '/Page3.png',
});

const { map: map1 } = await useTexture({
  map: '/Page4.png',
});

const { map: map2 } = await useTexture({
  map: '/Page2.png',
});


//const { map1 } = await useTexture()
/* onLoop(({ elapsed}) => {
  if(boxRef) {
    boxRef.value.rotation.y = elapsed
    boxRef.value.rotation.z = elapsed
  }
}) */
console.log(map0)
</script>

<template>
  <TresCanvas v-bind="state" preset="realistic">

    <MouseParallax :ease="1" :factor="1" />



    <TresPerspectiveCamera :position="[0, 2, 7]" />
    <OrbitControls />
<!--     <TresAmbientLight :intensity="0.5" :color="'blue'" />
 -->
    <TresMesh ref="bgRef" :position="[0, 0, -4]" shadows receiveShadow>
      <TresPlaneGeometry :args="[15, 15, 5]"  />
      <TresMeshStandardMaterial :color="0x0000ff" transparent shadows receiveShadow castShadow/>
    </TresMesh>

    <TresMesh ref="layer0Ref" :position="[0, 1, -3]"  receiveShadow castShadow>
      <TresPlaneGeometry :args="[15, 5, 5]" />

      <TresMeshStandardMaterial :map="map0" transparent shadows receiveShadow castShadow/>
    </TresMesh>
    <TresMesh ref="layer1Ref" :position="[0, .5, -2.5]" receiveShadow castShadow>
      <TresPlaneGeometry :args="[10, 3, 5]" />

      <TresMeshStandardMaterial :map="map1" transparent shadows receiveShadow castShadow/>
    </TresMesh>

    <TresMesh ref="layer2Ref" :position="[0, 0, -2]" receiveShadow castShadow> 
      <TresPlaneGeometry :args="[10, 3, 5]" />

      <TresMeshStandardMaterial :map="map2" transparent shadows receiveShadow castShadow/>
    </TresMesh>
    <Stars />
    <TresDirectionalLight :position="[0, 1, .2]" :intensity="15" :color="0xffffff" cast-shadow />
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
   
  </TresCanvas>
</template>
