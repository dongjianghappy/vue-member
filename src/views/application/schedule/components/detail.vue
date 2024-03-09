<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '添加项目'}}
</v-button>
<v-dialog v-model:show="isShow" ref="form" :title="action === 'add' ? '添加项目' : '编辑项目'" :style="{width: 550, height: 350}" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">项目名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li>
        <div class="mb5">项目描述</div>
        <textarea v-model="detail.description" placeholder="请输入项目描述" class="w-full"></textarea>
      </li>
    </ul>
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
      url: ""
    })

    // // 监听
    // watch([isShow], async (newValues, prevValues) => {
    //   if (isShow.value) {
        
    //   }
    // })

    function submit(params: any) {
      const {
        id,
        name,
        description,
      } = detail.value

      const param: any = {
        name: name,
        description: description,
      }

      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action === 'add' ? "Insert" : 'Update',
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
