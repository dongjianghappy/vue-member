<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content basic-info" style="height: 560px;">
      <div class="font20 bold">公告通知</div>
      <div class="module-content form-wrap-box font18">
        <ul>
          <li class="li">
            {{detail.title}}
          </li>
          <li class="li">
            {{detail.content}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import router from '@/router';
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  onMounted,
  codings,
  useRoute
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
    const route: any = useRoute()
    const isShow: any = ref(false)
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const detail: any = ref({})
    const coding: any = codings.service.announcement

    function handleclick() {
      isShow.value = true
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: 'detail',
        data: {
          coding,
          id: route.query.id
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
