<template>
<div class="module-wrap">
  <div class="module-head">{{module.name}}</div>
  <div class="module-content p10" style="padding-bottom: 25px !important; height:auto">
    <v-tabs :tabs="[{name: '全部消息',value: 'all'},{name: '未读消息',value: 'unread'},{name: '已读消息',value: 'read'}]" :isEmit="true">
      <template v-slot:content1>
        <List :title="title" />
      </template>
      <template v-slot:content2>
        <List :title="title" index="unread" />
      </template>
      <template v-slot:content3>
        <List :title="title" index="read" />
      </template>
    </v-tabs>
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
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  information
} from '@/assets/const'
import List from './list.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
    List
  },
  props: {
    title: {
      type: String,
      defualt: "system"
    }
  },
  setup(props, context) {
    const store = useStore()
    const info: any = information
    const module = computed(() => {
      debugger
      let aa = store.getters['user/config_talk'].message
      // alert(JSON.stringify(aa))
      let bb = aa.filter((item: any) => item.value.indexOf(props.title) > -1)
      return bb[0]
    });

    onMounted(() => {
      
    })
    return {
      module
    }
  }

})
</script>
