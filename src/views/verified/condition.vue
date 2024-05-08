<template>
  <div class="container w1100 relative"
       style="height: 650px;">
    <div class="p25 align_center">
      <div class="mb25 font24">申请条件
        <span class="font16 left"
              @click="handleBack">
          <i class="iconfont icon-back" />
        </span>
      </div>
      <div style="overflow: auto;">
        <div class="col-md-3 p10"
             v-for="(item, index) in dataList"
             :key="index">
          <div class="p15 align_center"
               style=" background: #f9f9f9; border-radius: 8px;">
            <div>
              <div class="mb25 inline relative"
                   style=" background: #eee; border-radius: 50px; width: 85px; height: 85px; line-height: 85px;">
                <i class="iconfont"
                   :class="`icon-${item.icon}`"
                   style="font-size: 36px !important;" />
                <i class="absolute iconfont m0  font32"
                   :class="item.status == true ? 'icon-right cl-green' : 'icon-guanbi cl-red'"
                   style="right: -2px; bottom: -2px; padding: 2px; z-index: 1;"></i>
              </div>
            </div>
            <div>{{item.name}}</div>
            <div class="ptb5 font12">{{item.description}}</div>
          </div>
        </div>
      </div>
      <div>
        <div @click="handleClick()"
             class="inline mt25 p15 font16 align_center bg-red cl-white"
             style="width: 200px; border-radius: 50px;">立即申请</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  useRouter,
  useStore,
  ref,
  onMounted
} from '@/utils'

export default defineComponent({
  name: 'MessageBoardView',
  components: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute();
    const router = useRouter()
    const dataList: any = ref([])
    const detail: any = ref({})

    function init() {
      store.dispatch('common/Fetch', {
        api: "verifiedCondition",
        data: {
          system: route.query.type
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleBack() {
      router.push(`?item=institution`)
    }

    function handleClick() {
      store.dispatch('common/Fetch', {
        api: "verifiedApply",
      }).then(res => {
        detail.value = res.result
      })
    }

    onMounted(() => {
      init()
    })

    return {
      route,
      handleBack,
      dataList,
      detail,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.open-text {
  position: absolute;
  width: 400px;
  height: 300px;
  color: #fff;
}

.verified-box {
  background: var(--label-background);
  position: absolute;
  border-radius: 8px;
  width: 400px;
  height: 300px;
}
</style>
