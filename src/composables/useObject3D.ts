import * as THREE from 'three';

export default function useObject3D() {

  function deepCloneObject3D(source: THREE.Object3D | null, recursive: boolean = true): THREE.Object3D | null {
    if (!source) {
      return null;
    }

    const cloned =  source;


    cloned.name = source.name || '';
    cloned.up.copy(source.up);
    cloned.position.copy(source.position);
    cloned.quaternion.copy(source.quaternion);
    cloned.scale.copy(source.scale);

    // Check if source has material and geometry properties before cloning
    if (source.material) {
      cloned.material = source.material.clone();
    }

    if (source.geometry) {
      cloned.geometry = source.geometry.clone();
    }

    // Clone other properties...
    cloned.matrix.copy(source.matrix);
    cloned.matrixWorld.copy(source.matrixWorld);
    cloned.matrixAutoUpdate = source.matrixAutoUpdate;
    cloned.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
    cloned.layers.mask = source.layers.mask;
    cloned.visible = source.visible;
    cloned.castShadow = source.castShadow;
    cloned.receiveShadow = source.receiveShadow;
    cloned.frustumCulled = source.frustumCulled;
    cloned.renderOrder = source.renderOrder;
    cloned.userData = JSON.parse(JSON.stringify(source.userData));

    if (recursive === true) {
      for (let i = 0; i < source.children.length; i++) {
        const child = source.children[i];
        const childClone = deepCloneObject3D(child);
        if (childClone) {
          cloned.add(childClone);
        }
      }
    }

    return cloned;
  }

  return {
    deepCloneObject3D,
  };
}
