<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-content" v-if="dataList">
    <div class="row clearfix">
      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList" :key="index">
        <div class="thumbnail p10 relative" style="background: var(--card-background); overflow: hidden;">
          <Three :data="item" style="background: white; width: 100%; height: 250px;box-shadow: rgb(32 33 36 / 28%) 0px 0px 1px 0px;"></Three>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import Three from './three.vue'
const dataList: any = [{
    "id": 0,
    "cameraNear": 0.25,
    "cameraFar": 20,
    "cameraPosition": [2.5, 1.5, 3.0],
    "cameraLookAt": [0, 0, 0],
    "gltfSceneScaleSet": [10.0, 10.0, 10.0],
    "controlsMinDistance": 2,
    "controlsMaxDistance": 10,
    "loaderSetPath": "/three/models/gltf/MaterialsVariantsShoe/glTF/",
    "loaderLoad": "MaterialsVariantsShoe.gltf",
    "controlsTargetSset": [0, 0.5, -0.2],
    "color": '#f6f6f6'
  },
  {
    "id": 1,
    "cameraNear": 2,
    "cameraFar": 10000,
    "cameraPosition": [0, 1.2, 3],
    "cameraLookAt": [10, 10, 10],
    "gltfSceneScaleSet": [0.02, 0.02, 0.02],
    "controlsMinDistance": 3.5,
    "controlsMaxDistance": 15,
    "loaderSetPath": "/three/models/gltf/earth_poster/glTF/",
    "loaderLoad": "scene.gltf",
    "controlsTargetSset": [0, 1.2, 0],
    "color": '#f6f6f6'
  },
  {
    "id": 2,
    "cameraNear": 2,
    "cameraFar": 10000,
    "cameraPosition": [0, 0, 5],
    "cameraLookAt": [10, 10, 10],
    "gltfSceneScaleSet": [0.02, 0.02, 0.02],
    "controlsMinDistance": 3.5,
    "controlsMaxDistance": 15,
    "loaderSetPath": "/three/models/gltf/glb/",
    "loaderLoad": "moon.glb",
    "controlsTargetSset": [0, 1.2, 0],
    "color": '#f6f6f6'
  },
  {
    "cameraNear": 3,
    "cameraFar": 10000,
    "cameraPosition": [0, 2, 8],
    "cameraLookAt": [10, 10, 10],
    "gltfSceneScaleSet": [1, 1, 1],
    "controlsMinDistance": 3.5,
    "controlsMaxDistance": 15,
    "loaderSetPath": "/three/models/gltf/glb_new/",
    "loaderLoad": "panda2.glb",
    "controlsTargetSset": [0, 0, 0]
  },
]
</script>
