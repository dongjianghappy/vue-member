<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-content" v-if="dataList.list">
    <div class="row clearfix">

      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList.list" :key="index" @click="handleclick(item)">
        <div class="thumbnail p10 relative" style="background: #fff;; overflow: hidden;">
          <div class="cover" :class="{active: selectList.indexOf(item.id) !== -1}" @click.stop="select(item.id)" style="position: absolute; top: 0; left: 0; bottom:0; width: 100%;z-index: 10;" v-show="isShowBatch">
            <i class="iconfont icon-checkbox">
              <input name="checkbox" type="checkbox" value="6" style="display: none;">
            </i>
          </div>
          <a data-artcoding="C0000" data-catcoding="C0002" data-albumcoding="U40001" data-uid="110506372" data-id="6" data-pid="0" data-checked="0" data-placement="top" data-toggle="tooltip9" style="position:absolute; top:15px; right:15px;" data-left="0" class="infos trip_arrow content_trip bg-white hide">
            <i class="iconfont icon-down"></i>
          </a>
          <img :src="item.image[0]" style="width:  100%;
                 height:180px">
          <div class="
                 caption
                 relative" style="padding:10px 0; height:40px;">
            <span class="inputline updata nowrap" data-coding="C0000" data-field="title" data-id="6" contenteditable="true" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.title}}</span>

            <!--<span style=" color:#5bc0de; float:right;">1张</span>-->
          </div>
          <!-- <div class="relative" style="border-top: 1px dotted #eaeaea; padding:10px 0; height:40px;">
            分类：{{item.parent}}
            <i class="iconfont icon-shenhe font18 absolute" style="top: 5px; right: 0; color: #5bc0de;"></i>

          </div> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
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
  components: {},
  props: {
       channel: {
      type: String,
      default: ""
    },
    isShowBatch: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    }
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
      configData
    }
  }
})
</script>

<style scoped>
.active {
  background: rgba(0, 0, 0, 0.5);
}
</style>
