<template>
  <v-button v-model:show="isShow">
    <span style="color: var(--color-primary)">
      {{action == 'add' ? '创建话题' : '设置'}}
    </span>
  </v-button>
  <v-dialog v-model:show="isShow"
            ref="dialog"
            :title="action === 'add' ? '创建话题' : '话题设置'"
            action="edit"
            :data="data"
            :style="{width: 650, height: 300}"
            @submit="submit">
    <template v-slot:content>
      <div class="form-wrap-box">
        <div class="li">
          <span class="label">名称</span>
          <input v-model="detail.name"
                 placeholder="请输入话题名称"
                 type="text"
                 :disabled="action != 'add'"
                 class="input-sm input-full" />
        </div>
        <div class="li">
          <span class="label">描述</span>
          <textarea v-model="detail.summary"
                    placeholder="请输入话题描述"
                    class="w-full"></textarea>
        </div>
      </div>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'HomeViewh',
  components: {
  },
  props: {
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    action: {
      type: String,
      default: 'add'
    },
    coding: {
      type: String,
      default: ""
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
    }
  },
  setup(props, context) {
    const store = useStore();
    const isShow = ref(false)
    const dialog: any = ref(null)
    const detail: any = ref({})

        // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(params: any) {
      const {
        id,
        name,
        summary
      } = detail.value

      const param: any = {
        id,
        name,
        summary,
        coding: props.data.coding
      }

      store.dispatch('common/Fetch', {
        api: props.action == 'add' ? 'insertActivity' : 'updateActivity',
        data: {
          ...param,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      dialog,
      isShow,
      detail,
      submit
    }
  }
})
</script>
