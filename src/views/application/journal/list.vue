<template>
  <div class="module-wrap mb15">
    <div class="module-head p20 ">
      <a class="mr10"
         style="display:inline-block">文档</a>
      <a class="inline mr10 batch-button right"
         @click="handleclick('add')">
        <i class="iconfont icon-write"></i>
        写日志</a>
    </div>
    <div class="module-content"
         style="padding: 0 50px !important; min-height: 500px">
      <ul class="tech-lists">
        <li style="border-bottom: 1px dotted #ddd; padding:15px 0;"
            v-for="(item, index) in dataList"
            :key="index">
          <p class="mb10 relative">
            <span class="art-title font16 mr5 pointer"
                  :style="item.style ? JSON.parse(item.style) : ''"
                  @click="handleclick(item)">
              <i class="iconfont icon-img font18"
                 v-if="item.management_checked === '0'"></i>
              {{item.title}}
            </span>
            <span v-if="item.summary !== ''">
              <i class="infos demoimg iconfont icon-article"></i>
            </span>
            <span v-if="item.image && item.image.length">
              <Popover content="<i class='iconfont icon-img'></i>"
                       arrow="lr"
                       offset="right"
                       :move="-70"
                       :keys="`popover-img$-${index}`"
                       type="hover">

                <div class="p10 w250">
                  <img :src="item.image[0]"
                       style="width: 100%" />
                </div>
              </Popover>
            </span>
            <span class="font18 cl-ccc">({{item.times}})</span>
          </p>
          <p>
            <span class="operating f-fr font12 cl-ccc">
              <a href="/110506372/home?mod=article&amp;item=list&amp;id=|6|"
                 class="cl-ccc">分类：{{item.parent || '未分类'}}</a> |
              <a href="#"
                 title="阅读"
                 data-model="partner"
                 data-action="remove"
                 data-id="22"
                 class="remove cl-ccc">阅读({{item.visit}})</a> |
              <a href="#"
                 title="评论"
                 data-model="partner"
                 data-action="remove"
                 data-id="22"
                 class="remove cl-ccc">评论({{item.comment}})</a>
            </span>
          </p>
        </li>
      </ul>
      <div class="pt25"
           style="padding: 50px;">
        <v-pagination />
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
  getUid
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  props: {
    item: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loginuser = computed(() => store.getters['common/loginuser']);
    const dataList = ref([])
    let m: any = route.query.mod;
    const codding: any = codings[m]

    watch(() => route.query.item, () => {
      init()
    })

    function init() {

      let param: any = {}
      if (route.query.item === 'audited') {
        param.check = "1"
      } else if (route.query.item === 'unAudited') {
        param.check = "0"
      } else if (route.query.item === 'returned') {
        param.check = "-1"
      }

      store.dispatch('common/Fetch', {
        api: 'Journal',
        data: {
          uid: getUid(),
          id: route.query.id,
          ...param
        }
      }).then(res => {
        debugger
        dataList.value = res.result
      })
    }

    function handleclick(param: any) {

      let aa = param === 'add' ? "add" : `edit&id=${param.id}`

      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: `/journal/?mod=${route.query.mod}&item=details&action=${aa}`
      }))
    }

    onMounted(init)
    return {
      dataList,
      handleclick

    }
  }
})
</script>
