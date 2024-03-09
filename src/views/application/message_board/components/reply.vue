<template>
<v-button v-model:show="isShow" :disabled="false" v-if="userInfo.account !== data.from_uid">
  <!-- <i class="iconfont icon-comment"></i> -->回复
</v-button>
<span v-else><i class="iconfont icon-comment cl-ccc"></i></span>
<v-dialog v-model:show="isShow" ref="form" className="font16" :title="`回复@${data.nickname}`" :style="{width: 650, height: 350}" width="520px" height="450px" :hasfooter="false">
  <template v-slot:content>
    <Form :data="data" api="commentReply" :method="method" :keys="`reply_${data.id}`" />
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import Form from "./formsss.vue"
export default defineComponent({
  name: 'HomeViewh',
  components: {
    Form
  },
  props: {
    title: {
      type: String,
      default: "创建组"
    },
    action: {
      type: String,
      default: "add"
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
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
    method: {
      type: String,
      default: ""
    },
  },
  setup(props, context) {
    const store = useStore();
    const isShow = ref(false)
    const userInfo: any = computed(() => store.getters['user/userInfo']);

    return {
      isShow,
      userInfo
    }
  }
})
</script>
