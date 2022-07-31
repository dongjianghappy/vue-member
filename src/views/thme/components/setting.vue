<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-shezhi" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="设置" width="250" style="height: 300px;top: unset; bottom: 0" :hasfooter="false" :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">风格主题</span>
        <v-switch :data="{ item: {}, field: 'status', ...data }" :auth="true" />
      </li>
      <li class="li">
        <span class="label">背景特效</span>
        <v-switch :data="{ item: {}, field: 'status', ...data }" :auth="true" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  components: {
  },
  props: {
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        debugger
        checkedList.value = detail.value.website ? detail.value.website.split(",") : []
        debugger
      }
    })

    function submit(cancel: any) {
      const {
        name,
        sort,
        authority
      } = detail.value

debugger
      store.dispatch('common/Fetch', {
        api: "update",
        data: {
          coding: props.data.coding,
          ...detail.value,
          website: checkedList.value.join(',')
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      drawer,
      submit,
      checkedList
    }
  }
})
</script>
