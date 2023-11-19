<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTresContext, useRaycaster,useTexture } from '@tresjs/core';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useAnimations, Sphere } from '@tresjs/cientos';
import { PointsMaterial, PointsMaterialParameters } from 'three/src/materials/PointsMaterial.js';
import { Points } from 'three/src/objects/Points.js';

const context = useTresContext();
const { fairyNodes, fairyScene, fairyAnimations, fairyMaterials, fairyPosition } = defineProps([
  'fairyNodes',
  'fairyScene',
  'fairyAnimations',
  'fairyMaterials',
  'fairyPosition',
]);

const fairy = clone(fairyNodes['RootNode']);
const fairyRef = ref(null);
const pointsRef = ref(null);

const sphereRef = ref(null);
const emit = defineEmits(['fairyClicked']);
const pMaterial = new PointsMaterial( { color: "#ff0000", opacity:0.5, transparent:true, size:0.5, sizeAttenuation:false, vertexColors:true })

const points = new Points();
onMounted(() => {
  if (sphereRef.value) {
  sphereRef.value.value.material.visible = true;
}

points.material = pMaterial;

if (fairy.geometry) {
  points.geometry = fairy.geometry;
}

pointsRef.value = points;


});

const fairyAnim = fairyAnimations[0];
const { actions, mixer } = useAnimations([fairyAnim], fairy);
let currentAction = actions.idle;
currentAction.play();
mixer.timeScale = Math.random();
const onClick = (intersection, pointerEvent) => {
  const fairyInter = intersection.object;

  emit('fairyClicked', fairyPosition);
};



</script>

<template>
  <Sphere
    @click="onClick"
    ref="sphereRef"
    :position="fairyPosition"
   
    :args="[1, 10, 10]"
  >
  
  </Sphere>
  <primitive ref="pointsRef" :object="points"></primitive>

</template>