<template>
<div class="module-wrap">
      <div class="module-head p20">我的心情</div>
      <div class="module-content content-wrap ptb15 pr10 bg-white" style="min-height: 560px">
        <div class="notes-list relative" v-for="(item, index) in dataList" :key="index">
          <div class="notes-content plr5 ptb10" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
            <div class="pb5 font12">{{item.times}}</div>
            {{item.description}}
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
  onMounted,
  ref,
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  setting,
  information,
} from '@/assets/const'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const menu: any = setting
    const dataList: any = ref([])
    menu.map((item: any) => {
      item.path = `/setting?mod=${item.url}`
    })
    const component = computed(() => route.query.mod);

    function init() {
      store.dispatch('common/Fetch', {
        api: "moodList"
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      dataList,
      component,
      menu
    }
  }
})
</script>
