<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content basic-info" style="height: 560px;">
      <div class="font20 bold">联系我们</div>
      <div class="module-content form-wrap-box font18">
        <ul>
          <li class="li" v-for="(item, index) in detail" :key="index">
            <span class="label font18">{{item.remark}}</span>
            {{item.value}}
          </li>

        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  onMounted,
  codings
} from '@/utils'
import Detail from '../about/components/detail.vue'

export default defineComponent({
  name: 'AsideView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store: any = useStore()
    const isShow: any = ref(false)
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const detail: any = ref({})
    const coding: any = codings.service.contact

    function handleclick() {
      isShow.value = true
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: 'contact',
        data: {
          coding
        }
      }).then((res: any) => {
        detail.value = res.result
      })
    }

    onMounted(init)
    return {
      userInfo,
      handleclick,
      init,
      detail
    }
  }
})
</script>
