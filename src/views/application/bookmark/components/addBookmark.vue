<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '添加书签'}}
</v-button>
<v-dialog v-model:show="isShow" ref="form" :title="action === 'add' ? '添加书签' : '编辑书签'" :style="{width: 550, height: 350}" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">书签名称</div>
        <input type="text" v-model="form.name" class="input-sm input-full">
      </li>
      <li>
        <div class="mb5">书签地址</div>
        <textarea v-model="form.url" placeholder="请输入分组描述" class="w-full"></textarea>
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
    const form: any = ref({
      id: "",
      name: "",
      url: ""
    })

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        form.value.id = props.data.id
        form.value.name = props.data.name
        form.value.url = props.data.url
      }
    })

    function submit(params: any) {
      const {
        id,
        name,
        url,
      } = form.value

      const param: any = {
        name: name,
        url: url,
      }

      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action === 'add' ? "Insert" : 'Update',
        data: {
          coding: props.data.coding,
          fid: props.data.fid,
          ...param
        }
      }).then(res => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      form,
      submit
    }
  }
})
</script>
