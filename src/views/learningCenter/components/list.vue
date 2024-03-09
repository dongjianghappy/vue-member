<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold">内容概览</div>
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p15 align_center" style=" background: var(--card-background); border-radius: 8px;">
        <div class="ptb10 font6" @click="handleclick(item.id)" >
          {{item.title}}
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
  onMounted,
  ref,
  getUid,
  codings,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  components: {

  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const coding = codings.code
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          pagesize: 50,
          coding: coding.art
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleclick(param: any, grade: any) {

      router.push(`/learning?item=${param}`)
    }

    onMounted(init)
    return {
      dataList,
      init,
      handleclick
    }
  }

})
</script>
