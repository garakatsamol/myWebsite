<script setup lang="ts">
import { Ref, nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import { TresCanvas, useRenderLoop, useTexture, useTresContext, useTresContextProvider    } from '@tresjs/core';
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
import { DynamicDrawUsage, RepeatWrapping, SRGBColorSpace, AdditiveBlending, Vector3,Plane} from 'three';


const worldWidth = 32, worldDepth = 32;
const planeRef = ref<THREE.BufferGeometry | null>(null);
const planePointsRef = ref<THREE.BufferGeometry | null>(null);

const materialRef = ref(null);
const materialPointsRef = ref(null);
const clippingPlane = ref(null);    
const texture = await useTexture(["./src/assets/water/water.jpg"])
const dotTexture = await useTexture(["./src/assets/water/blueDot.png"])

//renderer.localClippingEnabled = true;
const clipPlanes = [
new Plane( new Vector3( 1 ,0,0 ), 0 ),
 
   
];




watchEffect(() => {
    if (planeRef.value ) {
        
        const position = planeRef.value.attributes.position;        
        const positionPoints = planePointsRef.value.attributes.position;
       position.usage = DynamicDrawUsage;
       positionPoints.usage = DynamicDrawUsage;
        for (let i = 0; i < position.count; i++) {

            const y = 0//35 * Math.sin(i / 2);
            position.setY(i, y);
            positionPoints.setY(i, y);
        }


        if (texture && materialRef.value && dotTexture && materialPointsRef.value) {


            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            texture.repeat.set(15, 15);
            texture.colorSpace = SRGBColorSpace;
      
            materialRef.value.map = texture
           
           

           
           
            dotTexture.colorSpace = SRGBColorSpace;
            materialPointsRef.value.map=dotTexture
            console.log( materialRef.value)
            
        

         
        }
    }

})


//animation is disabled for now

const { onLoop } = useRenderLoop()

// onLoop(({ delta, elapsed }) => {
//     // I will run at every frame ~ 60FPS (depending of your monitor)

//     if (planeRef.value && materialRef.value && planePointsRef.value && materialPointsRef.value)  {
//         const planeNodes = planeRef.value.attributes.position;
//         const planePointsNodes = planePointsRef.value.attributes.position;


//         for (let i = 0; i < planeNodes.count; i++) {

//             const y = 10 * Math.sin(i / 5 + (elapsed * 10 + i) / 7);
//             planeNodes.setY(i, y);
//             planePointsNodes.setY(i, y);

//         }
//         planeRef.value.attributes.position.needsUpdate = true;
       
//         planePointsRef.value.attributes.position.needsUpdate = true;


//     }


// })
</script>

<template>
    <TresCanvas  :localClippingEnabled="true" >
        <!-- <MouseParallax :ease="1" :factor="1" /> -->

        <TresPerspectiveCamera :position="[100, 380, 250]" :look-at="[0,0, 0]" />
        <!-- <TresFog :args="['#aaccff', 0.0007]" /> -->
        <OrbitControls />
        <!-- <Sky/> -->
        <Sphere :position="[0, 100, 0]" :args="[100, 100, 100]" >
            <TresMeshBasicMaterial :color="0x00ff00"  :clippingPlanes="clipPlanes"/>
            </Sphere>
      
        <TresMesh :visible="false">
            <TresPlaneGeometry    ref="planeRef" :args="[20000, 20000, worldWidth - 1, worldDepth - 1]" :rotateX="(- Math.PI / 2)"/>
            <TresMeshBasicMaterial  ref="materialRef" :color="0x0044ff" :clippingPlanes = "clipPlanes" :clipIntersection="false" :clipShadows="true"> //// Here i also tried with :clippingPlanes = "clipPlanes" :clipIntersection="false"
        
            </TresMeshBasicMaterial>
        </TresMesh>
       
         <TresPoints :visible="false" >
            <TresPlaneGeometry ref="planePointsRef" :args="[20000, 20000, worldWidth - 1, worldDepth - 1]"
            :rotateX="(- Math.PI / 2)" />
            <TresPointsMaterial ref="materialPointsRef" 
                :opacity=1
                :transparent=true
                :alphaTest= 0.5
                :size=10
                :sizeAttenuation="true"
                :map="dotTexture"
                :wireframe="true"
                       />
            </TresPoints>

        
        <TresAxesHelper />
        <TresPlaneHelper :args="[clipPlanes[0], 10000, 0xff0000]" /> 
        <TresGridHelper :args="[100, 100, 0x444444, 'teal']" />
    </TresCanvas>
</template>
