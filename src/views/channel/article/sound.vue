<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-content" v-if="dataList.list">
    <div class="row clearfix">

       <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-6">名称</td>
        <td class="col-md-2">分类</td>
        <td class="col-md-1">试听</td>
        <td class="col-md-1">时长</td>
        <td class="col-md-1">大小</td>
        <td class="col-md-1">格式</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.title}}
        </td>
        <td>
          <!-- <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding}" :isUpdate="true" type="text"></v-category> -->
        </td>
        <td><v-audio :data="{...item, index, number: dataList.list.length}" /></td>
        <td> {{durationTrans(item.duration)}}</td>
        <td> {{`${(item.size / 1024 / 1024).toFixed(3)}MB`}}</td>
        <td> {{item.format}}</td>
      </tr>
    </table>
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
  codings,
  durationTrans
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  components: {},
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
      configData,
      durationTrans
    }
  }
})
</script>

<style scoped>
.active {
  background: rgba(0, 0, 0, 0.5);
}
</style>
