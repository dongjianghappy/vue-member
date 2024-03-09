<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-content" v-if="dataList">
    <div class="row clearfix">

      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList" :key="index">
        <div class="thumbnail p10 relative" style="background: var(--card-background); overflow: hidden;">
          <Three :data="item" style="background: white; width: 100%; height: 250px;box-shadow: rgb(32 33 36 / 28%) 0px 0px 1px 0px;"></Three>
          <!-- <div class="
                 caption
                 relative" style="padding:10px 0; height:40px;">
            <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.title}}【{{item.image.length}}张】</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Three from './three.vue'
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  useRoute,
  watch,
  onMounted,
  ref,
  codings
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  components: {
    Three
  },
  props: {
    channel: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "image"
    },
    isShowBatch: {
      type: Boolean,
      default: false
    },
    // dataList: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // }
  },
  data() {
    return {
      menu: [{
          name: "全部",
          path: ""
        },
        {
          name: "已审核",
          path: "audited"
        },
        {
          name: "未审核",
          path: "unAudited"
        },
        {
          name: "被退回",
          path: "returned"
        }
      ]
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

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

    let m: any = route.query.mod;
    const coding: any = codings[m]
    const isShowBatch = ref(false)
    const selectList: any = ref([])
    const checkAll = ref(false)
    const configData: any = ref({})
    const loginuser = computed(() => store.getters['user/loginuser']);

    function handleclick(param: any) {
      isShowBatch.value = false
      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: `/${props.channel}?item=view&id=${param.id}`
      }))
    }

    function handleclicks(param: any) {
      let query = ""
      if (param) {
        query = param === 'details' ? `&item=${param}&action=add` : `&item=${param}`
      }

      router.push(`/${props.channel}?${query}`)
    }

    function onBatch() {
      isShowBatch.value = !isShowBatch.value
      selectList.value = []
    }

    // function operation(param: any) {
    //   if (param === 'all') {
    //     debugger
    //     if (selectList.value.length < dataList.value.length) {
    //       dataList.value.map((item: any) => {
    //         selectList.value.push(item.id)
    //       })

    //     } else {
    //       selectList.value = []
    //     }

    //   } else if (param === 'moveAlbum' || param === 'moveCate') {
    //     if (param === 'moveAlbum') {
    //       configData.value = {
    //         coding: 'U40001',
    //         api: 'userCategory',
    //         type: "album",
    //         name: "",
    //         value: "",
    //         title: "移动专辑"
    //       }
    //     } else if (param === 'moveCate') {
    //       configData.value = {
    //         coding: coding.cate,
    //         api: 'systemCate',
    //         type: "cate",
    //         name: "",
    //         value: "",
    //         title: "移动分类"
    //       }
    //     }
    //   } else if (param === 'delete') {
    //     store.dispatch('common/Fetch', {
    //       api: 'Delete',
    //       data: {
    //         coding: coding['art'],
    //         list: JSON.stringify({
    //           id: selectList.value
    //         })
    //       }
    //     }).then(res => {
    //       proxy.$hlj.message("删除成功")

    //     })

    //   }

    // }

    function select(id: any) {

      if (selectList.value.indexOf(id) === -1) {

        selectList.value.push(id)
      } else {
        let index = selectList.value.findIndex((item: any) => item == id);
        selectList.value.splice(index, 1)
      }
    }

    return {
      handleclick,
      handleclicks,
      onBatch,
      isShowBatch,
      // operation,
      select,
      selectList,
      configData,
      dataList
    }
  }
})
</script>

<style scoped>
.active {
  background: rgba(0, 0, 0, 0.5);
}
</style>
