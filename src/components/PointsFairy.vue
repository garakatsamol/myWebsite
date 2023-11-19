<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTresContext, useRaycaster, useTexture, useSeek, trasverseObjects } from '@tresjs/core';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useAnimations, Sphere } from '@tresjs/cientos';
import { PointsMaterial, PointsMaterialParameters } from 'three/src/materials/PointsMaterial.js';
import { Points } from 'three/src/objects/Points.js';
import { MeshBasicMaterial } from 'three';

const context = useTresContext();
const { seek, seekByName } = useSeek()
const { fairyNodes, fairyScene, fairyAnimations, fairyMaterials, fairyPosition } = defineProps([
    'fairyNodes',
    'fairyScene',
    'fairyAnimations',
    'fairyMaterials',
    'fairyPosition',
]);
////console.log(fairyScene);
//const fairy = clone(fairyNodes['RootNode']);
console.log(fairyNodes.RootNode)
const fairy = seekByName(fairyScene, "Object_4")

fairy.scale.set([.5,.5,.5])

const fairyRef = ref(null);


const sphereRef = ref(null);
const emit = defineEmits(['fairyClicked']);
const pMaterial = new PointsMaterial({ color: "#ff0000", opacity: 1, transparent: false, size: 1, sizeAttenuation: false })
fairy.traverse(function (child) {
    if (child.geometry?.type === "BufferGeometry") {
        let pGeometry = child.geometry?.clone()
        const points = new Points(pGeometry, pMaterial);
        context.scene.value.add(points);
       
    }
}
)


onMounted(() => {




});
context.scene.value.animations = fairyAnimations;
const fairyAnim = context.scene.value.animations [0];
console.log(context.scene.value)  
 const { actions, mixer } = useAnimations([fairyAnim], context.scene.value);
let currentAction = actions.idle;
currentAction.play();
mixer.timeScale = Math.random();
const onClick = (intersection, pointerEvent) => {
    const fairyInter = intersection.object;

    emit('fairyClicked', fairyPosition);
};



</script>

<template>
    <!-- <Sphere
        @click="onClick"
        ref="sphereRef"
        :position="fairyPosition"
     
        :args="[1, 10, 10]"
    >
    
    </Sphere> -->
    <!-- <primitive ref="fairyRef" :object="fairy"></primitive> -->
</template>