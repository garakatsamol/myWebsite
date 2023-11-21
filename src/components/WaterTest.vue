<script setup lang="ts">
import { Ref, nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import { TresCanvas, useRenderLoop, useTexture, useTresContext, useTresContextProvider } from '@tresjs/core';
import { PointsMaterial, PointsMaterialParameters } from 'three/src/materials/PointsMaterial.js';
import { Points } from 'three/src/objects/Points.js';

//import Fairy from './Fairy.vue';
import {
    OrbitControls,
    MouseParallax,
    useTweakPane,
    useGLTF,
    useAnimations,
    Stars,
    Smoke,
    Sky,
    Sphere,
} from '@tresjs/cientos';
import { DynamicDrawUsage, RepeatWrapping, SRGBColorSpace, AdditiveBlending, Vector3, Plane } from 'three';
const canvasRef = ref(null);
const sphereMaterialRef = ref(null);
const context = useTresContext();
watchEffect(() => {
    if(canvasRef.value && sphereMaterialRef.value){;
    canvasRef.value.context.renderer.localClippingEnabled = true;
    sphereMaterialRef.value.clippingPlanes = clipPlanes;
    console.log(sphereMaterialRef.value);
    }
})
const clipPlanes = [
    new Plane(new Vector3(1, 0, 0), 0)
];

</script>

<template>
    <TresCanvas ref="canvasRef" :localClippingEnabled="true" >
        <!-- <MouseParallax :ease="1" :factor="1" /> -->

        <TresPerspectiveCamera :position="[100, 380, 250]" :look-at="[0,0, 0]" />
        <!-- <TresFog :args="['#aaccff', 0.0007]" /> -->
        <OrbitControls />
        <!-- <Sky/> -->
        <Sphere :position="[0, 0, 0]" :args="[10, 10, 10]" :clippingPlanes="clipPlanes" :clipIntersection="false">
            <TresMeshBasicMaterial ref="sphereMaterialRef"   />
        </Sphere>
        <TresAxesHelper />
        <TresPlaneHelper :args="[clipPlanes[0], 10000, 0xff0000]" />
        <TresGridHelper :args="[100, 100, 0x444444, 'teal']" />
    </TresCanvas>
</template>
