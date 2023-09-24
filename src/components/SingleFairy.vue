<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { useTresContext, useRaycaster } from '@tresjs/core'
import {
  Sphere,
  useAnimations,
} from '@tresjs/cientos';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';



const context = useTresContext()
const { fairyNodes, fairyScene, fairyAnimations, fairyPosition } = defineProps(['fairyNodes', 'fairyScene', 'fairyAnimations', 'fairyPosition'])

const fairy = clone(fairyNodes['RootNode']);
const fairyRef = ref(null)

const sphereRef = ref(null)
const emit = defineEmits(['fairyClicked'])


onMounted(() => {

 sphereRef.value.value.material.visible=false;

});
const fairyAnim = fairyAnimations[0]
const { actions, mixer } = useAnimations([fairyAnim], fairy)
let currentAction = actions.idle
currentAction.play()
mixer.timeScale = Math.random()
const onClick = (intersection, pointerEvent) => {
const fairyInter = intersection.object
 
  emit('fairyClicked', fairyPosition);

}
</script>

<template>
  <Sphere @click="onClick" ref="sphereRef" :position="fairyPosition" :args="[1, 10, 10]">
    <primitive ref="fairyRef" :object="fairy" :scale="[0.2, 0.2, 0.2]" />
  </Sphere>
</template>
