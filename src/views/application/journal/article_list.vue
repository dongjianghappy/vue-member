<template>
<div class="module-wrap mb15">
  <div class="module-head bd-0 p20 font16">
    日志({{dataList.total || 0}})
    <span class="pointer right">设置</span>
  </div>
  <div class="module-content plr20 flex" style="min-height: 590px">
    <div class="mr25" style="flex: 1">
      <div class="relative">
        <!-- {{sidebar}} -->
        <span class="absolute" style="left: 0;" @click="handleWrite">写日志</span>
        <v-screen v-model:name="typeName" field="type" :render="init" />
      </div>

      <ul class="tech-lists">
        <li class="relative" style="border-bottom: 1px dashed #eee; padding:10px 0;" v-for="(item, index) in dataList.list" :key="index">
          <p class="mb10 relative">
            <span v-if="item.management_checked === '0'"><i class="iconfont icon-shenhe font18 ml0" style="color: #5bc0de"></i></span>
            <span class="art-title font16 mr5 pointer" @click="handleclick(item)">
              <i class="iconfont icon-dot"></i> {{item.title}}
            </span>
            <span v-if="item.summary !== ''">
              <i class="infos demoimg iconfont icon-article"></i>
            </span>
            <span v-if="item.image.length">
              <i class='iconfont icon-img'></i>
            </span>
            <span class="font14 cl-ccc">{{item.times}}</span>
            <span class="right pt15">
              <!-- <v-popover content="操作" arrow="tb" offset="right" :move="-30" :keys="`static_${index}`">
                <ul class="font14 align_center" style="display: block">
                  <li>
                    <v-button @onClick="handleedit(item)" :disabled="true">
                      编辑
                    </v-button>
                  </li>
                  <li>
                    <v-confirm name="删除" :data="{id: item.id, coding: data.coding.art, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="true"></v-confirm>
                  </li>
                  <li>
                    <v-confirm name="置顶" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: data.coding.art }" type="text" api="changeData" :render="render" operating="setTop" :auth="true"></v-confirm>
                  </li>
                </ul>
              </v-popover> -->
              <span @click="handleedit(item)"><i class="iconfont icon-edit"></i></span>
              <span>
                <v-confirm name="" icon="recycle" :data="{id: item.id, coding: 'U20000' }" type="text" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
              </span>
              <span>
                <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: 'U20000' }" type="text" api="changeData" :render="init" operating="setTop" :auth="true"></v-confirm>
              </span>
            </span>

          </p>
          <p class="pl25">
            <span class="operating f-fr font12 cl-ccc">
              <a class="cl-ccc">分类：{{item.parent || '未分类'}}</a> |
              <a title="阅读" data-model="partner" data-action="remove" data-id="22" class="remove cl-ccc">阅读({{item.visit}})</a>
            </span>
          </p>
          <div v-if="isShowBatch" style=" position: absolute; left: 0; top: 0; right: 0; bottom: 0"></div>
        </li>
      </ul>
      <!-- <v-loding v-if="!loading" /> -->
      <div class="pt25 align_right" v-if="dataList.total > 25">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
      </div>
    </div>
    <div class="w200">
      <CateList :group="group" :data="data" :render="render" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  useRoute,
  watch,
  onMounted,
  ref,
  getUid,
  useRouter,
  computed
} from '@/utils'

import CateList from "./cate.vue"

export default defineComponent({
  name: 'HomeView',
  components: {
    CateList
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    query: {
      type: String,
      default: 'all'
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const dataList = ref({})
    let m: any = route.query.mod;
    const loading: any = ref(false)
    const cateName: any = ref("所有的")
    const typeName: any = ref("")
    const sidebar = computed(() => {
      const sidebar = store.getters['user/config'].journal || []
      sidebar.groups && sidebar.groups.map((item: any) => {
        item.path = `/journal?item=${item.value}`
      })
      return sidebar
    });

    watch(() => route.query.item, () => {
      init()
    })

    function handleWrite(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/journal?item=details`
      }))
    }

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/journal?item=view&id=${param.id}`
      }))
    }

    function handleedit(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/journal?item=details&action=edit&id=${param.id}`
      }))
    }

    function init(param: any = {}) {

      if (route.query.item == 'all') {
        cateName.value = typeName.value || "所有的"

      } else if (route.query.item == 'list') {
        if (route.query.id == '0') {
          cateName.value = "未分类"
        } else {
          let arr = props.group.filter((item: any) => item.id === route.query.id)
          cateName.value = arr[0].name
        }
      }

      typeName.value = ""

      const params: any = {
        uid: getUid(),
        id: route.query.id,
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)

      loading.value = false
      dataList.value = []
      store.dispatch('common/Fetch', {
        api: 'Journal',
        data: {
          ...params
        }
      }).then(res => {
        debugger
        loading.value = true
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      dataList,
      loading,
      init,
      cateName,
      typeName,
      handleWrite,
      handleclick,
      handleedit,
      sidebar
    }
  }
})
</script>
