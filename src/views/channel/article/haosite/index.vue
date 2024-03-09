<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-content p15">
    <div class="mb15 font18 bold">网站管理</div>
    <ul class="tech-lists">
        <li class="relative" style="border-bottom: 1px dotted #ddd; padding:15px 0;" v-for="(item, index) in dataList" :key="index" >
          <p class="mb10 relative">
            <span v-if="item.management_checked === '0'"><i class="iconfont icon-shenhe font18 ml0" style="color: #5bc0de"></i></span>
            <span class="art-title font16 mr5 pointer" @click="handleclick(item)">
              {{item.title}}
            </span>
            <span v-if="item.visible === 'fans'">
              <i class="iconfont icon-fans" style="color: #de6c92"></i>
            </span>
            <span v-if="item.visible === 'privacy'">
              <i class="iconfont icon-permissions" style="color: #1976d2"></i>
            </span>
            <span v-if="item.image.length">
              <v-popover content="<i class='iconfont icon-img'></i>" arrow="lr" offset="right" :move="-70" :keys="`popover-img$-${index}`" type="hover">

                <div class="p10 w250">
                  <img :src="item.image[0]" style="width: 100%" />
                </div>
              </v-popover>
            </span>
            <span class="font18 cl-ccc">({{item.times}})</span>
            <span class="ml10" @click="visit(item)">查看</span>
            <span class="ml10">
              <Detail action="edit" :data="{id: item.id, coding: coding.art }" :render="init" />
              
            </span>
          </p>
          <p>
            <span class="operating f-fr font12 cl-ccc">
              <a class="cl-ccc">分类：{{item.parent || '未分类'}}</a> |
              <a title="访问" data-model="partner" data-action="remove" data-id="22" class="remove cl-ccc">访问({{item.visit}})</a>
            </span>
          </p>
          <div v-if="isShowBatch" style=" position: absolute; left: 0; top: 0; right: 0; bottom: 0"></div>
        </li>
      </ul>
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
  durationTrans,
  getUid
} from '@/utils'

import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Detail
  },
  props: {
    channel: {
      type: String,
      default: ""
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
    const coding: any = codings[props.channel]
    const dataList: any = ref({})

    function init() {
      store.dispatch('common/Fetch', {
        api: 'ArticleList',
        data: {
          coding: coding.art,
          uid: getUid(),
          page: 1,
          pagesize: 20
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    function visit(param: any) {
      const {
        id
      } = param

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          coding: coding.info,
          id
        }
      }).then(res => {
        debugger
        window.open(param.url)

      })
    }

    onMounted(init)

    return {
      coding,
      init,
      dataList,
      visit
    }
  }
})
</script>

<style scoped>
.active {
  background: rgba(0, 0, 0, 0.5);
}
</style>
