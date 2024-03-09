<template>
<v-button v-model:show="isShow">
  {{title}}
</v-button>
<v-dialog v-model:show="isShow" ref="form" :title="action === 'add' ? '创建组' : '编辑组'" :style="{width: 450, height: 350}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">分组名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li>
        <div class="mb5">分组描述</div>
        <textarea v-model="detail.description" placeholder="请输入分组描述" class="w-full"></textarea>
      </li>
    </ul>
    <div class="mt15">
      <v-visible v-model:visible="detail.visible" />
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
    }
  },
  setup(props, context) {
    const store = useStore();
    const isShow = ref(false)
    const detail: any = ref({
      id: "",
      name: "",
      description: ""
    })

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value.id = props.data.id
        detail.value.name = props.data.name
        detail.value.description = props.data.description
      }
    })

    function submit(params: any) {
      const {
        id,
        name,
        description,
        visible,
      } = detail.value

      const param: any = {
        name: name,
        description: description,
        visible
      }

      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action === 'add' ? "insertCustomGroup" : 'updateCustomGroup',
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(res => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      submit
    }
  }
})
</script>
