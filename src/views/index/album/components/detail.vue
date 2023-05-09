<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="设置状态" width="520px" height="450px" :data="data" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">相册名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li>
        <div class="mb5">相册描述</div>
        <input type="text" v-model="detail.description" class="input-sm input-full">
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  onMounted,
  ref,
  watch
} from '@/utils'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    action: {
      type: String,
      default: 'add'
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
    const detail: any = ref({})
    const dialog: any = ref(null)

    const {
      action,
      item
    } = props.data

// 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        
        detail.value = await dialog.value.init()
        debugger
      }
    })

    function submit() {
      debugger
      const {
        id,
        name,
        description
      } = detail.value
      const param: any = {
        name,
        description,
        coding: "U0012",
      }

      if (props.action !== "add") {
        param.id = id
      }

      // proxy.$loading.loading()
      store.dispatch('common/Fetch', {
        api: props.action === "add" ? "CreatePhotoAlbum" : "UpdateAlbum",
        data: {
          ...param
        }
      }).then(res => {
        isShow.value = false
        props.render()
        context.emit('update:showFlag', false)
      })

    }

    return {
      dialog,
      submit,
      isShow,
      detail
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff;
  border-radius: 2px;
  color: #fff;

}
</style>
